import bcrypt from 'bcrypt'
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }
  ],
},   {
  timestamps: true
})

userSchema.pre('save', async function(next) {
  try {
    if(!this.isModified('password')) {
      return next()
    }
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword;
    return next()
  } catch (error) {
    console.error(error);
    return next(error)
  }
})

userSchema.methods.comparePassword = async function(candidatePassword, next) {
  console.log('hey!');
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    return next(error)
  }
}


export const User = mongoose.model('User', userSchema)