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
				return res.status(401).json({message: 'Produto não encontrado.'})
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
					return res.json({ success: false, message: 'Erro ao alterar produto.'});
				}
				return res.status(202).json({success: true, message: 'Produto alterado com sucesso.'})
			});
	}

	controller.save = function(req, res){
		var dados = {
		    "name" : sanitize(req.body.name),
		    "description" : sanitize(req.body.description)
		};

		Product.create(dados, function(err, product){


			if (err){
				return res.send({ success:false, message: 'Erro ao criar produto.'});
			}

			return res.json({
				success: true,
				message: 'Produto criado com sucesso.'
			})
		});
	}

	controller.delete = function(req, res){
		var id = sanitize(req.params.id);
		Product.remove({'_id' :id}, function(err, product){
			if (err){
				res.status(401).json({message: 'Erro ao deletar produto.'})
			}
			res.json({message: 'Produto deletado com sucesso.'})
		})
	}


	return controller;

}