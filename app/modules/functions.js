const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
function hashString(str){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str,salt);
}
function tokenGenerator(payload){
    const token = jwt.sign(payload,process.env.SECRET_KEY_JWT,{
        expiresIn:"7 days"
    })
    return token;
}
function verifyJwtToken(token){
    const result = jwt.verify(token,process.env.SECRET_KEY_JWT);
    if(!result?.username) throw {status:401,success:false,message:'لطفا وارد حساب کاربری خود شوید'};
    return result;
}
function createPathDirectory(){
    const date = new Date();
    const year = date.getFullYear()+"";
    const month = date.getMonth()+"";
    const day = date.getDate()+"";
    const uploadPath = path.join(__dirname,'..','..','public','upload',year,month,day);
    fs.mkdirSync(uploadPath,{recursive:true});
    return path.join('public','upload',year,month,day)
}
function generateRandomUID(){
    let string = '';
    let english = 'abcdefghijklmnABCDEFGHIJKLMN';
    while(string.length<5){
        const randomLetter = english?.[Math.floor(Math.random()*english.length)]
        if(randomLetter) string+=randomLetter;
    }
    return string;
}
module.exports = {
    hashString,
    tokenGenerator,
    verifyJwtToken,
    createPathDirectory,
    generateRandomUID
}