# jupyterlab_table

Single Python package for lab and notebook extensions

## Structure

* `static`: Built Javascript from `../labextension/` and `../nbextension/`
* `__init__.py`: Exports paths and metadata of lab and notebook extensions and exports an optional `display` method that can be imported into a notebook and used to easily display data using this renderer
