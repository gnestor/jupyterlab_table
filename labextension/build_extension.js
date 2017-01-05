var buildExtension = require('@jupyterlab/extension-builder').buildExtension;
var path = require('path');

buildExtension({
  name: 'jupyterlab_table',
  entry: './src/plugin.js',
  outputDir: '../jupyterlab_table/static',
  useDefaultLoaders: false,
  config: {
    module: {
      loaders: [
        { test: /\.html$/, loader: 'file-loader' },
        { test: /\.(jpg|png|gif)$/, loader: 'file-loader' },
        { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
        { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
        { test: /\.json$/, loader: 'json-loader' },
        { test: /\.js$/,
          exclude: /node_modules(?!\/react-json-table)/, 
          loader: 'babel-loader',
          query: {
            presets: ['latest', 'stage-0', 'react']
          }
        }
      ]
    }
  }
});
