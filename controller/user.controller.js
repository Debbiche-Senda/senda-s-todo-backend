const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getUserById = async (req, res) => {
  const { _id } = req.params;
  const user = await User.findById(_id);

  try {
    await res.status(200).json({ msg: 'Get user success', user });
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: 'Get user failed' });
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ msg: 'Bad credentiel' });
  console.log(user);
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(404).json({ msg: 'Bad credentiel' });
  console.log(isMatch);
  try {
    let payload = {
      id: user._id,
      email: user.email
    };
    const token = await jwt.sign(payload, process.env.secretOrPrivateKey);

    res.status(200).json({ token: `Bearer ${token}`, user });
  } catch (error) {
    console.log('login error =', error);
    res.status(401).json({ msg: 'Login user failed' });
  }
};

exports.userRegister = async (req, res) => {
  const newUser = new User({ ...req.body });
  const user = await User.findOne({ email: newUser.email });

  if (user) {
    return res.status(500).json({ msg: 'User already exists' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    console.log(hash);
    newUser.password = hash;

    await newUser.save();

    res.status(200).json({ msg: 'Register success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Register failed' });
  }
};
