const { TeamController } = require('../http/controllers/team.controller');
const { expressValidatorMapper } = require('../http/middlewares/checkErrors');
const { mongoIdValidator } = require('../http/validations/public.validation');
const { createTeamValidation } = require('../http/validations/team.validation');

const router = require('express').Router();

router.get('/list',TeamController.getListOfTeams);
router.get('/me',TeamController.getMyTeams);
router.get('/:id',mongoIdValidator(),expressValidatorMapper,TeamController.getTeamById);
router.post('/create',createTeamValidation(),expressValidatorMapper,TeamController.createTeam);

module.exports = {
    teamRoutes: router
}