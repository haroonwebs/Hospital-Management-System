import mongoose from "mongoose";
import validator from "validator";

const appointmentScheema = new mongoose.Schema({
  fName: {
    type: String,
     required: [true, "First Name Is Required!"],
    minLength: [3, "First Name Must Contain At Least 3 Characters!"],
  },

  lName: {
    type: String,
     required: [true, "Last Name Is Required!"],
    minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
  },

  email: {
    type: String,
     required: [true, "Email Is Required!"],
    validate: [validator.isEmail, "Provide A Valid Email!"],
  },

  phone: {
    type: String,
     required: [true, "Phone Is Required!"],
    minLength: [11, "Phone Number Must Contain Exact 11 Digits!"],
    maxLength: [11, "Phone Number Must Contain Exact 11 Digits!"],
  },

  cnic: {
    type: String,
     required: [true, "NIC Is Required!"],
    minLength: [13, "NIC Must Contain Only 13 Digits!"],
    maxLength: [13, "NIC Must Contain Only 13 Digits!"],
  },

  dob: {
    type: Date,
    required: [true, "DOB Is Required!"],
  },

  gender: {
    type: String,
     required: [true, "Gender Is Required!"],
    enum: ["Male", "Female"],
  },

  appointment_date: {
    type: String,
     required: [true, "Appointment Date Is Required!"],
  },

  department: {
    type: String,
     required: [true, "Department Name Is Required!"],
  },

  doctorName:{
    type:String,
    required:[true, "Doctor is name is required! "],
    minLength:[3,"Doctor name atleast contain minmum 3 charactars!"]
  },


  address: {
    type: String,
     required: [true, "Address Is Required!"],
  },
  // patientId: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "User",
  //   required: [false, "Patient Id Is Required!"],
  // },


});

export const Appointment = mongoose.model("Appointment", appointmentScheema);
