const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const srcDir = path.resolve(__dirname, 'src');
const distDir = path.resolve(__dirname, 'dist');
const tsLoader = {
  loader: 'awesome-typescript-loader',
  options: {
    useCache: true,
    transpileModule: true,
    forceIsolatedModules: true,
  },
};
module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  context: srcDir,
  entry: path.join(srcDir, 'index.tsx'),
  output: {
    publicPath: '/',
    path: distDir,
    filename: '[name]-[hash:6].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: [/node_modules/],
        use: [tsLoader],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [srcDir, path.resolve(__dirname, 'node_modules')],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index'],
      template: 'index.html',
      inject: true,
    }),
  ],
  devServer: {
    port: 3000,
    publicPath: '/',
    contentBase: distDir,
    disableHostCheck: true,
    hot: true,
    inline: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    historyApiFallback: true,
  },
};