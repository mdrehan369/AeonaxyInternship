import mongoose from "mongoose";
import bcryptjs from "bcryptjs"

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
    trim: true,
    lowercase: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  },

  password: {
    type: String,
    required: true,
    trim: true
  },

  avatar: {
    type: String
  },

  location: {
    type: String,
  },

  option: {
    type: String
  }

});

userSchema.method.verifyPassword = async (password) => {
    const match = await bcryptjs.compare(password, this.password);
    return match;
}

userSchema.pre("save", async function(fn) {
    if(!this.isModified("password")) fn();
    this.password = await bcryptjs.hash(this.password, 10);
    fn();
})

export const userModel = mongoose.model("User", userSchema);