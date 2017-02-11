import { Widget } from 'phosphor/lib/ui/widget';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { VirtualizedTable as JSONTable } from 'react-json-table';

/**
 * The class name added to this OutputWidget.
 */
const CLASS_NAME = 'jp-OutputWidgetJSONTable';


/**
 * A widget for rendering JSONTable.
 */
export class OutputWidget extends Widget {

  constructor(options) {
    super();
    this.addClass(CLASS_NAME);
    this._source = options.source;
    this._injector = options.injector;
  }

  /**
   * A message handler invoked on an `'after-attach'` message.
   */
  onAfterAttach(msg) {
    this._render();
  }

  /**
   * A message handler invoked on an `'before-detach'` message.
   */
  onBeforeDetach(msg) {
    ReactDOM.unmountComponentAtNode(this.node);
  }

  /**
   * A render function given the widget's DOM node.
   */
  _render() {
    let { resources: [ props ] } = this._source;
    if (!this._injector.has('text/html')) 
      this._injector.add(
        'text/html', 
        ReactDOMServer.renderToStaticMarkup(<JSONTable {...props} />)
      );
    if (props) ReactDOM.render(<JSONTable {...props} />, this.node);
  }

}


export class OutputRenderer {

  /**
   * The mime types this OutputRenderer accepts.
   */
  mimetypes = ['application/vnd.dataresource+json'];

  /**
   * Whether the input can safely sanitized for a given mime type.
   */
  isSanitizable(mimetype) {
    return this.mimetypes.indexOf(mimetype) !== -1;
  }

  /**
   * Whether the input is safe without sanitization.
   */
  isSafe(mimetype) {
    return false;
  }

  /**
   * Render the transformed mime bundle.
   */
  render(options) {
    return new OutputWidget(options);
  }

}
