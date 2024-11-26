import JWT from 'jsonwebtoken'
import usermodel from '../models/usermodel.js'




//protected User
export const requireSignIn = async(req, res ,next)=>{
    try {
        
        const decode = JWT.verify(req.headers.authorization , process.env.JWT_SECRET)
       req.user = decode;
        next()
    } catch (error) {
        console.log(error)
    }
}

//admin access
export const isAdmin = async(req,res , next)=>{
    try {
        const user = await usermodel.findById(req.user._id)
        if(user.role !==1){
            return res.status(401).send({
                message : "Unauthorized Access"
            })
        }else{
            next()
        }
    } catch (error) {
     console.log(error)   
    return res.send({
        success : false ,
        messgae : "Error in isAdmin Middleware",
        error 
     })
    }
}