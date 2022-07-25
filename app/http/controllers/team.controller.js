const { TeamModel } = require("../../models/team.model");
const { UserModel } = require("../../models/user.model");
class TeamController{
    async createTeam(req,res,next){
        try{
            const {name,description,username} = req.body;
            const owner = req.user._id;
            const newTeam = await TeamModel.create({
                name,
                description,
                username,
                owner
            });
            if(!newTeam) throw {status:400,message:'ایجاد تیم با خطا مواجه شد'};
            return res.status(201).json({
                status:201,
                success:true,
                message:'تیم با موفقیت ایجاد شد'
            });
        }catch(error){
            console.log()
        }
    }
    async getListOfTeams(req,res,next){
        try{
            const teams = await TeamModel.find({});
            return res.status(200).json({
                status:200,
                success:true,
                teams
            })
        }catch(error){
            next(error);
        }
    }
    async getTeamById(req,res,next){
        try{
            const teamID = req.params.id;
            const team = await TeamModel.findOne({_id:teamID});
            if(!team) throw {status:404,message:'تیم موردنظر یافت نشد'};
            return res.status(200).json({
                status:200,
                success:true,
                team
            });
        }catch(error){
            next(error);
        }
    }
    async getMyTeams(req,res,next){
        try{
            const userID = req.user._id;
            // const teams = await TeamModel.find({$or:[
            //     {owner:userID},
            //     {users:userID}
            // ]});
            const teams = await TeamModel.aggregate([
                {
                    $match:{
                        $or:[
                            {owner:userID},
                            {users:userID}
                        ]
                    },
                },{
                    $lookup:{
                        from:'users',
                        localField:'owner',
                        foreignField:'_id',
                        as:'owner'
                    }
                },
                {
                    $project:{
                        "owner.roles":0,
                        "owner.password":0,
                        "owner.token":0,
                        "owner.teams":0,
                        "owner.skill":0,
                        "owner.inviteRequests":0,
                        "owner.__v":0,
                        "owner.inviteRequests":0,

                    }
                },{
                    $unwind : "$owner"
                }
            ])
            return res.status(200).json({
                status:200,
                success:true,
                teams
            })
        }catch(error){
            next(error);
        }
    }
    async removeTeamById(req,res,next){
        try{
            const teamID = req.params.id;
            const owner = req.user._id;
            const team = await TeamModel.findOne({_id:teamID});
            if(!team) throw {status:404,message:'تیمی یافت نشد'};
            if(team.owner.toString()!=owner.toString()) throw {status:400,message:"فقط سازنده تیم مجاز به حذف تیم است"};
            const deleteResult = await TeamModel.deleteOne({owner,_id:teamID});
            if(deleteResult.deletedCount===0) throw {status:400,message:'حذف تیم با خطا مواجه شد'};
            return res.status(200).json({
                status:200,
                success:true,
                message:'تیم با موفقیت حذف شد'
            });
        }catch(error){
            next(error);
        }
    }
    async inviteUserToTeam(req,res,next){
        try{
            const userID = req.user._id;
            const {username,teamID} = req.params;
            
            const team = await TeamModel.findOne(
                { 
                    $or:[
                        {owner:userID},
                        {users:userID}
                    ],
                    _id:teamID
                },
            )
            if(!team) throw {status:400,message:'تیمی جهت دعوت کردن افراد یافت نشد'};
            
            const user = await UserModel.findOne({username});
            if(!user) throw {status:400,message:'کاربر مورد نظر جهت دعوت به تیم یافت نشد'};

            const userIsInTeam = await TeamModel.findOne(
                { 
                    $or:[
                        {owner:user._id},
                        {users:user._id}
                    ],
                    _id:teamID
                },
            )
            if(userIsInTeam) throw {status:400,message:'کاربر مورد نظر اکنون در این تیم حاضر است'};

            const userInvitations = user?.inviteRequests || [];
            const existInvitation = userInvitations.findIndex(ui=>ui.teamID.toString()==teamID.toString() && ui.status=='pending');
            if(existInvitation!=-1) throw {status:400,message:'کاربر مورد نظر قبلا به این تیم دعوت شده است'}

            const request = {
                caller : req.user?.username || req.user?.email,
                teamID,
                requestDate:Date.now(),
                status:'pending'
            };


            const updateResult = await UserModel.updateOne({username},{$push:{
                inviteRequests:request
            }})

            if(updateResult.modifiedCount==0) throw {status:400,message:"دعوت کاربر به تیم با خطا مواجه شد"};
            
            return res.status(200).json({
                status:200,
                success:true,
                message:'دعوت کاربر به تیم با موفقیت انجام شد'
            })

        }catch(error){
            next(error);
        }
    }
    async updateTeamById(req,res,next){
        try{
            const {teamID} = req.params;
            const data = {...req.body};
            Object.entries(data).forEach(([key,value])=>{
                if([''," ",undefined,null,NaN].includes(value)) delete data[key];
                if(!value) delete data[key];
                if(!['name','description'].includes(key)) delete data[key];
            })
            const userID = req.user._id;
            const team = await TeamModel.findOne({$or:[
                {owner:userID},
                {users:userID}
            ],_id:teamID});
            if(!team) throw {status:400,message:"تیمی با این مشخصات یافت نشد"};
            const teamUpdateResult = await TeamModel.updateOne({$or:[
                {owner:userID},
                {users:userID}
            ],_id:teamID},{
                $set:data
            });
            if(teamUpdateResult.modifiedCount===0) throw {status:400,message:'بروزرسانی تیم با خطا مواجه شد'};
            return res.status(200).json({
                status:200,
                success:true,
                message:'بروزرسانی مشخصات تیم با موفقیت انجام شد'
            });
        }catch(error){
            next(error);
        }
    }
    removeUserFromTeam(){
        
    }
}

module.exports = {
    TeamController:new TeamController()
}