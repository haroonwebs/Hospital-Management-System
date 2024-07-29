import { User } from "../models/userScheema.js";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";

export const isAdminAuth = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) {
    return next(new ErrorHandler(" Admin is not Authenticated", 403));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);

  if (req.user.role !== "Admin") {
    return next(
      new ErrorHandler(
        `${req.user.role} is not authorized for these resources`,
        403
      )
    );
  }
  next();
});

export const ispatientAuth = catchAsyncError(async (req, res, next) => {
  const token = await req.cookies.patientToken;
  if (!token) {
    return next(new ErrorHandler(" Patient is not Authenticated", 403));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);

  if (req.user.role !== "Patient") {
    return next(
      new ErrorHandler(
        `${req.user.role} is not authorized for these resources`,
        403
      )
    );
  }
  next();
});
