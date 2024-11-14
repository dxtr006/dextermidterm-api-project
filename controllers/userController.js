
//note-(adam) I was testing adding user stuff you guys can keep this stuff commented out or if u wanna mess with it go for it kinda works 
// 11/13/24@9:30pm(kass) I like this, uncommented, added an option for the user to login with either username or email, as well as a check for dupes

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already in use.' });
    }
    const user = new User({
      username,
      email,
      password,
    });
    await user.save();
    res.status(201).json({ message: 'User registered.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });
    if (!user) {
      console.log('User Not Found:', usernameOrEmail);
      return res.status(400).json({ error: 'Invalid credentials.' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password Validation:', { plaintext: password, hashed: user.password, isPasswordValid });
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: error.message });
  }
};

