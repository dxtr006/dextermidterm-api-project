//note-(adam) I was testing adding user stuff you guys can keep this stuff commented out or if u wanna mess with it go for it kinda works 
//note 11/13/24@9:12pm(kass) I like this, I uncommented and added email + timestamps

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {type: String, require: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true }); 

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model('User', userSchema);
