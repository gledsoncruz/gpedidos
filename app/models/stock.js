var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(){

	var StockSchema = new Schema({
		store: {
			type: Schema.Types.ObjectId,
			ref: 'Store'
		},
		product: {
			type: Schema.Types.ObjectId,
			ref: 'Product'
		},
		price: {
			type: Number,
			required: true
		},
		available: {
			type: Boolean,
			required: true
		},
		updated_at: {
			type: Date,
			default: Date.now
		}
	});

	StockSchema.pre('update', function() {
	  this.update({},{ $set: { updated_at: new Date() } });
	});


	return mongoose.model('Stock', StockSchema);

};