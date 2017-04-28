import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { VirtualizedGrid, VirtualizedTable } from 'jupyterlab_table_react';
import '../index.css';

const MIME_TYPE = 'application/vnd.dataresource+json';
const CLASS_NAME = 'output_JSONTable rendered_html';
const DEFAULT_WIDTH = 840;
const DEFAULT_HEIGHT = 360;

/**
 * Handle when an output is cleared or removed
 */
function handleClearOutput(event, { cell: { output_area } }) {
  /* Get rendered DOM node */
  const toinsert = output_area.element.find(`.${CLASS_NAME.split(' ')[0]}`);
  /* e.g. Dispose of resources used by renderer library */
  if (toinsert[0]) ReactDOM.unmountComponentAtNode(toinsert[0]);
}

/**
 * Handle when a new output is added
 */
function handleAddOutput(event, { output, output_area }) {
  /* Get rendered DOM node */
  const toinsert = output_area.element.find(`.${CLASS_NAME.split(' ')[0]}`);
  /** e.g. Inject a static image representation into the mime bundle for
   *  rendering on Github, etc.
   */
  // if (toinsert[0]) {
  //   renderLibrary.toPng(toinsert[0]).then(url => {
  //     const data = url.split(',')[1];
  //     output_area.outputs
  //       .filter(output => output.data[MIME_TYPE])
  //       .forEach(output => {
  //         output.data['image/png'] = data;
  //       });
  //   });
  // }
}

/**
 * Register the mime type and append_mime function with the notebook's 
 * output area
 */
export function register_renderer(notebook, events, OutputArea) {
  /* A function to render output of 'application/vnd.dataresource+json' mime type */
  const append_mime = function(data, metadata, element) {
    /* Create a DOM node to render to */
    const toinsert = this.create_output_subarea(
      metadata,
      CLASS_NAME,
      MIME_TYPE
    );
    this.keyboard_manager.register_events(toinsert);
    const type = metadata[MIME_TYPE] &&
      metadata[MIME_TYPE].format &&
      metadata[MIME_TYPE].format === 'table'
      ? VirtualizedTable
      : VirtualizedGrid;
    const props = {
      ...data,
      metadata: metadata[MIME_TYPE],
      width: element.width(),
      height: DEFAULT_HEIGHT,
      fontSize: 14
    };
    ReactDOM.render(React.createElement(type, props), toinsert[0]);
    element.append(toinsert);
    const output_area = this;
    this.element.on('changed', () => {
      if (output_area.outputs.length > 0) ReactDOM.unmountComponentAtNode(toinsert[0]);
    });
    return toinsert;
  };

  /* Handle when an output is cleared or removed */
  events.on('clear_output.CodeCell', handleClearOutput);
  events.on('delete.Cell', handleClearOutput);

  /* Handle when a new output is added */
  events.on('output_added.OutputArea', handleAddOutput);

  /**
   * Calculate the index of this renderer in `output_area.display_order`
   * e.g. Insert this renderer after any renderers with mime type that matches 
   * "+json"
   */
  // const mime_types = output_area.mime_types();
  // const json_types = mime_types.filter(mimetype => mimetype.includes('+json'));
  // const index = mime_types.lastIndexOf(json_types.pop() + 1);

  /* ...or just insert it at the top */
  const index = 0;

  /**
   * Register the mime type and append_mime function with output_area
   */
  OutputArea.prototype.register_mime_type(MIME_TYPE, append_mime, {
    /* Is output safe? */
    safe: true,
    /* Index of renderer in `output_area.display_order` */
    index: index
  });
}

/**
 * Re-render cells with output data of 'application/vnd.dataresource+json' mime type
 * on load notebook
 */
export function render_cells(notebook) {
  /* Get all cells in notebook */
  notebook.get_cells().forEach(cell => {
    /* If a cell has output data of 'application/vnd.dataresource+json' mime type */
    if (
      cell.output_area &&
      cell.output_area.outputs.find(
        output => output.data && output.data[MIME_TYPE]
      )
    ) {
      /* Re-render the cell */
      notebook.render_cell_output(cell);
    }
  });
}
