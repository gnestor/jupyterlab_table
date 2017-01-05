#!/usr/bin/env bash
set -e
nbExtFlags=$1

bash build.sh

pip --version
if [ $? -eq 0 ]; then
    echo pip is installed
else
    echo "'pip --version' failed, therefore pip is not installed. In order to perform
    a developer install of jupyterlab_table you must have pip installed on
    your machine! See https://packaging.python.org/installing/ for installation instructions."
    exit 1
fi

pip install -v -e .

jupyter lab --version
if [ $? -eq 0 ]; then
    echo jupyter lab is installed
    if [[ "$OSTYPE" == "msys" ]]; then
        jupyter labextension install --py $nbExtFlags jupyterlab_table
    else
        jupyter labextension install --py --symlink $nbExtFlags jupyterlab_table
    fi
    jupyter labextension enable --py $nbExtFlags jupyterlab_table
else
    echo "'jupyter lab --version' failed, therefore jupyter lab is not installed. In
    order to perform a developer install of jupyterlab_table you must
    have jupyter lab on your machine! Install using 'pip install jupyterlab' or
    follow instructions at https://github.com/jupyterlab/jupyterlab/blob/master/CONTRIBUTING.md#installing-jupyterlab for developer install."
fi

jupyter notebook --version
if [ $? -eq 0 ]; then
    echo jupyter notebook is installed
    if [[ "$OSTYPE" == "msys" ]]; then
        jupyter nbextension install --py $nbExtFlags jupyterlab_table
    else
        jupyter nbextension install --py --symlink $nbExtFlags jupyterlab_table
    fi
    jupyter nbextension enable --py $nbExtFlags jupyterlab_table
else
    echo "'jupyter notebook --version' failed, therefore jupyter notebook is not
    installed. In order to perform a developer install of
    jupyterlab_table you must have jupyter notebook on your machine!
    Install using 'pip install notebook' or follow instructions at
    https://github.com/jupyter/notebook/blob/master/CONTRIBUTING.rst#installing-the-jupyter-notebook
    for developer install."
fi
