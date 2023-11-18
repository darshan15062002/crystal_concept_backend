const express = require('express');
const { getSummary, getSummaryGoogle } = require('../controllers/summarizerController');


const router = express.Router();

// router.post('/summarize', getSummary)
router.post('/summarize', getSummaryGoogle)



module.exports = router