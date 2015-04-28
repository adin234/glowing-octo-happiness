var webpack = require("webpack");

module.exports = require('./make-webpack-config')({
    debug: false,
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
});
