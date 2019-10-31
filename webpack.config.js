module.exports = {
  entry: {
    index: './browser/index.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  devtool: '#source-map'
};