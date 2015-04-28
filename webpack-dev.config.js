var webpack = require("webpack");

module.exports = require('./make-webpack-config')({
    debug: true,
    plugins: [
        new webpack.OldWatchingPlugin()
    ]
});