const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const verify = require('../middleware/athentication');
const authorization = require('../middleware/authorization');

//User
router.get('/',  UserController.getAllUsers);
router.get('/:id', verify, authorization, UserController.getUserById);
router.put('/:id', verify, authorization, UserController.update);
router.delete('/:id', verify, authorization, UserController.delete);

//Auth
router.post('/register', UserController.register);
router.post('/login', UserController.login);

//module.exports = userRoutes;
module.exports = router;