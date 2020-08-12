// require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true
  },

  profileImage: String,

  passwordHash: {
    type: String,
    required: true
  }
  
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      delete ret.passwordHash;
    }
  }
});

userSchema.virtual('password').set(function(plainTextPassword) {
  const passwordHash = bcrypt.hashSync(plainTextPassword, +process.env.SALT_ROUNDS || 2);
  this.passwordHash = passwordHash;
});

// userSchema.statics.authorize = async function(username, password) {
//   const user = await this.findOne({ username });
    
//       if(!user) {
//         throw new Error('Invalid Username/Password');
//       }

//       if(!bcrypt.compareSync(password, user.passwordHash)) {
//         throw new Error('Invalid Username/Password');
//       }

//       return user;
//     });


module.exports = mongoose.model('User', userSchema);
