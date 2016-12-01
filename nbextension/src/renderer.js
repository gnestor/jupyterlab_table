var React = require('react');
var ReactDOM = require('react-dom');
var Component = require('./component').default;

var MIME_TYPE = 'application/table-schema+json';

//
// Render data to the output area
// 
function render(data, node) {
    ReactDOM.render(<Component data={data} />, node);
}

//
// Register the mime type and append_mime_type function with the notebook's OutputArea
// 
function register_renderer($) {
    // Get an instance of the OutputArea object from the first CodeCellebook_
    var OutputArea = $('#notebook-container').find('.code_cell').eq(0).data('cell').output_area;
    // A function to render output of 'application/vnd.plotly.v1+json' mime type
    var append_json = function (json, md, element) {
        var type = MIME_TYPE;
        var toinsert = this.create_output_subarea(md, 'output_JSONTable rendered_html', type);
        this.keyboard_manager.register_events(toinsert);
        render(json, toinsert[0]);
        element.append(toinsert);
        return toinsert;
    };
    // Register the mime type and append_mime_type function with the notebook's OutputArea
    OutputArea.register_mime_type(MIME_TYPE, append_json, true);
}

//
// Re-render cells with output data of 'application/vnd.plotly.v1+json' mime type
// 
function render_cells($) {
    // Get all cells in notebook
    $('#notebook-container').find('.cell').toArray().forEach(function(item, index) {
        var CodeCell = $(item).data('cell');
        // If a cell has output data of 'application/vnd.plotly.v1+json' mime type
        if (CodeCell.output_area && CodeCell.output_area.outputs.find(function(output) {
            return output.data[MIME_TYPE];
        })) {
            // Re-render the cell by executing it
            CodeCell.notebook.render_cell_output(CodeCell);
        }
    });
}

module.exports = {
    register_renderer: register_renderer,
    render_cells: render_cells
};
