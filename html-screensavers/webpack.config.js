'use strict';

module.exports = {
    entry: {
        './batman-covers/js/dist/index': './batman-covers/js/src/index.js'
    },
    output: {
        path: './',
        filename: '[name].js'
    },
    plugins: [
],
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'stage-0']
            }
        }, {
            test: /\.json?$/,
            loader: 'json'
        }, {
            test: /\.css$/,
            loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
        }]
    }
};
