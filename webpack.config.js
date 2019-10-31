module.exports = {
  entry: {
    index: './browser/index.js',
    simplecv: './browser/simplecv.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  devtool: '#source-map'
};