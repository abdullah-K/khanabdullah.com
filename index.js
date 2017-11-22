// TODO: add gzip compression to express

const express = require('express');
const app = express();
const routes = require('./routes/main');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');

// create all routes
for (var x in routes){
  app.use(x, routes[x]);
}

// ignore favicon.ico GET request
app.get('/favicon.ico', function (req, res) {
    res.status(204);
});

// handles error 404 responses
app.use(function(req, res, next) {
    res.status(404).render('errors/404', {title: 'Error 4-oh-4!'});
});

// handles error 500 responses
app.use(function(req, res, next) {
    res.status(500).render('errors/500', {title: 'Server Error!'});
});

// development
app.listen(8080);
console.log("server is live!");