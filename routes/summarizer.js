const express = require('express');
const { getSummary } = require('../controllers/summarizerController');


const router = express.Router();

router.post('/summarize', getSummary)



module.exports = router