/* route handler for the "lab" page */

const express = require("express"),
      fs = require("fs"),
      router = express.Router();

const experimentsList = [];

fs.readdir("./views/experiments/", (err, folder) => {
  folder.forEach((experiment) => {
    experimentsList.push(experiment);
  });
})

let labRequestCounter = 0;
router.get("/", (request, response) => {
  labRequestCounter++;
  response.render("experiments/lab", {
    title: "Lab | Abdullah F. Khan",
    author: "Abdullah F. Khan",
    description: "Hello, I\'m Abdullah. This is my lab, where you can find all my completed projects here.",
  })
  fs.writeFile("./analytics/lab.txt", `${labRequestCounter} lab visits so far`, (err) => {
    (err) && console.log(err);
});
});

router.get("/:expName", (request, response) => {
  let getExp = request.params.expName.toLowerCase();
  experimentsList.indexOf(getExp) > -1 ?
    response.render(`experiments/${getExp}/${getExp}`, {
      title: (getExp.replace("-", " ").replace(/^(.)|\s(.)/g, ($1) => $1.toUpperCase())) + " | Abdullah Khan's Lab",
      author: "Abdullah F. Khan",
      description: "Welcome to Abdullah's lab where this project is showcased."
    }) :
    response.status(404).render("errors/404");
});

module.exports = router;
