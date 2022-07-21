const { authRoutes } = require('./auth.route');
const { teamRoutes } = require('./team.route');
const { projectRoutes } = require('./project.route');
const { userRoutes } = require('./user.route');
const { checkLogin } = require('../http/middlewares/autoLogin');

const router = require('express').Router();

router.use('/auth',authRoutes);
router.use('/team',checkLogin,teamRoutes)
router.use('/project',checkLogin,projectRoutes)
router.use('/user',checkLogin,userRoutes)

module.exports = {
    AllRoutes : router
}