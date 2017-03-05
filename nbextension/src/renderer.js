import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { VirtualizedTable as JSONTable } from 'jupyterlab_table_react';
import './index.css';

const MIME_TYPE = 'application/vnd.dataresource+json';
const CLASS_NAME = 'output_JSONTable rendered_html';

/**
 * Render data to the output area
 */
function render(json, node) {
  const { data, schema } = json;
  ReactDOM.render(<JSONTable data={data} schema={schema} />, node);
}

/**
 * Register the mime type and append_mime_type function with the notebook's 
 * output_area
 */
export function register_renderer(notebook) {
  // Get an instance of output_area from the notebook object
  const { output_area } = notebook
    .get_cells()
    .reduce((result, cell) => cell.output_area ? cell : result, {});
  // A function to render output of 'application/vnd.dataresource+json' mime type
  const append_mime = function(json, md, element) {
    const type = MIME_TYPE;
    const toinsert = this.create_output_subarea(md, CLASS_NAME, type);
    this.keyboard_manager.register_events(toinsert);
    render(json, toinsert[0]);
    // Inject static HTML into mime bundle
    this.outputs.filter(output => output.data[MIME_TYPE]).forEach(output => {
      const { resources: [ props ] } = json;
      ReactDOMServer.renderToStaticMarkup(
        <JSONTable {...props} />
      )
    });
    element.append(toinsert);
    return toinsert;
  };
  // // Calculate the index of this renderer in `output_area.display_order`
  // // e.g. Insert this renderer after any renderers with mime type that matches "+json"
  // const mime_types = output_area.mime_types();
  // const json_types = mime_types.filter(mimetype => mimetype.includes('+json'));
  // const index = mime_types.lastIndexOf(json_types.pop() + 1);
  // // ...or just insert it at the top
  const index = 0;
  // Register the mime type and append_mime_type function with the output_area
  output_area.register_mime_type(MIME_TYPE, append_mime, {
    // Is output safe (no Javascript)?
    safe: true,
    // Index of renderer in `output_area.display_order`
    index: index
  });
}

/**
 * Re-render cells with output data of 'application/vnd.dataresource+json' mime type
 * on load notebook
 */
export function render_cells(notebook) {
  // Get all cells in notebook
  notebook.get_cells().forEach(cell => {
    // If a cell has output data of 'application/vnd.dataresource+json' mime type
    if (
      cell.output_area && 
      cell.output_area.outputs.find(output => 
        output.data && output.data[MIME_TYPE]
      )
    ) {
      // Re-render the cell by executing it
      notebook.render_cell_output(cell);
    }
  });
}
