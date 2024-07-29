import { catchAsyncError } from '../middlewares/catchAsyncError.js'
import ErrorHandler from '../middlewares/errorMiddleware.js'
import { User } from '../models/userScheema.js'
import { generateToken } from "../services/jwtToken.js";
import cloudinary from 'cloudinary'


export const patientRigester = catchAsyncError(async(req, res, next) => {
 const {firstName, lastName, email, phone, dob, cnic, password, gender, role} = req.body;

 if (
   !firstName ||
   !lastName ||
   !email ||
   !phone ||
   !dob ||
   !cnic ||
   !password ||
   !gender ||
   !role
 ) {
   return next(new ErrorHandler("Please Fill all required fields", 400));
 }

 let user = await User.findOne({ email });
 if(user){
    return next( new ErrorHandler("User already exist ", 400))
 }

 user = await User.create({
   firstName,
   lastName,
   email,
   phone,
   dob,
   cnic,
   password,
   gender,
   role,
 }); 
 generateToken(user, "User Rigester Susseccfully", 200, res);
  
});

export const login = catchAsyncError(async(req, res, next)=>{

  const { email, password, confirmPassword, role }= req.body;

  if( !email || !password || !confirmPassword || !role){
    return next(new ErrorHandler("Please fill all required fields! ", 400))
  }
  
  if(password !== confirmPassword){
    return next(new ErrorHandler("Password and Confirm Password do not Match! ", 400))
  }
   
  const user = await User.findOne({email}).select("+password")
  
  if(!user){
    return next(new ErrorHandler("Invalid Email or Password ! "))
  }

  const passwordMatching = await user.comparePassword(password);
 if(!passwordMatching){
  return next(new ErrorHandler("invalid Email or Password ! ", 400))
 }
  if(role !== user.role){
    return next(new ErrorHandler("User with this Role do not exist ! "))
  }
  generateToken( user, "Logged in Susseccfully", 200, res);

})

export const addNewAdmin = catchAsyncError(async(req, res, next) => {
  const { firstName, lastName, email, phone, dob, cnic, password, gender } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !cnic ||
    !password ||
    !gender
  ) {
    return next(new ErrorHandler("Please fill all required fields! ", 400));
  }
  const isRegistered = await User.findOne({email});
  if(isRegistered){return next(new ErrorHandler("Admin with this Email is already exist ! ", 400 ))

  } 
 
  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    cnic,
    password,
    gender,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: " New Admin Registered Successfully"
  })
})

export const getAllDoctors = catchAsyncError(async(req, res, next) => {

  const doctors = await User.find({role : "Doctor"});
   
  res.status(200).json({
    success : true,
    doctors,
  })
  
})

export const getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});



export const logoutAdmin = catchAsyncError(async(req, res, next) => {
  res
  .status(200).cookie("adminToken", "", {
    httpOnly : true ,
    expires : new Date(Date.new())
  }).json({
    success : true ,
    message : " Admin LoggedOut Successfully"
  })
});

export const logoutPatient = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: " Patient LoggedOut Successfully",
    });
});


export const addNewDoctor = catchAsyncError(async(req, res, next) => {
  if(!req.files || Object.keys(req.files).length === 0){
    return next(new ErrorHandler("Doctor Avatar Required ! ", 400));
  }
  const{ docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

  if(!allowedFormats.includes(docAvatar.memetype)){
    return next(new ErrorHandler("File Formate in not Suported! "))
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    cnic,
    password,
    gender,
    doctorDepartment,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !cnic ||
    !password ||
    !gender ||
    !doctorDepartment
  ) {
    return next(new ErrorHandler("Please Fill all Required Fields! ", 400));
  }

  const isRegistered = await User.findOne({email})

  if(isRegistered){
     return next(new ErrorHandler(`${isRegistered.role} already registered with this Email! `, 400));
  }

  const sendToCloudinary = await cloudinary.uploader.upload( docAvatar.tempFilePath)
  
  if(!sendToCloudinary || sendToCloudinary.error){
    console.error(
      "cloudinary Error",
      sendToCloudinary.error || "unknown cloudinary error"
    );
  }

  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    cnic,
    password,
    gender,
    doctorDepartment,
    role: "Doctor",
    docAvatar: {
      public_id: sendToCloudinary.public_id,
      url: sendToCloudinary.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: " New Doctor Registered Successfully",
    doctor,
  })

});

