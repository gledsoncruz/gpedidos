var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var Store = require('./store');
//var Product = require('./product');


module.exports = function(){

	var OfferSchema = new Schema({
		store: {
			type: Schema.Types.ObjectId,
			ref: 'Store'
		},
		product: {
			type: Schema.Types.ObjectId,
			ref: 'Product'
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category'
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

	OfferSchema.index({ store: 1, product: 1}, { unique: true });

	OfferSchema.pre('findOneAndUpdate', function() {
		this.update({},{ $set: { updated_at: new Date() } });
	});

	OfferSchema.post('save', function(){

		var storeModel = mongoose.model('Store');
		var productModel = mongoose.model('Product');
		var categoryModel = mongoose.model('Category');
		categoryModel.update({_id: this.category },{ $push: { offers: this } }, function(category){});
		storeModel.update({_id: this.store },{ $push: { offers: this } }, function(store){});
		productModel.update({_id: this.product },{ $push: { offers: this } }, function(product){});

	});

	OfferSchema.post('remove', function(){
		var storeModel = mongoose.model('Store');
		var productModel = mongoose.model('Product');
		var categoryModel = mongoose.model('Category');
		categoryModel.update({_id: this.category },{ $pull: { offers: this.id } }, function(category){});
		storeModel.update({_id: this.store },{ $pull: { offers: this.id } }, function(store){});
		productModel.update({_id: this.product },{ $pull: { offers: this.id } }, function(product){});

	});



	return mongoose.model('Offer', OfferSchema);

};