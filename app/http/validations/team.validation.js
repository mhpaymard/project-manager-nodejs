const {body,param} = require('express-validator');
const { TeamModel } = require('../../models/team.model');
const { UserModel } = require('../../models/user.model');
function createTeamValidation(){
    return [
        body('name').notEmpty().withMessage('نام تیم الزامی باشد'),
        body('description').notEmpty().withMessage('توضیحات تیم الزامی می باشد'),
        body('username').custom(async (username)=>{
            if(username?.match(/^[a-z]+[a-z0-9\_\-\.]{3,}$/)){
                const isExistTeam = await TeamModel.findOne({username});
                if(isExistTeam) throw 'نام کاربری قبلا توسط تیم دیگری استفاده شده است';
                return true;
            }else throw 'نام کاربری را به طور صحیح وارد کنید';
        })
    ]
}
// function inviteToTeamValidator(){
//     return [
//         param('teamID').custom(async (teamID,{req})=>{
//             const userID = req.user._id;
//             const team = await TeamModel.findOne(
//                 { 
//                     $or:[
//                         {owner:userID},
//                         {users:userID}
//                     ],
//                     _id:teamID
//                 },
//             )
//             if(!team) throw 'تیمی جهت دعوت کردن افراد یافت نشد'
//             return true;
//         }),
//         param('username').custom(async (username)=>{
//             const user = await UserModel.findOne({username});
//             if(!user) throw 'کاربر مورد نظر جهت دعوت به تیم یافت نشد';
//             return true;
//         })
//     ]
// }
module.exports = {
    createTeamValidation
}