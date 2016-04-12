/* eslint-env node */
import * as path from 'path';

export default {
  entry: 'main',
  resolve: {
    root: path.resolve('./src')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve('./src')
        ],
        loaders: ['babel']
      }
    ]
  },
  output: {
    filename: 'postscribe.js',
    libraryTarget: 'umd'
  }
};
