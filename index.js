const express = require('express');
const app = express();
const routes = require('./routes/main');

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'pug')

// create all routes
for (var x in routes){
  app.use(x, routes[x]);
}

// ignore favicon.ico GET request
app.get('/favicon.ico', function(req, res) {
    res.status(204);
});

// development
app.listen(8080);
console.log("server is live!");