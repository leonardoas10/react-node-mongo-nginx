const express = require('express');

const fakeDataController = require('../controllers/fake-data');

const router = express.Router();

router.get('/', fakeDataController.get);
router.post('/login', fakeDataController.login);
router.post('/user', fakeDataController.user);
router.post('/edit-user', fakeDataController.editUser);

module.exports = router;
