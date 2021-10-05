const router = require('express').Router();
const {
  getUsers, createUser, updateProfile, updateAvatar, getUser,
} = require('../controllers/user');

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', createUser);

router.patch('/me', updateProfile);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
