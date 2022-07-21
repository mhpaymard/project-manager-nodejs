const mongoose = require('mongoose');
const teamSchema = new mongoose.Schema({
    name:{type:String,requried:true},
    description:{type:String},
    users:{type:[mongoose.Types.ObjectId],default:[]},
    owner:{type:mongoose.Types.ObjectId,required:true}
},{
    timestamps:true
})
const TeamModel = mongoose.model('team',teamSchema);
module.exports = {
    TeamModel
}