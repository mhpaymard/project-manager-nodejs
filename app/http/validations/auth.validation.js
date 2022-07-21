const {body} = require('express-validator');
const { UserModel } = require('../../models/user.model');
function registerValidator(){
    return [
        body('username').custom(async (value,ctx)=>{
            if(value){
                const usernameRegex = /^[a-z]+[a-z0-9\_\.]{3,15}$/ig;
                if(usernameRegex.test(value)){
                    const newUser = await UserModel.find({username:value})
                    if(newUser?.length>0) throw 'این نام کاربری قبلا ثبت شده است'
                    return true;
                }
                throw 'شیوه نگارش نام کاربری صحیح نمی باشد'
            }
            throw 'نام کاربری نمی تواند خالی باشد'
        }),
        body('email').isEmail().withMessage('ایمیل وارد شده صحیح نمی باشد').custom(async (value,ctx)=>{
            const newUser = await UserModel.find({email:value})
            if(newUser?.length>0) throw 'این ایمیل قبلا ثبت شده است';
            return true;
        }),
        body('mobile').isMobilePhone('fa-IR').withMessage('شماره موبایل وارد شده صحیح نمی باشد').custom(async (value,ctx)=>{
            const newUser = await UserModel.find({mobile:value});
            if(newUser?.length>0) throw 'این شماره همراه قبلا ثبت شده است';
            return true;
        }),
        body('password').isLength({min:6,max:16}).withMessage('کلمه عبور باید حداقل 6 و حداکثر 16 حرف باشد').custom((value,ctx)=>{
            if(!value) throw 'رمز عبور نمی تواند خالی باشد';
            if(value !== ctx?.req?.body?.confirm_password) throw 'کلمه عبور با تکرار آن یکسان نمی باشد'
            return true;
        })
    ]
}
function loginValidator(){
    return [
        body('username').notEmpty().withMessage('نام کاربری نمی تواند خالی باشد').custom((value,ctx)=>{
            const usernameRegex = /^[a-z]+[a-z0-9\_\.]{3,15}$/ig;
            if(usernameRegex.test(value)){
                return true;
            }
            throw 'نام کاربری صحیح نمی باشد'
        }),
        body('password').isLength({min:6,max:16}).withMessage('کلمه عبور حداقل باید 6 و حداکثر 16 کاراکتر باشد')
    ]
}
module.exports = {
    registerValidator,
    loginValidator
}