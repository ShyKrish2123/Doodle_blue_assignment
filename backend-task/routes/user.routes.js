const express = require('express');

const UserController = require('../controllers/user.controller');

const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.post('/signup', UserController.signup);

router.post('/login', UserController.login);

// Protected routes
router.get(
    '/getAllusers',
    authMiddleware,
    UserController.getAllUsers
);

router.patch(
    '/update/:id',
    authMiddleware,
    UserController.updateUser
);

router.delete(
    '/softDelete/:id',
    authMiddleware,
    UserController.softDeleteUser
);

router.post(
    '/profile',
    authMiddleware,
    UserController.addUserProfile
);

module.exports = router;