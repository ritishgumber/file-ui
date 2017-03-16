var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: ['./dev/js/index.js'],
    module: {
        loaders: [
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader'
            }, {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        'react', 'es2015', 'stage-0'
                    ],
                    plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties']
                }
            }
        ]
    },
    output: {
        path: '',
        filename: 'src/js/bundle.min.js'
    },
    plugins: [],
    node: {
        fs: "empty"
    }
};
