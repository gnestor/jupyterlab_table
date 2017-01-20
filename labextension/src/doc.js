import { Widget } from 'phosphor/lib/ui/widget';
import { ABCWidgetFactory } from 'jupyterlab/lib/docregistry';
import React from 'react';
import ReactDOM from 'react-dom';
import JSONTable from 'react-json-table';

/**
 * The class name added to this DocWidget.
 */
const CLASS_NAME = 'jp-DocWidgetJSONTable';


/**
 * A widget for rendering jupyterlab_table files.
 */
export class DocWidget extends Widget {

  constructor(context) {
    super();
    this._context = context;
    this.addClass(CLASS_NAME);
    context.model.contentChanged.connect(() => {
      this.update();
    });
    context.pathChanged.connect(() => {
      this.update();
    });
  }

  /**
   * Dispose of the resources used by the widget.
   */
  dispose() {
    if (!this.isDisposed) {
      this._context = null;
      ReactDOM.unmountComponentAtNode(this.node);
      super.dispose();
    }
  }

  /**
   * A message handler invoked on an `'update-request'` message.
   */
  onUpdateRequest(msg) {
    this.title.label = this._context.path.split('/').pop();
    if (this.isAttached) {
      let content = this._context.model.toString();
      let { resources: [ props ] } = content ? JSON.parse(content) : {};
      if (props) ReactDOM.render(<JSONTable {...props} />, this.node);
    }
  }

  /**
   * A message handler invoked on an `'after-attach'` message.
   */
  onAfterAttach(msg) {
    this.update();
  }

}


/**
 * A widget factory for DocWidget.
 */
export class DocWidgetFactory extends ABCWidgetFactory {

  constructor(options) {
    super(options);
  }
  
  /**
   * Create a new widget given a context.
   */
  createNewWidget(context, kernel) {
    let widget = new DocWidget(context);
    this.widgetCreated.emit(widget);
    return widget;
  }

}
