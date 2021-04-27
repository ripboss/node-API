const homeController = require('../controllers/libraryController');
const express = require('express');

const router = express.Router(); //Middleware
router.get('/about',homeController.getAbout);
router.get('/', homeController.getLibrary);

module.exports =  router ;