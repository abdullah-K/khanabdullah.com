/* routes handler file */

let home = require("./home");
let blog = require("./blog");

module.exports = {
    "/": home,
    "/blog" : blog
};