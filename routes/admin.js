var express = require('express');
var router = express.Router();

var dataModel = require('../db/data-model.js');

/* GET home page. */
router.get('/', async function (req, res, next) {
    if (!(req.session.loggedIn && req.session.isAdmin)) {
        res.redirect('/');
    }

    let result = await dataModel.getUsers()

    if (result) {
        var msg = false
        if (req.session.dbmsg != false) {
            msg = req.session.dbmsg
        } else {
            req.session.dbmsg = false
        }
        res.render('admin', { users: result, msg: msg });
    } else {
        res.render('admin', { error: "Error Fetching Users" });
    }
});

router.get('/reset/:id?', async function (req, res, next) {
    if (!(req.session.loggedIn && req.session.isAdmin)) {
        res.redirect('/');
    }

    let id = req.params.id
    if (id == 1) {
        res.redirect('/admin');
    } else {
        try {
            let result = await dataModel.updateUserPass(id)
            res.redirect('/admin');
        } catch (error) {
            res.render('admin', { error: error.message });
        }

    }

});

router.get('/delete/:id?', async function (req, res, next) {
    if (!(req.session.loggedIn && req.session.isAdmin)) {
        res.redirect('/');
    }

    let id = req.params.id
    if (id == 1) {
        res.redirect('/admin');
    } else {
        try {
            let result = await dataModel.deleteUser(id)
            res.redirect('/admin');
        } catch (error) {
            res.render('admin', { error: error.message });
        }
    }

});

router.post('/create', async function (req, res, next) {
    if (!(req.session.loggedIn && req.session.isAdmin)) {
        res.redirect('/login');
    }

    let newUser = {
        username: req.body.inputUser,
        first: req.body.inputFname,
        last: req.body.inputLname,
    }

    try {
        var result = await dataModel.createUser(newUser)
        req.session.dbmsg = false
        res.redirect('/admin');
    } catch (error) {
        req.session.dbmsg = error.message
        res.redirect('/admin');
    }

});

module.exports = router;
