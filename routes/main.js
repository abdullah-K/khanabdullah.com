/* routes handler file */

let home = require('./home');
let projects = require('./projects');

module.exports = {
    "/": home,
    "/portfolio" : projects
};