/* routes handler file */

let home = require("./home"),
    lab = require('./lab');

module.exports = {
    "/": home,
    "/lab" : lab
};
