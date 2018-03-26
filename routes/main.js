/* routes handler file */

let home = require("./home"),
    blog = require("./blog"),
    experiments = require('./experiments');

module.exports = {
    "/": home,
    "/blog" : blog,
    "/experiments" : experiments
};
