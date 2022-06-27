const express = require('express');
const router = express.Router();

const { userRegister,
    userLogin,
    userLogout,
    getUserProfile,
    updatePassword } = require('../controllers/userController');
const { isAuthenticateUser } = require('../middlewares/auth');

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/current-user', isAuthenticateUser, getUserProfile);
router.get('/logout', userLogout);
router.put('/password/update', isAuthenticateUser, updatePassword);

module.exports = router;