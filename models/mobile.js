const mongoose = require('mongoose');

const MobileSchema = new mongoose.Schema({
	brand: String,
    name: String,
	color: String,
	display_size: String,
	weight: String,
	feature: String,
});

module.exports = mongoose.model('Mobile', MobileSchema);