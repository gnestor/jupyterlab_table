from setuptools import setup
from setupbase import create_cmdclass, install_npm

cmdclass = create_cmdclass(['component', 'labextension', 'nbextension'])
cmdclass['component'] = install_npm('component')
cmdclass['labextension'] = install_npm('labextension')
cmdclass['nbextension'] = install_npm('nbextension')

setup_args = dict(
    name                 = 'jupyterlab_table',
    version              = '0.20.2',
    packages             = ['jupyterlab_table'],
    author               = 'Grant Nestor',
    author_email         = 'grantnestor@gmail.com',
    url                  = 'http://jupyter.org',
    license              = 'BSD',
    platforms            = "Linux, Mac OS X, Windows",
    keywords             = [
        'ipython', 
        'jupyter', 
        'jupyterlab', 
        'extension', 
        'renderer'
    ],
    classifiers          = [
        'Intended Audience :: Developers',
        'Intended Audience :: System Administrators',
        'Intended Audience :: Science/Research',
        'License :: OSI Approved :: BSD License',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
    ],
    cmdclass             = cmdclass,
    install_requires     = [
        'jupyterlab>=0.20.2',
        'notebook>=4.3.0',
        'ipython>=1.0.0'
    ]
)

if __name__ == '__main__':
    setup(**setup_args)
