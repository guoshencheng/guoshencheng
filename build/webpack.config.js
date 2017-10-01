var webpack = require('webpack')
var path = require('path')
var fs = require('fs')
const CopyWebpackPlugin = require('copy-webpack-plugin');

const entry = fs.readdirSync(path.resolve(__dirname, '../webapp')).filter((child) => {
  return fs.lstatSync(path.resolve(__dirname, '../webapp/' + child)).isDirectory();
}).reduce((pre, child) => {
  return Object.assign(pre, {
    [child.toLocaleLowerCase()]: [path.resolve(__dirname, '../webapp/' + child + "/index.js")]
  })
}, {});

module.exports = {
  entry: Object.keys(entry).reduce((pre, key) => {
    return Object.assign(pre, {
      [key]: ["webpack-hot-middleware/client"].concat(entry[key])
    })
  }, {}),
  resolve: { extensions: ['.web.js', '.js', '.json'], },
  output: {
    path: path.resolve(__dirname, './public/dist'),
    filename: "[name].js",
    publicPath: "/dist/"
  },
  externals:{
    react: 'React',
   'react-dom': 'ReactDOM',
    // 'moment/locale/zh-cn': 'moment.locale'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2)$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "images/[name]-[hash].[ext]",
          }
        }],
      }
    ]
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        isBrowse: true
      },
    })
  ],
  devtool: 'source-map'
}
