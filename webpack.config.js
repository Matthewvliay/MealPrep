const path = require('path');

module.exports = {
    entry: {
        index: ['./src/index.js'], // Import core-js and regenerator-runtime in the entry file instead of polyfilling
        edit: ['./src/edit.js']
    },
    output: {
        path: path.resolve(__dirname, 'public/scripts'),
        filename: '[name]-bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env"]
                }
            }
        }]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: '/scripts/',
        watchContentBase: true,
        port: 3000
    },
    devtool: 'cheap-source-map'
}