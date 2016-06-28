var sanitize = require('mongo-sanitize');
module.exports = function(app){

	var Offer = app.models.offer;
	var Product = app.models.product;
	var Store = app.models.store;
	var controller = {};

	controller.findAll = function(req, res){
		Offer.find().populate('store product').exec(function(err, offers) {
		    if (err) {
		      return res.send(err);
		    }

		    res.json(offers);
		});
	}

	controller.findOffersActives = function(req, res){
		Offer.find({$and: [{'available': true}]}).populate('store product').exec(function(err, offers) {
		    if (err) {
		      return res.send(err);
		    }

		    res.json(offers);
		});
	}

	controller.offersPerProduct = function(req, res){
		var id = sanitize(req.params.id);
		Product.findOne({'_id' :id}).populate({
			path: 'offers',
			model: 'Offer',
			populate: {
				path: 'store',
				model: 'Store'
			},
			match: {
				'available': true,
				'store': {$ne: null}
			},
			options: {
	          sort: 'price'
	        }
		}).exec(function(err, product){
			if (err){
				return res.status(401).json({message: 'Product not found'})
			} else {
					product.offers.forEach(function (offer, index) {
					    if ((!offer.available) || (!offer.store.active)){
					    	product.offers.splice(index, 1);
					    }
					});

				res.json(product);
			}

		});

	}

	controller.findById = function(req, res){
		var id = sanitize(req.params.id);
		Offer.findOne({'_id' :id}, function(err, offer){
			if (err){
				return res.status(401).json({message: 'Offer not found'})
			}
			return res.json(offer);
		});
	}

	controller.update = function(req, res){
		var id = sanitize(req.params.id);
		var updates = req.body;
		Offer.findOneAndUpdate({"_id" :id}, req.body,
			function(err, offer){
				if (err){
					return res.json({ success: false, message: 'Error updated.'});
				}
				return res.status(202).json({success: true, message: 'Offer has been updated'})
			});
	}

	controller.save = function(req, res){
		var dados = {
			"store" : sanitize(req.body.store),
			"product" : sanitize(req.body.product),
		    "price" : sanitize(req.body.price),
		    "available" : sanitize(req.body.available)
		};

		Offer.create(dados, function(err, offer){

			if (err){
				if (err.code == 11000){
					return res.send({ success:false, message: "Offers already exist in your store"});
				}
				return res.send({ success:false, message: err});
			} else {

				return res.json({
					success: true,
					message: 'Offer created !'
				})
			}

		});
	}

	controller.delete = function(req, res){
		var id = sanitize(req.params.id);

		Offer.findOne({'_id' :id}, function(err, offer){
			if (err){
				res.status(401).json({message: 'Offer not found'})
			} else {
				offer.remove(function(err){
					if (err){
						res.status(401).json({message: 'Error delete offer'})
					}

					return res.json({
						success: true,
						message: 'Offer deleted !'
					})

				});

			}

		});
	}


	return controller;

}