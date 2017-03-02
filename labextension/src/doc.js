import { Widget } from '@phosphor/widgets';
import { ABCWidgetFactory } from 'jupyterlab/lib/docregistry';
import { ActivityMonitor } from 'jupyterlab/lib/common/activitymonitor';
import React from 'react';
import ReactDOM from 'react-dom';
import { VirtualizedTable as JSONTable } from 'jupyterlab_table_react';

/**
 * The class name added to a DocWidget.
 */
const CLASS_NAME = 'jp-DocWidgetJSONTable';

/**
 * The timeout to wait for change activity to have ceased before rendering.
 */
const RENDER_TIMEOUT = 1000;

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
    this._monitor = new ActivityMonitor({
      signal: context.model.contentChanged,
      timeout: RENDER_TIMEOUT
    });
    this._monitor.activityStopped.connect(this.update, this);
  }

  /**
   * Dispose of the resources used by the widget.
   */
  dispose() {
    if (!this.isDisposed) {
      this._context = null;
      ReactDOM.unmountComponentAtNode(this.node);
      this._monitor.dispose();
      super.dispose();
    }
  }

  /**
   * A message handler invoked on an `'update-request'` message.
   */
  onUpdateRequest(msg) {
    this.title.label = this._context.path.split('/').pop();
    if (this.isAttached) {
      const content = this._context.model.toString();
      try {
        const { resources: [ props ] } = JSON.parse(content);
        ReactDOM.render(<JSONTableComponent {...props} />, this.node);
      } catch (error) {
        
        const ErrorDisplay = props => (
          <div
            className="jp-RenderedText jp-mod-error"
            style={{
              width: '100%',
              minHeight: '100%',
              textAlign: 'center',
              padding: 10,
              boxSizing: 'border-box'
            }}
          >
            <span
              style={{
                fontSize: 18,
                fontWeight: 500
              }}
            >{props.message}</span>
            <pre
              style={{
                textAlign: 'left',
                padding: 10,
                overflow: 'hidden'
              }}
            >{props.content}</pre>
          </div>
        );
        
        ReactDOM.render(
          <ErrorDisplay
            message="Invalid JSON"
            content={content}
          />,
          this.node
        );
      }
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
    const widget = new DocWidget(context);
    this.widgetCreated.emit(widget);
    return widget;
  }
}
