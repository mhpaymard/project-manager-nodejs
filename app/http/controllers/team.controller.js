const { TeamModel } = require("../../models/team.model");
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
            const teams = await TeamModel.find({$or:[
                {owner:userID},
                {user:userID}
            ]});
            return res.status(200).json({
                status:200,
                success:true,
                teams
            })
        }catch(error){
            next(error);
        }
    }
    inviteUserToTeam(){

    }
    removeTeamById(){

    }
    updateTeamById(){

    }
    removeUserFromTeam(){
        
    }
}

module.exports = {
    TeamController:new TeamController()
}