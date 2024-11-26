import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import usermodel from "../models/usermodel.js";
import JWT from "jsonwebtoken";

export async function registerController(req, res) {
  try {

    const { name, email, password, phone, address,answer } = req.body;

    if (!name || !email || !password || !phone || !address||!answer) {
      return res.send({ message: "Details Not Filled Properly" });
    }
    //existing User
    const existinguser = await usermodel.findOne({email})
    if(existinguser){
        return res.status(200).send({
            success: false,
            message : "Already Registered User Please Login "
        })
    }

    //register User
    const hashedPassword = await hashPassword(password);
    //save 
    const user = await new usermodel({name , email ,  password :hashedPassword,phone, address , answer}).save()
    

    res.status(201).send({
        success : true,
        message : "User Registered Successfully",
        user
    })
     


  } catch (error) {

    console.log(error);
    return res.status(500).json({
      message: error + "Error in registeration",

    });
  }
}


export async function loginController(req , res) {
   
  
    try {
        const {email , password} = req.body

        if(!email || !password){
            return res.send({
                message : "Please Provide Email and Password"
            })
        }
        const existingUser = await usermodel.findOne({email});
        if(!existingUser){
            res.send({
                message: "User Does Not Exist"
            })
        }
        const match  = await comparePassword(password, existingUser.password);

        if(!match){
            return res.status(200).send({
                message : "Invalid Passsword"
            })
        }
        const token = await JWT.sign({_id : existingUser._id} , process.env.JWT_SECRET ,{
            expiresIn: '7d'
        });
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
              _id: existingUser._id,
              name: existingUser.name,
              email: existingUser.email,
              phone: existingUser.phone,
              adddress: existingUser.address,
              role :existingUser.role
            },
            token,
          });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false ,
            message : "Error in Login",
            error
        })
    }
    
}

export async function testController(req,res) {

   res.send("Protected Route")
}

export const forgotPasswordController=async(req,res)=>{
try {
    const {email, answer , newPassword} = req.body

    if (!email) {
        res.status(400).send({ message: "Emai is required" });
      }
      if (!answer) {
        res.status(400).send({ message: "answer is required" });
      }
      if (!newPassword) {
        res.status(400).send({ message: "New Password is required" });
      }

      //check
      const user = await usermodel.findOne({ email, answer });
      //validation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email Or Answer",
        });
      }
      const hashed = await hashPassword(newPassword);
      await usermodel.findByIdAndUpdate(user._id, { password: hashed });
      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      }); 
} catch (error) {
    console.log(error)
    res.status(500).send({
        success : false,
        message:"Something went wrong in forgotPasswordController"
        ,error
    })
}
};