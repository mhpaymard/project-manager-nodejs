const mongoose = require('mongoose');

const inviteRequestSchema = new mongoose.Schema({
    teamID : {type:mongoose.Types.ObjectId,required:true},
    caller:{type:String,required:true,trim:true,lowercase:true},
    requestDate:{type:Date,default:Date.now()},
    status:{type:String,default:'pending'} //pending,rejected,accepted
})

const userSchema = new mongoose.Schema({
    first_name:{type:String,trim:true},
    last_name:{type:String,trim:true},
    username:{type:String,required:true,unique:true,trim:true,lowercase:true},
    mobile:{type:String,required:true,unique:true,trim:true},
    roles:{type:[String],default:['USER']},
    email:{type:String,required:true,unique:true,trim:true,lowercase:true},
    password:{type:String,required:true},
    skill:{type:[String],default:[]},
    teams:{type:[mongoose.Types.ObjectId],default:[]},
    token:{type:String,default:''},
    profile_image:{type:String,default:'/defaults/default.png'},
    inviteRequests:{type:[inviteRequestSchema],default:[]},
},{
    timestamps:true
})

const UserModel = mongoose.model('user',userSchema);
module.exports = {
    UserModel
}