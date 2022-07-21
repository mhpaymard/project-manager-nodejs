const { TeamController } = require('../http/controllers/team.controller');

const router = require('express').Router();

router.post('/create',TeamController.createTeam)

module.exports = {
    teamRoutes: router
}