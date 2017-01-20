from IPython.display import display
import pandas as pd


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


# A display function that can be used within a notebook. E.g.:
#   from jupyterlab_table import JSONTable
#   JSONTable(data)

def JSONTable(data, schema=None):
    if isinstance(data, pd.DataFrame):
        # hack until pandas supports `df.to_json(orient='json_table_schema')`
        # https://github.com/pandas-dev/pandas/pull/14904
        data = [data.loc[i].to_dict() for i in data.index]
    bundle = {
        'application/vnd.dataresource+json': {
            'resources': [
                {
                    'schema': schema,
                    'data': data
                }
            ]
        },
        'application/json': data,
        'text/plain': '<jupyterlab_table.JSONTable object>'
    }
    display(bundle, raw=True)
