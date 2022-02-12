var express = require('express');
var router = express.Router();
var dataModel = require('../db/data-model.js');

/* POST login page. */
router.post('/auth', async function (req, res) {

  var username = req.body.inputUser;
  var password = req.body.inputPass;
  //console.log("user:" + username + " " + password)

  function redirectTo(error = true) {
    req.session.loginError = true
    res.redirect('/login');
    res.end();
  }

  if (!(username && password)) {
    redirectTo()
  }

  try {
    let result = await dataModel.loginUser(username, password);

    //console.log(result)
    if (result) {
      req.session.loggedIn = true;
      req.session.username = result.username;
      req.session.first = result.first;
      req.session.last = result.last;
      req.session.isAdmin = result.isadmin == 1 ? true : false;

      res.redirect("/")
      res.end();
    } else {
      redirectTo()
    }
  } catch (error) {
    redirectTo()
  }

});

/* GET login page. */
router.get('/', function (req, res, next) {
  var loggedIn = req.session.loggedIn ? true : false
  console.log("Logged in :" + loggedIn)
  if (req.session.loginError) {
    req.session.loginError = false
    res.render('login', { error: true });
  } else {
    res.render('login');
  }
});

module.exports = router;
