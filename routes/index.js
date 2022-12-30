const express = require('express');

const router = express.Router();
const homeController = require('../controllers/controller');

console.log('router loaded');


router.get('/', homeController.home);
router.use('/user', require('./user'));
router.use('/posts', require('./posts'));

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


module.exports = router;