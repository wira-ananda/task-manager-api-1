const User = require("../models/User");

// REGISTER
exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email sudah terdaftar" });

    const user = await User.create({ username, email, password });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
};

// LOGIN
exports.loginUser = async (req, res, next) => {
  try {
    const { emailOrUsername, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) return res.status(400).json({ message: "Akun tidak ditemukan" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Password salah" });

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
};
