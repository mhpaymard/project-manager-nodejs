const { ProjectController } = require('../http/controllers/project.controller');
const { expressValidatorMapper } = require('../http/middlewares/checkErrors');
const { createProjectValidator } = require('../http/validations/project.validation');
const { uploadFile } = require('../modules/express-fileupload');
const fileUpload = require('express-fileupload');
const { mongoIdValidator } = require('../http/validations/public.validation');

const router = require('express').Router();

router.get('/list',ProjectController.getAllProjects)
router.post('/create',fileUpload(),uploadFile,createProjectValidator(),expressValidatorMapper,ProjectController.createProject)
router.post('/:id',mongoIdValidator(),expressValidatorMapper,ProjectController.getProjectById);
router.post('/remove/:id',mongoIdValidator(),expressValidatorMapper,ProjectController.removeProjectById);
router.post('/edit/:id',mongoIdValidator(),expressValidatorMapper,ProjectController.updateProjectById);

module.exports = {
    projectRoutes: router
}