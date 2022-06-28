const express = require('express');
const router = express.Router();

const { userRegister,
    userLogin,
    userLogout,
    getUserProfile,
    updatePassword, 
    updateProfile,
    allUsers,
    getUserDetails,
    adminUpdateProfile,
    adminDeleteUser} = require('../controllers/userController');
const { isAuthenticateUser, authorizeRoles } = require('../middlewares/auth');

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/current-user', isAuthenticateUser, getUserProfile);
router.put('/current-user/update', isAuthenticateUser, updateProfile);
router.get('/logout', userLogout);
router.put('/password/update', isAuthenticateUser, updatePassword);
router.get('/admin/users', isAuthenticateUser, authorizeRoles('admin'), allUsers);
router.route('/admin/user/:id')
        .get(isAuthenticateUser, authorizeRoles('admin'), getUserDetails)
        .put(isAuthenticateUser, authorizeRoles('admin'), adminUpdateProfile)
        .delete(isAuthenticateUser, authorizeRoles('admin'), adminDeleteUser)

module.exports = router;