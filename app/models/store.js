var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(){

	var StoreSchema = new Schema({
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		offers: [{
			type: Schema.Types.ObjectId,
			ref: 'Offer'
		}],
		name: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		address: {
			type: String,
			required: true
		},
		city: {
			type: String,
			required: true
		},
		state: {
			type: String,
			required: true
		},
		zipcode: {
			type: String,
			required: true
		},
		active: {
			type: Boolean,
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

	StoreSchema.pre('update', function() {
	  this.update({},{ $set: { updated_at: new Date() } });
	});

	StoreSchema.methods.message = function(msg) {

	    return console.error(msg);
	};


	return mongoose.model('Store', StoreSchema);

};
