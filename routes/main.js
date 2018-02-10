/* routes handler file */

let home = require("./home"),
    blog = require("./blog");

module.exports = {
    "/": home,
    "/blog" : blog
};
