import mongoose from "mongoose";
import validator from "validator";

const messageScheema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First Name contain atleast minimum 3 characters"],
  },

  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last Name contain atleast minimum 3 characters"],
  },

  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "please provide valid email!  "],
  },

  phone: {
    type: String,
    required: true,
    minLength: [11, "Phone Number contain atleast minimum 11 digits"],
    maxlength: [11, "Phone Number contain atleast minimum 11 digits"],
  },

  message: {
    type: String,
    required: true,
    minLength: [10, "Message contain atleast minimum 11 character"],
  },
});

export const Message = mongoose.model("Message", messageScheema);
