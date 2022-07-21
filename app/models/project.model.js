const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    title:{type:String,requried:true},
    text:{type:String},
    image:{type:String,default:'/defaults/default.png'},
    team:{type:mongoose.Types.ObjectId},
    owner:{type:mongoose.Types.ObjectId,required:true},
    private:{type:Boolean,default:true},
    tags:{type:[String],default:[]}
},{
    timestamps:true
})
const ProjectModel = mongoose.model('project',projectSchema);
module.exports = {
    ProjectModel
}