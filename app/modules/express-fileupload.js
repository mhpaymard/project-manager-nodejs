const path = require('path');
const { createPathDirectory, generateRandomUID } = require('./functions');
const uploadFile = async (req,res,next)=>{
    try{
        if(!req.files || Object.keys(req?.files)?.length===0) throw {status:400,message:'تصویر شاخص پروژه را ارسال نمایید'};
        const image = req?.files?.image;
        if(!image) throw {status:400,message:"تصویر شاخص پروژه را با نام image ارسال نمایید"}
        const type = path.extname(image.name);

        if(image.size>(1024*1000)) throw {status:400,message:'حداکثر حجم مجاز برای اپلود تصویر شاخص ، 1 مگابایت می باشد'};
        if(!['.png','.jpeg','.jpg','.gif','.webp'].includes(type)) throw {status:400,message:`فرمت ${type} به عنوان تصویر شاخص مجاز نمی باشد`};
        const imagePath = path.join(createPathDirectory(),`${Date.now()}${generateRandomUID()}${type}`)
        req.body.image = imagePath.replace(/\\/g,'/').substring(6);
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