const { UserModel } = require("../../models/user.model");

class UserController{
    async getProfile(req,res,next){
        try{
            const user = req.user;
            user.profile_image = `${req.protocol}://${req.get("host")}/${user.profile_image}`;
            return res.status(200).json({
                status:200,
                success:true,
                user
            })
        }catch(err){
            next(err);
        }
    }
    async editProfile(req,res,next){
        try{
            const data = req.body;
            const userID = req.user._id;

            const fields = ['first_name','last_name','skill'];
            const badValues = ['',' ',null,undefined,0,-1,NaN]
            
            Object.entries(data).forEach(([key,value])=>{
                if(!fields.includes(key)) delete data[key];
                if(badValues.includes(value)) delete data[key];
            })
            console.log(data)
            const result = await UserModel.updateOne({_id:userID},{$set:data});
            if(result.modifiedCount>0){
                return res.status(200).json({
                    status:200,
                    success:true,
                    message:'بروزرسانی پروفایل با موفقیت انجام شد'
                })
            }
            throw {status:400,success:false,message:'به روز رسانی انجام نشد'}
        }catch(err){
            next(err);
        }
    }
    async uploadProfileImage(req,res,next){
        try{
            const userId = req.user._id;
            if(Object.keys(req.file).length == 0) throw {status:400,message:'لطفا یک تصویر را انتخاب کنید'};
            const filePath = req.file?.path?.replace(/\\/g,'/')?.substring(7);
            const result = await UserModel.updateOne({_id:userId},{$set:{
                profile_image:filePath
            }})
            if(result.modifiedCount==0) throw {status:400,message:'بروزرسانی انجام نشد'}
            return res.status(200).json({
                status:200,
                success:true,
                message:"تصویر پروقایل با موفقیت آپلود شد"
            })
        }catch(err){
            next(err);
        }
    }
    addSkills(){

    }
    editSkills(){

    }
    acceptInviteInTeam(){

    }
    rejectInviteInTeam(){

    } 
}
module.exports = {
    UserController : new UserController()
}