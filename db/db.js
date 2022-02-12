/*                db.js -- Database object configuration                  */
/*           verbose = long stack traces, for development only            */
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// sample db u|p: admin - admin / user - user 

const dbPath = path.resolve(__dirname, './sample.db')

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) { console.error(err.message); return } else { console.log('Connected to the database.'); }
});

module.exports = {
    db
};