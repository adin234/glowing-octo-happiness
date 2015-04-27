var webpack = require("webpack");
var path = require('path');
var fs = require('fs');

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(srcpath + '/' + file).isDirectory();
  });
}

function getFiles(srcpath) {
    return fs.readdirSync(srcpath).filter(function(file) {
        return fs.statSync(srcpath + '/' + file).isFile();
    });
}


var components = getDirectories('assets/js/components')
                    .slice()
                    .map(function(component) {
                        return './components/' + component;
                    });

var entries = {
    components: components
};

var pages = getFiles('assets/js/pages')
                    .forEach(function(page) {
                        entries[page.slice(0, -3)] = './pages/' + page.slice(0, -3);
                    });

module.exports = {
    context: __dirname + '/assets/js',
    entry: entries,
    output: {
        path: __dirname + '/assets/js/bundle',
        filename: "[name].dist.js"
    },
    target: 'web', //node|web
    debug: true,
    module: {
        loaders: [
            { test: /\.html$/, loader: "html-loader"}
        ]
    },
    resolve: {
        extensions: ['', '.js']
    },
    plugins: [
        // this chunks the commonly used modules.
        new webpack.optimize.CommonsChunkPlugin({
            name: 'components'
        })
    ]
};