/* main blog page route */

const express = require("express"),
      router = express.Router();

router.get("/", function(request, response){
  response.render("blog/blog", {title: "Blog | Abdullah F. Khan",
                      author: "Abdullah F. Khan",
                      description: "Hello, I\'m Abdullah. This is my blog. You'll find my musings here when I decide to write any."});
});

router.get("/:post", function(request, response){
  response.send("this is post: " + request.params.post)
});

module.exports = router;