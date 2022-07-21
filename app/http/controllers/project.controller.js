const { ProjectModel } = require("../../models/project.model");

class ProjectController{
    async createProject(req,res,next){
        try{
            const {title,text,image,tags} = req.body;
            const result = await ProjectModel.create({title,text,owner:req.user._id,image,tags});
            if(!result) throw {status:400,message:'افزودن پروژه با مشکل مواجه شد'};
            return res.status(201).json({
                status:201,
                success:true,
                message:'پروژه با موفقیت ایجاد شد'
            })
        }catch(err){
            next(err);
        }
    }
    async getAllProjects(req,res,next){
        try{
            const owner = req.user._id;
            const projects = await ProjectModel.find({owner});
            return res.status(200).json({
                status:200,
                success:true,
                projects
            })
        }catch(err){
            next(err);
        }
    }
    getProjectById(){

    }
    getAllProjectsByTeam(){

    }
    getProjectByUser(){

    }
    updateProjectById(){

    }
    removeProjectById(){

    }
}

module.exports = {
    ProjectController : new ProjectController()
}