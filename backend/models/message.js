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

messageSchema.pre("remove", async function(next) {
  try {
    // find a user
    console.log('this.user: ', JSON.stringify(this));
    let user = await User.findById(this.user);
    // remove the id of the message from their messages list
    user.messages.remove(this.id);
    // save that user
    await user.save();
    // return next
    return next();
  } catch (err) {
    return next(err);
  }
});

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