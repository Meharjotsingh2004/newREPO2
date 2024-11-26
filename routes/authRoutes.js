import express from 'express'
import {forgotPasswordController, loginController, registerController, testController} from '../controller/authController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router();


//For Registeration
router.post('/register' , registerController)

//LOGIN||POST
router.post('/login' , loginController)

//forgot password || post
router.post('/forgot-password' , forgotPasswordController)

//test routes
router.get('/test' , requireSignIn,isAdmin, testController)

//protected Route User
router.get('/user-auth' , requireSignIn , (req , res)=>{
    res.status(200).send({ok : true})
})

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });

export default router; 