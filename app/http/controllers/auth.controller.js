const { validationResult } = require("express-validator");
const { UserModel } = require("../../models/user.model");
const { expressValidatorMapper, hashString, tokenGenerator } = require("../../modules/functions");
const bcrypt = require('bcrypt');
class AuthController{
    async register(req,res,next){
        try{
            const {username,password,email,mobile} = req.body;
            const hashedPassword = hashString(password)
            const newUser = await UserModel.create({
                username,email,password:hashedPassword,mobile
            })
            return res.status(201).json({
                status:201,
                sucess:true,
                message:'کاربر جدید با موفقیت ایجاد شد'
            })
        }catch(err){
            next(err);
        }
    }
    async login(req,res,next){
        try{
            const {username,password}=req.body;
            const theUser = await UserModel.findOne({username})
            if(!theUser) throw {status:401,sucess:false,message:"نام کاربری یا رمز عبور اشتباه می باشد"};
            const compareResult = bcrypt.compareSync(password,theUser.password);
            if(!compareResult) throw {status:401,success:false,message:"نام کاربری یا رمز عبور اشتباه می باشد"}
            const token = tokenGenerator({username});
            theUser.token = token;
            await theUser.save();
            return res.status(200).json({
                status:200,
                success:true,
                message:'شما با موفقیت وارد شدید',
                token
            })
        }catch(err){
            next(err); 
        }
    }
    resetPassword(){

    }
}
module.exports = {
    AuthController : new AuthController()
}