/* main blog page route and a route handler for each blog post */

const express = require("express"),
      fs = require("fs"),
      router = express.Router();

const postList = [];
let blogCounter = 0;

fs.readdirSync("./views/blog/posts/").forEach((file) => {
  postList.push((file.replace(/\.[^/.]+$/, "")));
});

router.get("/", (request, response) => {
  blogCounter++;
  response.render("blog/blog", {title: "Blog | Abdullah F. Khan",
                      author: "Abdullah F. Khan",
                      description: "Hello, I\'m Abdullah. This is my blog. You'll find my musings here when I decide to write any.",
                      numberOfPosts: (postList.length)});
  fs.writeFile("./analytics/blog.txt", `blog main page visitors: ${blogCounter}`, (err) => {
    (err) && console.log(err);
  });
});

router.get("/:postName", (request, response) => {
  let getPost = request.params.postName;
  postList.indexOf(getPost.toLowerCase()) > -1 ?
                    response.render(`blog/posts/${getPost.toLowerCase()}`, {
                      title: (getPost.split('-').map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' ')) + " | Abdullah Khan's Blog",
                      author: "Abdullah F. Khan",
                      description: "This is a post, which is part of Abdullah Khan's blog."}) :
                    response.status(404).render("errors/404");
});

module.exports = router;
