var path = require('path');
var webpack = require('webpack');

var config = {
    entry: [
        'webpack/hot/dev-server',
        path.resolve(__dirname, 'source/main.js')
    ],
    output: {
        path: path.resolve(__dirname, 'app/assets/js/'),
        publicPath: '/assets/js/',
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'jsx-loader?insertPragma=React.DOM&harmony'
            }
        ]
    },
    externals: {
    }
};

module.exports = config;