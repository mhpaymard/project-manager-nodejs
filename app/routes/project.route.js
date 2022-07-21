const { ProjectController } = require('../http/controllers/project.controller');
const { expressValidatorMapper } = require('../http/middlewares/checkErrors');
const { createProjectValidator } = require('../http/validations/project.validation');
const { uploadFile } = require('../modules/express-fileupload');
const fileUpload = require('express-fileupload');

const router = require('express').Router();

router.get('/',ProjectController.getAllProjects)
router.post('/create',fileUpload(),uploadFile,createProjectValidator(),expressValidatorMapper,ProjectController.createProject)

module.exports = {
    projectRoutes: router
}