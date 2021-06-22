const path = require("path");

module.exports = {
  entry: {
    index: ["./src/index.js"], // Import core-js and regenerator-runtime in the entry file instead of polyfilling
    edit: ["./src/edit.js"],
  },
  output: {
    path: path.resolve(__dirname, "public/scripts"),
    filename: "[name]-bundle.js",
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.css$/,
            use: ['style-loader','css-loader'], // regular css
        }
    ]
},
  devServer: {
    contentBase: path.join(__dirname, "public"),
    watchContentBase: true,
    port: 9090,
  },
  devtool: 'eval-cheap-module-source-map',
};
