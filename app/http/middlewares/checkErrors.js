const { validationResult } = require("express-validator");

function expressValidatorMapper(req,res,next){
    const messages = {}
    const result = validationResult(req)
    if(result?.errors?.length>0){
        result?.errors.forEach(err=>{
            messages[err.param] = err.msg;
        })
        return res.status(400).json({
            status:400,
            success:false,
            messages
        });
    }
    next();
}
function multerErrorMapper(error,req,res,next){
    let message = '';
    if(error?.code === 'LIMIT_FILE_SIZE') message = 'حجم عکس آپلود شده بیش از حد مجاز است'
    if(error?.code === 'LIMIT_PART_COUNT') message = 'تعداد عکس آپلود شده بیش از حد مجاز است'
    if(error?.code === 'LIMIT_FILE_COUNT') message = 'تعداد عکس آپلود شده بیش از حد مجاز است'
    if(message!=='') return next({status:400,message})
    else{
        console.log(error?.message);
        console.log(JSON.parse(JSON.stringify(error)));
        next(error)
    }
}
module.exports = {
    expressValidatorMapper,multerErrorMapper
}