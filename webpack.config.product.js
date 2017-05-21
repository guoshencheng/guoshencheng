var webpack = require('webpack')
var path = require('path')
var fs = require('fs')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: [path.resolve(__dirname, './react/index.jsx')]
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
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.scss$/, 
        loader: ExtractTextPlugin.extract("style", "css!sass") 
      },
      {
        test: /\.md$/,
        loaders: ['raw-loader']
      }
    ]
  },
  plugins:[
    new ExtractTextPlugin("[name].css"),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      env:{
        isDevelopment:true,
        BROWSER_ENV: true
      },
      __DEV__:true,
      __DEBUG__:true,
    })
  ],
}
