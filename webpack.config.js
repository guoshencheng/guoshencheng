var webpack = require('webpack')
var path = require('path')
var fs = require('fs')

module.exports = {
  entry: {
    main: ["webpack-hot-middleware/client", path.resolve(__dirname, './react/index.jsx')]
  },
  output: {
      path: path.resolve(__dirname, './public/dist'),
      filename: "[name].js",
      publicPath: "/dist/"
  },
  externals:{
    react:'React',
    'react-dom':'ReactDOM',
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.md$/,
        loaders: ['raw-loader']
      }
    ]
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      env:{
        isDevelopment:true,
        BROWSER_ENV: true
      },
      __DEV__:true,
      __DEBUG__:true,
    })
  ],
  devtool: 'source-map'
}
