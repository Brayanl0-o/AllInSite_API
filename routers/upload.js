const express = require('express');
const controllerUpload = require('../controllers/upload');
const router =  express.Router();


router.post('/',
controllerUpload.upload,
controllerUpload.uploadFile);


module.exports = router