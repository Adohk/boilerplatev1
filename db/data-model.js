/*        data-model.js: define how data is structured and managed        */
/*        This is the only file that requires the Database object         */

const { db } = require('./db');


// Async functions
db.readOne = function (sql, target) {
    const dbWrapper = this;
    return new Promise(function (resolve, reject) {
        dbWrapper.get(sql, target, function (err, row) {
            if (err) { console.log(err); reject(err); } else { resolve(row); }
        });
    });
}

db.readAll = function (sql) {
    const dbWrapper = this;
    return new Promise(function (resolve, reject) {
        dbWrapper.all(sql, function (err, row) {
            if (err) { console.log(err); reject(err); } else { resolve(row); }
        });
    });
};

db.runAsync = function (sql, values) {
    var dbWrapper = this;
    return new Promise(function (resolve, reject) {
        dbWrapper.run(sql, values, function (err, row) {
            if (err) { console.log(err); reject(err); } else { resolve(row); }
        });
    });
};


// app functions
async function loginUser(username, password) {
    const sql = "SELECT username, first, last, locked, isadmin FROM Users WHERE username = ? AND password = ?"
    const user = [username, password]
    return await db.readOne(sql, user);
}

async function getUsers() {
    const sql = "SELECT * FROM Users WHERE isadmin = 0 ORDER by id ASC"
    return await db.readAll(sql);
}

async function createUser(user) {
    const sql = "INSERT INTO Users (username, password, first, last, locked, isadmin) VALUES (?, ?, ?, ?, ?, ?);"
    const pass = Math.random().toString(36).slice(-8);
    const locked = 0
    const isadmin = 0
    const newUser = [user.username, pass, user.first, user.last, locked, isadmin]
    return await db.runAsync(sql, newUser);
}

async function deleteUser(id) {
    const sql = "DELETE FROM Users WHERE isadmin = 0 AND id = ?"
    return await db.runAsync(sql, id);
}

async function updateUserPass(id) {
    const sql = "UPDATE Users SET password=? WHERE id = ?"
    const newpass = Math.random().toString(36).slice(-8);
    const values = [newpass, id]
    return await db.runAsync(sql, values);
}


module.exports = {
    loginUser,
    getUsers,
    createUser,
    updateUserPass,
    deleteUser
}