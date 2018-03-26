/* route handler for each experiment page */

const express = require("express"),
      fs = require("fs"),
      router = express.Router();

const expsList = [];

fs.readdir("./views/experiments/", (err, folder) => {
  folder.forEach((experiment) => {
    expsList.push(experiment);
  });
})

router.get("/:expName", (request, response) => {
  let getExp = request.params.expName.toLowerCase();
  expsList.indexOf(getExp) > -1 ?
                    response.render(`experiments/${getExp}/${getExp}`, {
                      title: (getExp.replace(/^(.)|\s(.)/g, ($1) => $1.toUpperCase())) + " | Abdullah Khan's Experiments",
                      author: "Abdullah F. Khan",
                      description: "This is one of Abdullah Khan's experiments with code."}) :
                    response.status(404).render("errors/404");
});

module.exports = router;