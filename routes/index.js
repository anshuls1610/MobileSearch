const express = require('express');
const router  = express.Router();
const Mobile    = require('../models/mobile');

//root route
router.get('/', (req, res) =>{
    res.render('landing');
});

router.get('/form', (req, res) => {
   res.render('form'); 
});

module.exports = router;