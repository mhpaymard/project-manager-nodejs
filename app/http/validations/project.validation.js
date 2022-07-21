const { body } = require("express-validator");

function createProjectValidator(){
    return [
        body('title').notEmpty().withMessage('عنوان پروژه نمی تواند خالی باشد'),
        body('text').notEmpty().withMessage('توضیحات پروژه نمی تواند خالی باشد'),
        body('tags').isArray({min:0,max:10}).withMessage('حداکثر استفاده از هشنگ ها 10 عدد می باشد')
    ]
}

module.exports = {
    createProjectValidator
}