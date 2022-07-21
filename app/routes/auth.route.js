const { AuthController } = require('../http/controllers/auth.controller');
const { expressValidatorMapper } = require('../http/middlewares/checkErrors');
const { registerValidator, loginValidator } = require('../http/validations/auth.validation');

const router = require('express').Router();

router.post('/register',registerValidator(),expressValidatorMapper,AuthController.register);
router.post('/login',loginValidator(),expressValidatorMapper,AuthController.login);

module.exports = {
    authRoutes: router
}