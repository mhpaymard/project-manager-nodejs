const { TeamModel } = require("../../models/team.model");

class TeamController{
    async createTeam(req,res,next){
        try{
            const {name,description,id_team} = req.body;
            const owner = req.user._id;
            const newTeam = await TeamModel.create({name,description,id_team});
            if(!newTeam) throw {status:400,message:'ایجاد تیم با خطا مواجه شد'};


        }catch(error){
            console.log()
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