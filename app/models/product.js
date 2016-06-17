var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(){

	var ProductSchema = new Schema({
		name: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		updated_at: {
			type: Date,
			default: Date.now
		},
		created_at: {
			type: Date,
			default: Date.now
		}
	});

	ProductSchema.pre('update', function() {
	  this.update({},{ $set: { updated_at: new Date() } });
	});


	return mongoose.model('Product', ProductSchema);

};

