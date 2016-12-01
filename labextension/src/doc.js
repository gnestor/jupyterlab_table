import { Widget } from 'phosphor/lib/ui/widget';
import { ABCWidgetFactory } from 'jupyterlab/lib/docregistry';
import React from 'react';
import ReactDOM from 'react-dom';
import Component from './component';

/**
 * The class name added to a JSON widget.
 */
const WIDGET_CLASS = 'jp-JSONTableWidget';


/**
 * A base JSON widget class.
 */
export class DocWidget extends Widget {

  /**
   * Construct a new map widget.
   */
  constructor(context) {
    super();
    this._context = context;
    this.addClass(WIDGET_CLASS);
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
      let json = content ? JSON.parse(content) : {};
      ReactDOM.render(<Component data={json} />, this.node);
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
 * A widget factory for maps.
 */
export class DocWidgetFactory extends ABCWidgetFactory {

  /**
   * Construct a new widget fatory.
   */
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
