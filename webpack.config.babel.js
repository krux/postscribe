/* eslint-env node */
import * as path from 'path';

export default {
  entry: 'main',
  devtool: 'source-map',
  resolve: {
    root: path.resolve('./src')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve('./src'),
          path.resolve('./test')
        ],
        exclude: [
          path.resolve('./test/remote')
        ],
        loaders: ['babel']
      }
    ]
  },
  output: {
    filename: 'postscribe.js',
    sourceMapFilename: 'postscribe.js.map',
    libraryTarget: 'umd'
  }
};
