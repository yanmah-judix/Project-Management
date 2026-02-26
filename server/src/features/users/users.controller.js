const userService = require("./users.service");

exports.register = async (req, res, next) => {
  try {
    await userService.register(req.body);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const token = await userService.login(req.body);

    res.cookie("token", token, { httpOnly: true });

    res.json({ message: "Login successful" });
  } catch (err) {
    next(err);
  }
};