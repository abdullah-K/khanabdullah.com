/* main blog page route */

const express = require("express"),
      router = express.Router();

router.get("/", function(req, res){
  res.render("blog/blog", {title: "Blog | Abdullah F. Khan",
                      author: "Abdullah F. Khan",
                      description: "Hello, I\'m Abdullah. This is my blog. You'll find my musings here when I decide to write any."});
});

router.get("/:post", function(req, res){
  res.send("this is post: " + req.params.post)
});

module.exports = router;