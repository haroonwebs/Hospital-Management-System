import { Message } from "../models/messageScheema.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const sendMessage = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;
  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler("Please Fill required fields", 400));
  }
  await Message.create({ firstName, lastName, email, phone, message });
  res.status(200).json({
    success: true,
    message: "Message delivered successfuly",
  });
});

export const getAllmessages = catchAsyncError(async(req, res, next) =>{
  const allmessage = await Message.find();
  res.status(200).json({
    success: true,
    allmessage,
  })
})
