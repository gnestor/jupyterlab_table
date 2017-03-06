import { Widget } from '@phosphor/widgets';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { VirtualizedTable as JSONTable } from 'jupyterlab_table_react';

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
    this._data = options.model.data;
    // this._metadata = options.model.metadata;
    this._mimeType = options.mimeType;
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
    const { resources: [ props ] } = this._data.get(this._mimeType);
    // const metadata = this._metadata.get(this._mimeType);
    if (props) ReactDOM.render(<JSONTable {...props} />, this.node);
    // Inject static HTML into mime bundle
    this._data.set(
      'text/html', 
      ReactDOMServer.renderToStaticMarkup(<JSONTable {...props} />)
    );
  }
}

export class OutputRenderer {
  /**
   * The mime types this OutputRenderer accepts.
   */
  mimeTypes = [ 'application/vnd.dataresource+json' ];

  /**
   * Whether the renderer can render given the render options.
   */
  canRender(options) {
    return this.mimeTypes.indexOf(options.mimeType) !== -1;
  }

  /**
   * Render the transformed mime bundle.
   */
  render(options) {
    return new OutputWidget(options);
  }
}
