const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'production',
  entry: './src/js/canvas.js',
  output: {
    path: __dirname + '/docs/',
    filename: './js/canvas.bundle.js'
  },
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new HtmlWebpackPlugin({
      title: 'Production',
      template: 'src/index.html'
    }),
  ],
  devtool: 'source-map',
};