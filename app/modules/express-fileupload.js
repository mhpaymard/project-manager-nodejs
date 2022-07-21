const path = require('path');
const { createPathDirectory, generateRandomUID } = require('./functions');
const uploadFile = async (req,res,next)=>{
    try{
        if(!req.files || Object.keys(req?.files)?.length===0) throw {status:400,message:'تصویر شاخص پروژه را ارسال نمایید'};
        const image = req?.files?.image;
        if(!image) throw {status:400,message:"تصویر شاخص پروژه را با نام image ارسال نمایید"}
        const imagePath = path.join(createPathDirectory(),`${Date.now()}${generateRandomUID()}${path.extname(image.name)}`)
        req.body.image = imagePath.replace(/\\/g,'/');
        const uploadPath = path.join(__dirname,'..','..',imagePath);
        image.mv(uploadPath,(err)=>{
            if(err) return next({status:500,message:'بارگزاری تصویر پروژه انجام نشد'});
            return next();
        })
    }catch(err){
        next(err);
    }
}

module.exports = {
    uploadFile
}