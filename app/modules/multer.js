const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { createPathDirectory, generateRandomUID } = require('./functions');

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,createPathDirectory())
    },
    filename:(req,file,callback)=>{
        const type = path.extname(file.originalname)
        console.log(file);
        callback(null,Date.now()+generateRandomUID()+type)
    }
})

const upload_multer_profile = multer({
    storage,
    limits: { fileSize: 1024*1024*10 , files:1},
    fileFilter: function (req, file, cb) {
        const mimeTypes = ['image/png','image/jpg','image/jpeg']
        if(!mimeTypes.includes(file.mimetype)) return cb({status:400,message:'فرمت عکس مجاز نیست'})
        cb(null, true);
   }
})

module.exports = {
    upload_multer_profile
}