const { ProjectController } = require('../http/controllers/project.controller');
const { TeamController } = require('../http/controllers/team.controller');
const { expressValidatorMapper } = require('../http/middlewares/checkErrors');
const { mongoIdValidator } = require('../http/validations/public.validation');
const { createTeamValidation } = require('../http/validations/team.validation');

const router = require('express').Router();

router.get('/list',TeamController.getListOfTeams);
router.get('/me',TeamController.getMyTeams);
router.get('/invite/:teamID/:username',TeamController.inviteUserToTeam);
router.get('/:id',mongoIdValidator(),expressValidatorMapper,TeamController.getTeamById);
router.post('/create',createTeamValidation(),expressValidatorMapper,TeamController.createTeam);
router.delete('/remove/:id',mongoIdValidator(),expressValidatorMapper,TeamController.removeTeamById);
router.put('/update/:teamID',TeamController.updateTeamById);
module.exports = {
    teamRoutes: router
}