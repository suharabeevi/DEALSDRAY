const express = require("express");

const router = express.Router();

const {
    HandleSuperAdminSignup,
    handleSuperAminLogin
} = require('../controllers/adminController')

router.route('/signup').post(HandleSuperAdminSignup)

router.route('/login').post(handleSuperAminLogin)

module.exports= router

