/* routes handler file */

let home = require("./home"),
    blog = require("./blog"),
    lab = require('./lab');

module.exports = {
    "/": home,
    "/blog" : blog,
    "/lab" : lab
};
