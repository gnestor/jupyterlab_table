import React from 'react';
import ReactDOM from 'react-dom';
import { VirtualizedTable as JSONTable } from 'react-json-table';
import './index.css';

const MIME_TYPE = 'application/vnd.dataresource+json';
const CLASS_NAME = 'output_JSONTable rendered_html';

//
// Render data to the output area
// 
function render(json, node) {
  const { resources: [ props ] } = json;
  ReactDOM.render(<JSONTable {...props} />, node);
}

//
// Register the mime type and append_mime_type function with the notebook's OutputArea
// 
export function register_renderer($) {
  // Get an instance of the OutputArea object from the first CodeCellebook_
  const OutputArea = $('#notebook-container').find('.code_cell').eq(0).data('cell').output_area;
  // A function to render output of 'application/vnd.dataresource+json' mime type
  const append_mime = function(json, md, element) {
    const type = MIME_TYPE;
    const toinsert = this.create_output_subarea(md, CLASS_NAME, type);
    this.keyboard_manager.register_events(toinsert);
    render(json, toinsert[0]);
    element.append(toinsert);
    return toinsert;
  };
  // Calculate the index of this renderer in `OutputArea.display_order`
  // e.g. Insert this renderer after any renderers with mime type that matches "+json"
  // const mime_types = OutputArea.mime_types();
  // const json_types = mime_types.filter(mimetype => mimetype.includes('+json'));
  // const index = mime_types.lastIndexOf(json_types.pop() + 1);
  // ...or just insert it at the top
  const index = 0;
  // Register the mime type and append_mime_type function with the notebook's OutputArea
  OutputArea.register_mime_type(MIME_TYPE, append_mime, {
    // Is output safe?
    safe: true,
    // Index of renderer in `OutputArea.display_order`
    index: index
  });
}

//
// Re-render cells with output data of 'application/vnd.dataresource+json' mime type
// 
export function render_cells($) {
  // Get all cells in notebook
  $('#notebook-container').find('.cell').toArray().forEach(item => {
    const CodeCell = $(item).data('cell');
    // If a cell has output data of 'application/vnd.dataresource+json' mime type
    if (CodeCell.output_area && CodeCell.output_area.outputs.find(output => output.data && output.data[MIME_TYPE])) {
      // Re-render the cell by executing it
      CodeCell.notebook.render_cell_output(CodeCell);
    }
  });
}
