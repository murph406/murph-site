// var User = require('./../models/user');
// var bcrypt = require('bcryptjs');

module.exports = {
  login: function (req, res, next) {
    let { password } = req.body
    console.log(password)
    if (password == "406") {
      return res.status(200).send({ success: true });
    } else {
      return res.status(401).send({ error: "Hint 406" });
    }
  },
}