/* main homepage route */

const express = require("express"),
      router = express.Router();

router.get("/", (request, response) => {
  response.render("home", {title: "Abdullah F. Khan",
                      author: "Abdullah F. Khan",
                      description: "Hello, I\'m Abdullah. Welcome to my home, on the internet."});
});

module.exports = router;