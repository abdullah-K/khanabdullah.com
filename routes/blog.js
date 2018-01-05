/* main blog page route and a route handler for each blog post */

const express = require("express"),
      fs = require("fs"),
      router = express.Router();

const postList = [];

fs.readdirSync("./views/blog/posts/").forEach((file) => {
  postList.push((file.replace(/\.[^/.]+$/, "")));
});

router.get("/", (request, response) => {
  response.render("blog/blog", {title: "Blog | Abdullah F. Khan",
                      author: "Abdullah F. Khan",
                      description: "Hello, I\'m Abdullah. This is my blog. You'll find my musings here when I decide to write any.",
                      numberOfPosts: (postList.length)});
});

router.get("/:postName", (request, response) => {
  let getPost = request.params.postName;
  postList.indexOf(getPost.toLowerCase()) > -1 ?
                    response.render(`blog/posts/${getPost.toLowerCase()}`, {
                      title: (getPost.toLowerCase().replace(/^(.)|\s(.)/g, ($1) => $1.toUpperCase())) + " | Abdullah Khan's Blog",
                      author: "Abdullah F. Khan",
                      description: "This is a post, which is part of Abdullah Khan's blog."}) :
                    response.status(404).render("errors/404");
});

module.exports = router;