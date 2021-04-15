"use strict";

var models = require('../models');

var createUser = function createUser(req, res) {
  console.log(req.body);
  var user = {
    name: req.body.name,
    profilePicture: req.body.profilePicture
  };
  models.User.create(user).then(function (result) {
    res.status(201).json({
      success: 'true',
      user: result
    });
  })["catch"](function (error) {
    res.status(500).json({
      success: 'false',
      error: error
    });
  });
};

module.exports = {
  createUser: createUser
};