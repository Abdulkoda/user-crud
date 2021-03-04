const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();
     
router
    .route('/')
    .get(userController.getUsers)
    .delete(userController.deleteUser)
    .post(userController.createUser)
    .put(userController.updateUser)

    
module.exports = router;