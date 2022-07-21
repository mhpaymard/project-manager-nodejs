const {body} = require('express-validator');
const { TeamModel } = require('../../models/team.model');
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
module.exports = {
    createTeamValidation
}