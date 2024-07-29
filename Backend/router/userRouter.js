import express from 'express';
import { addNewAdmin, addNewDoctor, getAllDoctors, getUserDetails, login, logoutAdmin, logoutPatient, patientRigester } from '../controllers/userController.js'
import { isAdminAuth, ispatientAuth  } from '../middlewares/auth.js'

const router = express.Router();

router.post("/patient/register", patientRigester);
router.post("/login", login);
router.post("/admin/newAdmin", isAdminAuth ,addNewAdmin);
router.post("/doctor/newDoctor", isAdminAuth, addNewDoctor);

router.get("/doctors", getAllDoctors);
router.get("/admin/me", isAdminAuth, getUserDetails);
router.get("/patient/me", ispatientAuth ,getUserDetails);
router.get("/admin/logOut", isAdminAuth, logoutAdmin);
router.get("/patient/logout", ispatientAuth, logoutPatient);



export default router;