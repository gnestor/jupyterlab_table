from IPython.display import display, JSON

# Running `npm run build` will create static resources in the static
# directory of this Python package (and create that directory if necessary).

def _jupyter_labextension_paths():
    return [{
        'name': 'jupyterlab_table',
        'src': 'static',
    }]

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'jupyterlab_table',
        'require': 'jupyterlab_table/extension'
    }]

# A display class that can be used within a notebook. 
#   from jupyterlab_table import JSONTable
#   JSONTable(data)
    
class JSONTable(JSON):
    """A display class for displaying JSONTable visualizations in the Jupyter Notebook and IPython kernel.
    
    JSONTable expects a JSON-able dict, not serialized JSON strings.

    Scalar types (None, number, string) are not allowed, only dict containers.
    """

    def _ipython_display_(self):
        bundle = {
            'application/vnd.dataresource+json': self.data,
            'text/plain': '<jupyterlab_table.JSONTable object>'
        }
        metadata = {
            'application/vnd.dataresource+json': self.metadata
        }
        display(bundle, metadata=metadata, raw=True) 
