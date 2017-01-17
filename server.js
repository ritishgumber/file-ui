var http = require('http');
var path = require('path');
var Express = require('express');
var app = Express();

app.use('/', Express.static(path.join(__dirname, 'src')));

var server = http.createServer(app);
server.listen(process.env.PORT || 3012, function() {
    console.log("Listening on %j", server.address());
});
