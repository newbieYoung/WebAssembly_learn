const config = {
  entry: {
    index: './browser/index.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [{
      test: /\.asc$/, // assemblyscript Source File
      exclude: "/node_modules/",
      loader: "assemblyscript-live-loader"
    }]
  }
};

module.exports = config;