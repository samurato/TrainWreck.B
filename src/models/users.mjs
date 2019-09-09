import mongoose from 'mongoose';
const crypto = require('crypto');

const usersSchema = mongoose.Schema({
  'name'        : String,
  'email'       : String,
  'password'    : String,
  'salt'        : String,
  'role'        : {
                    type: String,
                    enum : ['operator','admin'],
                    default: 'operator'
                }
});

usersSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (err) {
      return next(err);
    }
  });
  
  usersSchema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
  };
  

// {name: "John Mail", email: "mail@mail.com", password: "password123", role: "operator"}

export default mongoose.model('Users', usersSchema);
