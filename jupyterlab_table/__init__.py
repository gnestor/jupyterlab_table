from IPython.display import display, DisplayObject
import json
import pandas as pd
from .utils import prepare_data


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


# A display class that can be used within a notebook. E.g.:
#   from jupyterlab_table import JSONTable
#   JSONTable(data, schema)
    
class JSONTable(DisplayObject):
    """A display class for displaying JSONTable visualizations in the Jupyter Notebook and IPython kernel.
    
    JSONTable expects a JSON-able list, not serialized JSON strings.

    Scalar types (None, number, string) are not allowed, only dict containers.
    """
    # wrap data in a property, which warns about passing already-serialized JSON
    _data = None
    _schema = None
    def __init__(self, data=None, schema=None, url=None, filename=None, metadata=None):
        """Create a JSON Table display object given raw data.

        Parameters
        ----------
        data : list
            Not an already-serialized JSON string.
            Scalar types (None, number, string) are not allowed, only list containers.
        schema : dict
            JSON Table Schema. See http://frictionlessdata.io/guides/json-table-schema/.
        url : unicode
            A URL to download the data from.
        filename : unicode
            Path to a local file to load the data from.
        metadata: dict
            Specify extra metadata to attach to the json display object.
        """
        self.schema = schema
        self.metadata = metadata
        super(JSONTable, self).__init__(data=data, url=url, filename=filename)

    def _check_data(self):
        if self.data is not None and not isinstance(self.data, (list, pd.DataFrame)):
            raise TypeError("%s expects a JSONable list or pandas DataFrame, not %r" % (self.__class__.__name__, self.data))
        if self.schema is not None and not isinstance(self.schema, dict):
            raise TypeError("%s expects a JSONable dict, not %r" % (self.__class__.__name__, self.schema))
        
    @property
    def data(self):
        return self._data
        
    @property
    def schema(self):
        return self._schema

    @data.setter
    def data(self, data):
        if isinstance(data, str):
            # warnings.warn("JSONTable expects JSON-able dict or list, not JSON strings")
            data = json.loads(data)
        self._data = data
        
    @schema.setter
    def schema(self, schema):
        if isinstance(schema, str):
            # warnings.warn("JSONTable expects a JSON-able list, not JSON strings")
            schema = json.loads(schema)
        self._schema = schema
        
    def _ipython_display_(self):
        bundle = {
            'application/vnd.dataresource+json': {
                'resources': [prepare_data(self.data, self.schema)]
            },
            'text/plain': '<jupyterlab_table.JSONTable object>'
        }
        metadata = {
            'application/vnd.dataresource+json': self.metadata
        }
        display(bundle, metadata=metadata, raw=True) 
