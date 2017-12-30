const express = require("express"),
      compression = require("compression"),
      app = express(),
      routes = require("./routes/main"),
      port = 8080;

// one month cache period for static files
let cacheTime = 30 * 24 * 60 * 60 * 1000;

// compress all app responses (before sending to client)
app.use(compression());
// use the 'public' directory to serve static files (and set cache time)
app.use(express.static(__dirname + "/public", {maxAge: cacheTime}));
// set express view engine to render Pug
app.set("view engine", "pug");

// create all routes using individual pages
for (let pages in routes){
  app.use(pages, routes[pages]);
}

// ignore favicon.ico GET request (it's handled by the view engine)
app.get("/favicon.ico", function (req, res) {
    res.status(204);
});

// handles error 404 responses
app.use(function(req, res, next) {
    res.status(404).render("errors/404", {title: "Error 4-oh-4!"});
});

// handles error 500 responses
app.use(function(req, res, next) {
    res.status(500).render("errors/500", {title: "Server Error!"});
});

app.listen(port);
console.log(`server is live on port ${port}!`);