const {param} = require('express-validator');

function mongoIdValidator(){
    return [
        param('id').isMongoId().withMessage('شناسه ی ارسال شده صحیح نمی باشد')
    ]
}

module.exports = {
    mongoIdValidator
}