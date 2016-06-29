var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(){

	var CategorySchema = new Schema({
		name: {
			type: String,
			required: true
		},
		offers: [{
			type: Schema.Types.ObjectId,
			ref: 'Offer'
		}],
		updated_at: {
			type: Date,
			default: Date.now
		},
		created_at: {
			type: Date,
			default: Date.now
		}
	});

	CategorySchema.pre('update', function() {
	  this.update({},{ $set: { updated_at: new Date() } });
	});

	return mongoose.model('Category', CategorySchema);

};
