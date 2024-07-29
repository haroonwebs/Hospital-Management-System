import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


 const userScheema = new mongoose.Schema({
   firstName: {
     type: String,
     required: true,
     minLength: [3, "First Name contain atleast 3 characters"],
   },

   lastName: {
     type: String,
     required: true,
     minLength: [3, "Last Name contain atleast 3 characters"],
   },

   email: {
     type: String,
     required: true,
     validate: [validator.isEmail, "Last Name contain atleast 3 characters!  "],
   },

   phone: {
     type: String,
     required: true,
     minLength: [11, "Phone Number contain atleast 11 digits!  "],
     maxLength: [11, "Phone Number contain maximum 11 digits!  "],
   },

   cnic: {
     type: String,
     required: true,
     minLength: [13, "CNIC Number contain atleast 13 digits!  "],
     maxLength: [13, "CNIC Number contain maximum 13 digits!  "],
   },

   dob: {
     type: Date,
     required: [true, "Date of Birth is required"],
   },

   gender: {
     type: String,
     required: true,
     enum: ["Male", "Female"],
   },
   password: {
     type: String,
     required: true,
     minLength: [8, "Password contain atleast 8 characters !"],
     select: false,
   },

   role: {
     type: String,
     required: true,
     enum: ["Admin", "Patient", "Doctor"],
   },

   doctorDepartment: {
     type: String,
   },

   docAvatar: {
     public_id: String,
     url: String,
   },
 });

userScheema.pre('save', async function (next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
});

userScheema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userScheema.methods.generateJsonWebToken = function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPRIES,
    });
}

export const User = mongoose.model('User', userScheema );