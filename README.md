# jupyterlab_table

A Jupyter Lab and Jupyter Notebook extension for rendering JSONTable

## Prerequisites

* JupyterLab >=0.8.0 and/or Notebook >=4.3

## Usage

To render [JSON-able dict or list](https://ipython.org/ipython-doc/3/api/generated/IPython.display.html#IPython.display.JSON) in IPython as a tree:

![output renderer](http://g.recordit.co/QAsC7YULcY.gif)

```python
from IPython.display import JSON
JSON({
    'string': 'string',
    'array': [1, 2, 3],
    'bool': True,
    'object': {
        'foo': 'bar'
    }
})
```

To render a JSON file as a tree, simply open it:

![file renderer](http://g.recordit.co/cbf0xnQHKn.gif)

## Installation

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

To install the extension for Jupyter Lab:

```bash
jupyter labextension install --symlink --py --sys-prefix jupyterlab_table
jupyter labextension enable --py --sys-prefix jupyterlab_table
```

To install the extension for Jupyter Notebook:

```bash
jupyter nbextension install --symlink --py --sys-prefix jupyterlab_table
jupyter nbextension enable --py --sys-prefix jupyterlab_table
```
