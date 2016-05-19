var webpack = require('webpack');

module.exports = {
  entry: {
    app: ["./index.js"]
  },
  devtool: "source-map",
  output: {
    path: "./build",
    filename: "jsnes.min.js",
    publicPath:"/",
    libraryTarget: "var",
    library: "JSNES"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  externals: {
    "jquery": "jQuery"
  },
  devServer: {
    inline: true,
    contentBase: "./public"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
