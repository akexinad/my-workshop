const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const DotenvWebpack = require('dotenv-webpack');
const dotenv = require('dotenv');
const envFile = path.resolve(__dirname, '../.env');
const dotEnvConfig = dotenv.config({ path: envFile });
if (dotEnvConfig.error) throw dotEnvConfig.error;
const { APP_URL, NODE_ENV, APP_LOCATION, APP_HOST, LOCAL_WEBPACK_PORT } = dotEnvConfig.parsed;
const srcDir = path.resolve(__dirname, 'src');
const distDir = path.resolve(__dirname, 'dist', APP_LOCATION);
let plugins = [
  new DotenvWebpack({ path: envFile }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    chunks: ['index'],
    template: 'index.html',
    inject: true,
  }),
];
if (APP_LOCATION === 'local') {
  plugins = plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new HardSourceWebpackPlugin(),
  ]);
}
const rhlBabelLoader = {
  loader: 'babel-loader',
  options: {
    plugins: ['react-hot-loader/babel'],
  },
};
const tsLoader = {
  loader: 'awesome-typescript-loader',
  options: {
    useCache: true,
    transpileModule: true,
    forceIsolatedModules: true,
  },
};
const urlLoader = {
  loader: 'url-loader',
  options: {
    limit: 16384,
    fallback: 'file-loader',
    name: '[path][name]-[hash:6].[ext]',
  },
};
const base64Loader = {
  ...urlLoader,
  options: {
    ...urlLoader.options,
    limit: 999999, // An impossible limit to force the url-loader into base64 mode
  },
};
module.exports = {
  mode: NODE_ENV === 'development' ? 'development' : 'production',
  devtool: APP_LOCATION === 'local' ? 'eval-source-map' : undefined,
  context: srcDir,
  entry: {
    index: [path.join(srcDir, 'index.tsx')],
  },
  output: {
    publicPath: '/', // Where you uploaded your bundled files (Relative to server root)
    path: distDir, // Local disk directory to store all your output files (Absolute path)
    filename: '[name]-[hash:6].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: [/node_modules/],
        use: APP_LOCATION === 'local' ? [rhlBabelLoader, tsLoader] : [tsLoader],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        exclude: /logo.png/,
        use: [urlLoader],
      },
      {
        test: /logo.png/,
        use: [base64Loader],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [srcDir, path.resolve(__dirname, 'node_modules')],
    alias: APP_LOCATION === 'local' ? { 'react-dom': '@hot-loader/react-dom' } : undefined,
  },
  optimization: {
    sideEffects: true,
    usedExports: true,
  },
  devServer:
    APP_LOCATION === 'local'
      ? {
          host: APP_HOST,
          port: LOCAL_WEBPACK_PORT,
          public: APP_URL,
          publicPath: '/', // URL path where the webpack files are served from
          contentBase: distDir, // A directory to serve files non-webpack files from (Absolute path)
          disableHostCheck: true,
          hot: true,
          inline: true,
          watchOptions: {
            ignored: /node_modules/,
          },
          historyApiFallback: true,
        }
      : undefined,
  plugins,
};