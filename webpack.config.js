/*
 * Base webpack config
 */

// Module imports
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const path = require('path')

// Config
module.exports = {
  entry: ['react-hot-loader/patch', './src'],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?modules']
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: '../'
            }
          }
        ]
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, './public/'),
    port: 3000,
    publicPath: 'http://localhost:3000/dist/',
    hotOnly: true,
    historyApiFallback: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new Dotenv()]
}
