const express = require('express');
const router = express.Router();
const controller = require('../controllers/video.controller');

router.post('/', controller.createVideo);
router.get('/', controller.getVideos);

module.exports = router;
