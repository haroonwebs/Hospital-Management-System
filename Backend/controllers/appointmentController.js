import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userScheema.js";
import { Appointment } from "../models/appointmentScheema.js";

export const getAppointment = catchAsyncError(async (req, res, next) => {
  const {
    fName,
    lName,
    email,
    phone,
    cnic,
    dob,
    gender,
    appointment_date,
    department,
    doctorName,
    address,
  } = req.body;

  if (
    !fName ||
    !lName ||
    !email ||
    !phone ||
    !cnic ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctorName ||
    !address
  ) {
    return next(new ErrorHandler("Please Fill Required Fields", 400));
  }

  //const patientId = req.user._id;

  const appointment = await Appointment.create({
    fName,
    lName,
    email,
    phone,
    cnic,
    dob,
    gender,
    appointment_date,
    department,
    doctorName,
    address,
    //patientId,
  });
  res.status(200).json({
    success: true,
    appointment,
    message: "Appointment Send!",
  });
});

export const getAllAppointments = catchAsyncError(async (req, res, next) => {
  const allAppointments = await Appointment.find();
  res.status(200).json({
    success: true,
    allAppointments,
  });
});

export const updateAppointmentStatus = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    const appointment = await Appointment.findById();
    if (appointment) {
      return next(
        new ErrorHandler("Appointment with this id do not found! ", 404)
      );
    }

    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndUpdate: false,
    });
    res.status(200).json({
      success: true,
      message: "Appointment status Updated successfully",
      appointment,
    });
  }
);

export const deleteAppointment = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await Appointment.findById();
  if (appointment) {
    return next(
      new ErrorHandler("Appointment with this id do not found! ", 404)
    );
  }
  await appointment.deleteOne();

  res.status(200).json({
    success: true,
    message: "Appointment Deleted successfully! ",
    appointment,
  });
});
