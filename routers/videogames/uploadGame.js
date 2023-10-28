const express = require('express');
const controllerUploadGame = require('../../controllers/videogames/uploadGame');
const router =  express.Router();


router.post('/videogames',controllerUploadGame.upload,controllerUploadGame.uploadFile);


module.exports = router