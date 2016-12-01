import { IRenderMime } from 'jupyterlab/lib/rendermime';
import { IDocumentRegistry } from 'jupyterlab/lib/docregistry';
import { OutputRenderer } from './output';
import { DocWidgetFactory } from './doc';
import './index.css';

/**
 * Activate the table widget extension.
 */
function activatePlugin(app, rendermime, registry) {

  /**
   * Add the MIME type  renderer to the top of the renderers.
   */
  rendermime.addRenderer('application/table-schema+json', new OutputRenderer(), 0);
  
  if ('.table.json') {
    /**
     * The list of file extensions for json.
     */
    const EXTENSIONS = ['..table.json'];
    const DEFAULT_EXTENSIONS = ['..table.json'];

    /**
     * Add file handler for .table.json files.
     */
    let options = {
      fileExtensions: EXTENSIONS,
      defaultFor: DEFAULT_EXTENSIONS,
      name: 'JSONTable',
      displayName: 'JSONTable',
      modelName: 'text',
      preferKernel: false,
      canStartKernel: false
    };

    registry.addWidgetFactory(new DocWidgetFactory(options));
  }

}

const Plugin = {
  id: 'jupyter.extensions.JSONTable',
  requires: '.table.json' ? [IRenderMime, IDocumentRegistry] : [IRenderMime],
  activate: activatePlugin,
  autoStart: true
};

export default Plugin;
