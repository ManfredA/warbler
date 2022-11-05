import { User } from "./user.js";
import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxLength: 160
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
},   {
  timestamps: true
})

messageSchema.pre('remove', async function (next) {
  try {
    const user = await User.findById(this.user)
    user.messages.remove(this.id)
    await user.save
    return next()
  } catch (error) {
    return next(error)
  }
})

messageSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
messageSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (_, ret) {   delete ret._id  }
});

export const Message = mongoose.model('Message', messageSchema)