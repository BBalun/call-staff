var express  = require('express');
var app      = express();
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();

app.all("/api/*", function(req, res) {
    apiProxy.web(req, res, {target: "http://localhost:8081"});
});

app.all("/*", function(req, res) {
    apiProxy.web(req, res, {target: "http://localhost:3000"});
});


app.listen(5000);