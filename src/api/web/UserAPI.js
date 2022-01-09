const express = require('express');
const router = express.Router();
const controller = require('../../controller/UserController');
const auth =require('../../middleware/auth/auth');
const auth1 =require('../../middleware/auth/auth1');

module.exports = function () {
    router.get('/:id', controller.getSpecificUser);
    router.post('/login',controller.login);
    router.get('/all',controller.getUserAll);
    return router;
}