const path = require('path')
const webpack = require('webpack')

const DIRECTORY = path.join(__dirname)

const includePaths = [
  path.resolve('index.web.js'),
  path.resolve('app'),
  path.resolve('node_modules/react-router'),
  path.resolve('node_modules/react-native-router-flux'),
  path.resolve('node_modules/react-native-button'),
  path.resolve('node_modules/react-native-drawer'),
  path.resolve('node_modules/react-native-drawer-layout'),
  path.resolve('node_modules/react-native-navbar'),
  path.resolve('node_modules/react-native-tabs'),
  path.resolve('node_modules/react-native-experimental-navigation')
];
console.log(path.resolve('node_modules/react-native-router-flux'))

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'src')
  },
  entry: [
    path.join(__dirname, '../index.web.js')
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        //exclude: /node_modules/,
        //exclude: /(?!node_modules\/(react-native-button|react-native-drawer|react-native-navbar|react-native-drawer-layout|react-native-router-flux).*)node_modules.*/,
        include: includePaths,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          "presets": [
            "es2015",
            "stage-1",
            "react"
          ],
          "plugins": [
            "transform-decorators-legacy"
          ]
        }
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        loader: 'url-loader',
        query: { name: '[name].[hash:16].[ext]' }
      }
    ]
  },
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    }
  }
}
