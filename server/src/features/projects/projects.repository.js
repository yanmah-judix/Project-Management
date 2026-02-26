const Project = require("./projects.model");

exports.create = (data) => Project.create(data);

exports.findByUser = (userId) => Project.find({ user: userId });

exports.findById = (id) => Project.findById(id);