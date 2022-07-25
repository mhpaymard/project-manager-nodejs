const { UserController } = require('../http/controllers/user.controller');
const { multerErrorMapper } = require('../http/middlewares/checkErrors');
const { upload_multer_profile } = require('../modules/multer');

const router = require('express').Router();

router.get('/profile',UserController.getProfile);
router.post('/profile',UserController.editProfile);
router.post('/profile-image',upload_multer_profile.single('image'),multerErrorMapper,UserController.uploadProfileImage)
router.get('/requests',UserController.getAllRequests);
router.get('/requests/:status',UserController.getRequestsByStatus);
router.get('/change-status-request/:id/:status',UserController.changeStatusRequest);

module.exports = {
    userRoutes: router
}