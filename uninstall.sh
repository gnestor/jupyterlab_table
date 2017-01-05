#!/usr/bin/env bash
nbExtFlags=$1

jupyter lab --version
if [ $? -eq 0 ]; then
    jupyter labextension uninstall --py $nbExtFlags jupyterlab_test
fi

jupyter notebook --version
if [ $? -eq 0 ]; then
    jupyter nbextension uninstall --py $nbExtFlags jupyterlab_test
fi

pip --version
if [ $? -eq 0 ]; then
    pip uninstall -v .
else
    echo "'pip --version' failed, therefore pip is not installed. In order to perform
    an install of jupyterlab_table you must have both pip and npm installed on
    your machine! See https://packaging.python.org/installing/ for installation instructions."
fi
