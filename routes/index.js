var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const loggedIn = req.session.loggedIn;
  const isAdmin = loggedIn && req.session.isAdmin ? true : false
  let user = false
  if (loggedIn) {
    user = {
      username: req.session.username,
      first: req.session.first,
      last: req.session.last
    }
  }
  res.render('index', { loggedIn: loggedIn, isAdmin: isAdmin, user: user });
});

module.exports = router;