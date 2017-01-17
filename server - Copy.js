var config = require("./webpack.config.js");
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var http = require('http');
var path = require('path');
var compiler = webpack(config);
var Express = require('express');
var app = Express();
//var routes = require('./routes')(app);
var server = new webpackDevServer(compiler, {
    hot: true,
    contentBase: "./src"
});
//app.use('/', Express.static(__dirname));
app.use('/', Express.static(path.join(__dirname, '/src')));
app.set('views', __dirname + '/src');
app.engine('html', require('ejs').renderFile);
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.get('/', function(req, res) {
    res.render('./index.html');
});

var server = http.createServer(app);
server.listen(process.env.PORT || 3012, function() {
    console.log("Listening on %j", server.address());
});
