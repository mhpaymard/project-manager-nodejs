const { ProjectModel } = require("../../models/project.model");
const autoBind = require('auto-bind');

class ProjectController{
    constructor(){
        autoBind(this)
    }
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
    findProject(owner,projectID){
        return new Promise(async (resolve,reject)=>{
            try{
                const project = await ProjectModel.findOne({owner,_id:projectID});
                if(!project) throw {status:404,message:"پروژه ای یافت نشد"};
                return resolve(project);
            }catch(error){
                return reject(error);
            }
        })
    }
    async getProjectById(req,res,next){
        try{
            const owner = req.user._id;
            const projectID = req.params.id;
            const project = await this.findProject(owner,projectID);
            return res.status(200).json({
                status:200,
                success:true,
                project
            })
        }catch(error){
            next(error);
        }
    }
    async removeProjectById(req,res,next){
        try{
            const owner = req.user._id;
            const projectID = req.params.id;
            await this.findProject(owner,projectID);
            const deleteProjectResult = await ProjectModel.deleteOne({_id:projectID});
            if(deleteProjectResult.deletedCount==0) throw {status:400,message:'حذف پروژه با خطا مواجه بود'};
            return res.status(200).json({
                status:200,
                success:true,
                message:'پروژه با موفقیت حذف شد'    
            })
        }catch(error){
            next(error);
        }
    }
    getAllProjectsByTeam(){

    }
    getProjectByUser(){

    }
    updateProjectById(){

    }
    
}

module.exports = {
    ProjectController : new ProjectController()
}