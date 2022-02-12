
function hbsHelpers(hbs) {
    hbs.registerHelper('getBoolean', function (locked, cb) {
        return locked == 1 ? "True" : "false"
    });
}

module.exports = hbsHelpers;