const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    first_name:{type:String,trim:true},
    last_name:{type:String,trim:true},
    username:{type:String,required:true,unique:true,trim:true},
    mobile:{type:String,required:true,unique:true,trim:true},
    roles:{type:[String],default:['USER']},
    email:{type:String,required:true,unique:true,trim:true},
    password:{type:String,required:true},
    skill:{type:[String],default:[]},
    teams:{type:[mongoose.Types.ObjectId],default:[]},
    token:{type:String,default:''},
    profile_image:{type:String,default:'/defaults/default.png'}
},{
    timestamps:true
})
const UserModel = mongoose.model('user',userSchema);
module.exports = {
    UserModel
}