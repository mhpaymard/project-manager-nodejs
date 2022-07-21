const { UserController } = require('../http/controllers/user.controller');
const { multerErrorMapper } = require('../http/middlewares/checkErrors');
const { upload_multer_profile } = require('../modules/multer');

const router = require('express').Router();

router.get('/profile',UserController.getProfile);
router.post('/profile',UserController.editProfile);
router.post('/profile-image',upload_multer_profile.single('image'),multerErrorMapper,UserController.uploadProfileImage)
module.exports = {
    userRoutes: router
}