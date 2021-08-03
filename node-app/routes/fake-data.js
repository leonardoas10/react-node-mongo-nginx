const express = require('express');

const fakeDataController = require('../controllers/fake-data');

const router = express.Router();

router.get('/fake-data', fakeDataController.get);

module.exports = router;
