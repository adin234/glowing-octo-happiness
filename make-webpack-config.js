var webpack = require("webpack"),
	path = require('path'),
	fs = require('fs'),
	$extend = require('extend');

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

module.exports = function(opts) {

	var defaults = {
	    context: __dirname + '/assets/js',
	    entry: {},
	    output: {
	        path: __dirname + '/assets/js/bundle',
	        filename: "[name].dist.js"
	    },
	    target: 'web', //node|web
	    devtool: 'inline-source-map',
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

	defaults.entry = entries;

	return $extend(true, defaults, opts);
};