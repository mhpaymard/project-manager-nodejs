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
    async getAllRequests(req,res,next){
        try{
            const userID = req.user._id;
            const requests = await UserModel.findOne({_id:userID},{inviteRequests:1});
            return res.status(200).json({
                status:200,
                success:true,
                requests:requests?.inviteRequests || []
            });
        }catch(error){
            next(error);
        }
    }
    async getRequestsByStatus(req,res,next){
        try{
            const {status} = req.params;
            const userID = req.user._id;
            const requests = await UserModel.aggregate([
                {
                    $match:{_id:userID}
                },
                {
                    $project:{
                        inviteRequests:1,
                        _id:0,
                        inviteRequests:{
                            $filter:{
                                input: "$inviteRequests",
                                as:'request',
                                cond:{
                                    $eq:["$$request.status",status]
                                }
                            }
                        }
                    }
                }
            ])
            return res.status(200).json({
                status:200,
                success:true,
                requests:requests?.[0]?.inviteRequests || []
            })
        }catch(error){
            next(error);
        }
    }
    async changeStatusRequest(req,res,next){
        try{
            const {id,status} = req.params;
            const owner = req.user._id;
            const request = await UserModel.findOne({_id:owner,"inviteRequests._id":id});
            if(!request) throw {status:404,message:'درخواستی با این مشخصات یافت نشد'};
            const findRequest = request.inviteRequests.find(item=>item.id == id);
            if(findRequest.status!=='pending') throw {status:400,message:"این درخواست قبلا پذیرفته یا رد شده است"};
            if(!['accepted','rejected'].includes(status)) throw {status:400,message:'اطلاعات ارسال شده صحیح نمی باشد'};
            const updateResult = await UserModel.updateOne({_id:owner,"inviteRequests._id":id},{
                $set:{
                    "inviteRequests.$.status":status
                }
            })
            if(updateResult.modifiedCount==0) throw {status:400,message:'اپدیت وضعیت درخواست دعوت به تیم ، با خطا مواجه شد'};
            return res.status(200).json({
                status:200,
                message:"تغییر وضعیت درخواست با موفقیت انجام شد",
                success:true
            });
        }catch(error){
            next(error);
        }
    }
    addSkills(){

    }
    editSkills(){

    }
    
    rejectInviteInTeam(){

    } 
}
module.exports = {
    UserController : new UserController()
}