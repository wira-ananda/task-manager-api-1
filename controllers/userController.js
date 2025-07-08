const User = require("../models/User");

// Buat user baru
exports.createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newEntry = await User.create({
      username,
      email,
      password,
    });
    res.status(201).json(newEntry);
  } catch (err) {
    next(err);
  }
};
