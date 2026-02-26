const User = require("./users.model");

exports.findByEmail = (email) => User.findOne({ email });

exports.createUser = (data) => User.create(data);

exports.findById = (id) => User.findById(id);