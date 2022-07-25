const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name:{type:String,requried:true,trim:true},
    description:{type:String,required:true,trim:true},
    users:{type:[mongoose.Types.ObjectId],default:[]},
    projects:{type:[mongoose.Types.ObjectId],default:[]},
    username:{type:String,unique:true,required:true,trim:true,lowercase:true},
    owner:{type:mongoose.Types.ObjectId,required:true},
},{
    timestamps:true
})

const TeamModel = mongoose.model('team',teamSchema);
module.exports = {
    TeamModel
}