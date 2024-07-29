import express from 'express';
import {config} from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { dbconnection } from './database/dpconnection.js';
import messageRouter from './router/messageRouter.js';
import  {errorMiddleware} from './middlewares/errorMiddleware.js';
import userRouter from './router/userRouter.js';
import appointmentRouter from "./router/appoimentRouter.js";



config()

const app = express();
app.use(
    cors({
        origin:[process.env.FRONTEND_URI,process.env.BACKEND_URI],
        methods:["get","post","put","delete"],
        credentials:true
        })
)
 
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/message", messageRouter );
app.use("/api/v1/user", userRouter );
app.use('/api/v1/appointment', appointmentRouter)

    dbconnection();



 app.use(errorMiddleware);
export default app;