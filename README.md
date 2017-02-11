# jupyterlab_table

A JupyterLab and Jupyter Notebook extension for rendering [JSON Table Schema](http://frictionlessdata.io/guides/json-table-schema/)

![output renderer](http://g.recordit.co/l9WLsSxPPd.gif)

## Prerequisites

* JupyterLab ^0.16.0 and/or Notebook >=4.3.0

## Usage

To render JSONTable output in IPython:

```python
from jupyterlab_table import JSONTable

JSONTable(data=[
    {
        "Date": "2000-03-01",
        "Adj Close": 33.68,
        "Open": 89.62,
        "Low": 88.94,
        "Volume": 106889800,
        "High": 94.09,
        "Close": 90.81
    },
    {
        "Date": "2000-03-02",
        "Adj Close": 34.63,
        "Open": 91.81,
        "Low": 91.12,
        "Volume": 106932600,
        "High": 95.37,
        "Close": 93.37
    }
], schema={
    "fields": [
        {
            "type": "any",
            "name": "Date"
        },
        {
            "type": "number",
            "name": "Open"
        },
        {
            "type": "number",
            "name": "High"
        },
        {
            "type": "number",
            "name": "Low"
        },
        {
            "type": "number",
            "name": "Close"
        },
        {
            "type": "integer",
            "name": "Volume"
        },
        {
            "type": "number",
            "name": "Adj Close"
        }
    ]
})
```

Using a pandas DataFrame:

```python
from jupyterlab_table import JSONTable
import pandas
import numpy

df = pandas.DataFrame(numpy.random.randn(2, 2))
JSONTable(df)
```

To render a .table.json file as a tree, simply open it:

![file renderer](http://g.recordit.co/7BNlGqlKtP.gif)

## Install

To install using pip:

```bash
pip install jupyterlab_table
# For JupyterLab
jupyter labextension install --py --sys-prefix jupyterlab_table
jupyter labextension enable --py --sys-prefix jupyterlab_table
# For Notebook
jupyter nbextension install --py --sys-prefix jupyterlab_table
jupyter nbextension enable --py --sys-prefix jupyterlab_table
```

## Development

### Set up using install script

Use the `install.sh` script to build the Javascript, install the Python package, and install/enable the notebook and lab extensions:

```bash
bash install.sh --sys-prefix
```

Use the `build.sh` script to rebuild the Javascript:

```bash
bash build.sh
```

### Set up manually

Alternatively, see the `README.md` in `/labextension` and `/nbextension` for extension-specific build instructions. 

To install the Python package:

```bash
pip install -e .
```

To install the extension for JupyterLab:

```bash
jupyter labextension install --symlink --py --sys-prefix jupyterlab_table
jupyter labextension enable --py --sys-prefix jupyterlab_table
```

To install the extension for Jupyter Notebook:

```bash
jupyter nbextension install --symlink --py --sys-prefix jupyterlab_table
jupyter nbextension enable --py --sys-prefix jupyterlab_table
```
