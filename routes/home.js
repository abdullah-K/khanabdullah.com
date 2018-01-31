/* main homepage route */

const express = require("express"),
      router = express.Router(),
      fs = require('fs');

let homeCounter = 0;
router.get("/", (request, response) => {
  homeCounter++;
  response.render("home", {title: "Abdullah F. Khan",
                      author: "Abdullah F. Khan",
                      description: "Hello, I\'m Abdullah. Welcome to my home, on the internet."});
  fs.writeFile("./analytics/homepage.txt", `${homeCounter} homepage visits so far`, function(err) {
      (err) && console.log(err);
  });
});

module.exports = router;