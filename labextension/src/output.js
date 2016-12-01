import { Widget } from 'phosphor/lib/ui/widget';
import React from 'react';
import ReactDOM from 'react-dom';
import Component from './component';

const WIDGET_CLASS = 'jp-OutputWidgetJSONTable';


/**
 * A widget for displaying HTML and rendering math.
 */
export class OutputWidget extends Widget {

  constructor(options) {
    super();
    this.addClass(WIDGET_CLASS);
    this._source = options.source;
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
    let json = this._source;
    ReactDOM.render(<Component data={json} />, this.node);
  }

}


export class OutputRenderer {

  /**
   * The mimetypes this OutputRenderer accepts.
   */
  mimetypes = ['application/table-schema+json'];

  /**
   * Whether the input can safely sanitized for a given mimetype.
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
