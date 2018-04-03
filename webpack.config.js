let webpack = require('webpack');
let path = require('path');

module.exports = {
    context: __dirname + '/js',

    entry: './index.js',
    mode: 'production',

    output: {
        path: __dirname + "/public",
        filename: "build.js"
    },

    watch: true,

    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: 'es2015'
                }
            }
        }
        ],
    }
};
