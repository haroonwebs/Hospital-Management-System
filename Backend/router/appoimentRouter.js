import express from 'express'
import { deleteAppointment, getAllAppointments, getAppointment, updateAppointmentStatus } from "../controllers/appointmentController.js";
import { isAdminAuth, ispatientAuth } from '../middlewares/auth.js';



const router = express.Router();

router.post('/getappointment', ispatientAuth ,getAppointment);
router.get('/allApointments', isAdminAuth, getAllAppointments)
router.put("/update/:id", isAdminAuth, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuth, deleteAppointment);


export default router;
