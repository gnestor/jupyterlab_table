# jupyterlab_table

A JupyterLab and Jupyter Notebook extension for rendering JSONTable

![output renderer](http://g.recordit.co/QAsC7YULcY.gif)

## Prerequisites

* JupyterLab ^0.18.0 and/or Notebook >=4.3.0

## Usage

To render JSONTable output in IPython:

```python
from jupyterlab_table import JSONTable

JSONTable({
    "string": "string",
    "array": [1, 2, 3],
    "bool": True,
    "object": {
        "foo": "bar"
    }
})
```

To render a `.table.json` file as a tree, simply open it:

![file renderer](http://g.recordit.co/cbf0xnQHKn.gif)

## Install

```bash
pip install jupyterlab_table
# For JupyterLab
jupyter labextension install --symlink --py --sys-prefix jupyterlab_table
jupyter labextension enable --py --sys-prefix jupyterlab_table
# For Notebook
jupyter nbextension install --symlink --py --sys-prefix jupyterlab_table
jupyter nbextension enable --py --sys-prefix jupyterlab_table
```

## Development

```bash
pip install -e .
# For JupyterLab
jupyter labextension install --symlink --py --sys-prefix jupyterlab_table
jupyter labextension enable --py --sys-prefix jupyterlab_table
# For Notebook
jupyter nbextension install --symlink --py --sys-prefix jupyterlab_table
jupyter nbextension enable --py --sys-prefix jupyterlab_table
```
