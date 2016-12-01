# jupyterlab_table Jupyter Notebook extension

A Jupyter Notebook extension for rendering JSONTable output

## Prerequisites

* Notebook >=4.3

## Usage

To render [JSON-able dict or list](https://ipython.org/ipython-doc/3/api/generated/IPython.display.html#IPython.display.JSON) in IPython as a tree:

![screenshot](http://g.recordit.co/oKTa52HTK9.gif)

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

## Development

Install dependencies and build Javascript:

```bash
npm install
```

Re-build Javascript:

```bash
npm run build
```

Watch `/src` directory and re-build on changes:

```bash
npm run watch
```
