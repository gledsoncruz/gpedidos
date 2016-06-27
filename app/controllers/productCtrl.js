var sanitize = require('mongo-sanitize');
module.exports = function(app){

	var Product = app.models.product;
	var Offer = app.models.offer;
	var controller = {};

	controller.findAll = function(req, res){
		Product.find().exec(function(err, products) {
		    if (err) {
		      return res.send(err);
		    }

		    res.json(products);
		});
	}

	controller.productsInOffers = function(req, res){
		Product.find({"offers" : {$exists: true}, $where : "this.offers.length > 0"})
			.populate({
				path: 'offers',
				model: 'Offer',
				populate: {
					path: 'store',
					model: 'Store',
					match: {active: true}
				},
				match: {
					'available': true,
					'store': {$ne: null}
				}
			}).exec(function(err, products){
				if (err) {
					return res.send(err);
				} else {
					var prods = [];
					products.forEach(function (prod) {
					    prod.offers.forEach(function(offer, index){
					    	if (offer.store == null){
					    		prod.offers.splice(index, 1);
					    	}
					    })
					    if (prod.offers.length > 0){
					    	prods.push(prod);
					    }

					});
					res.json(prods);
				}
			})
	}

	controller.findById = function(req, res){
		var id = sanitize(req.params.id);
		Product.findOne({'_id' :id}).populate('offers').exec(function(err, product){
			if (err){
				return res.status(401).json({message: 'Product not found'})
			}
			return res.json(product);
		});
	}

	controller.update = function(req, res){
		var id = sanitize(req.params.id);
		var updates = req.body;
		Product.update({"_id" :id}, req.body,
			function(err){
				if (err){
					return res.json({ success: false, message: 'Error updated.'});
				}
				return res.status(202).json({success: true, message: 'Product has been updated'})
			});
	}

	controller.save = function(req, res){
		var dados = {
		    "name" : sanitize(req.body.name),
		    "description" : sanitize(req.body.description)
		};

		Product.create(dados, function(err, product){


			if (err){
				return res.send({ success:false, message: 'Error'});
			}

			return res.json({
				success: true,
				message: 'Product created !'
				//token: token
			})
		});
	}

	controller.delete = function(req, res){
		var id = sanitize(req.params.id);
		Product.remove({'_id' :id}, function(err, product){
			if (err){
				res.status(401).json({message: 'Error delete product'})
			}
			res.json({message: 'Product has been deleted'})
		})
	}


	return controller;

}