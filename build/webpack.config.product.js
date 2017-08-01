var webpack = require('webpack')
var path = require('path')
var fs = require('fs')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HashPlugin = require('./hash-plugin');
var base = require('./webpack.config.js');

var cssLoader = {
  loader: "css-loader",
  options: { 
    minimize: true
  }
}

var production = Object.assign({}, base);

production.entry = Object.keys(base.entry).reduce((pre, cur) => {
  const obj = base.entry[cur];
  if (Array.isArray(obj)) {
    return Object.assign(pre, { [cur]: obj.filter((v) => v != "webpack-hot-middleware/client") })
  } else {
    return Object.assign(pre, { [cur]: obj })
  }
}, {});

production.output = {
  path: path.resolve(__dirname, '../public/dist'),
  filename: "[name].[hash].js",
  publicPath: "https://img.maihaoche.com/node_fiat/"
}

production.module.loaders = base.module.loaders.map((value) => {
  if ( value.test.test("a.scss")) {
    return {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [cssLoader, "sass-loader"]
      })
    }
  } else if ( value.test.test("a.css") ) {
    return {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [cssLoader]
      })
     };
  } else {
    return value;
  }
})

production.plugins = [
  new HashPlugin({
    path: path.resolve(__dirname, '../'),
    filename: "resource-hash.js"
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new ExtractTextPlugin('[name].[hash].css'),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
      isBrowse: true
    },
  })
]

production.devtool = "";

module.exports = production;

