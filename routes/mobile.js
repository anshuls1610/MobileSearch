const express = require('express');
const router  = express.Router();
const Mobile    = require('../models/mobile');

router.get('/', (req, res) =>{
	var noMatch = null;
	if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    	Mobile.find({$or: 
					 [{name: regex}, {brand: regex}, {color: regex}, {display_size: regex}, {weight: regex}, {feature: regex}
						]}, (err, allMobiles) => {
			if(err){
				console.log(err);
			} else{
				if(allMobiles == 0){
					 noMatch = "No search found, please try again.";
				}
				res.render('mobiles/index', {mobiles: allMobiles, noMatch: noMatch});
			}
		});
	} else {
		Mobile.find({}, (err, allMobiles) => {
			if(err){
				console.log(err);
			} else{
				res.render('mobiles/index', {mobiles: allMobiles, noMatch: noMatch});
			}
		});
	}
});

router.post('/', (req, res) => {
	const brand = req.body.brand;
    const name = req.body.name;
	const color = req.body.color;
	const display_size = req.body.display_size;
	const weight = req.body.weight;
    const feature = req.body.feature;
	
    const newMobile = {brand: brand,name: name, color: color, display_size: display_size, weight: weight, feature: feature}
    // Create a new user and save to DB
    Mobile.create(newMobile, (err, newlyCreated) => {
        if(err){
            console.log(err);
        } else {
            //redirect back to home page
            console.log(newlyCreated);
            res.redirect('/');
        }
    });
});

const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;