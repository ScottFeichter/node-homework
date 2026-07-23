const express = require('express');
const {register, logon, logoff} = require('../controllers/userController');



const userRouter = new express.Router;

userRouter.route('/register')
    .post(register);

userRouter.route('/logon')
    .post(logon);

userRouter.route('/logoff')
    .post(logoff);


module.exports = userRouter;


