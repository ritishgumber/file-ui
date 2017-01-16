var config = require("./webpack.config.js");
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var compiler = webpack(config);
var api = require('routes');
var server = new webpackDevServer(compiler, {
    hot: true,
    contentBase: "./src"
});
server.listen(8888);
