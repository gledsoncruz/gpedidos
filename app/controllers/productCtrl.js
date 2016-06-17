var sanitize = require('mongo-sanitize');
module.exports = function(app){

	var Product = app.models.product;
	//var loginCtrl = app.controllers.loginCtrl;
	var controller = {};

	controller.findAll = function(req, res){
		Product.find(function(err, products) {
		    if (err) {
		      return res.send(err);
		    }

		    res.json(products);
		});
	}

	controller.findById = function(req, res){
		var id = sanitize(req.params.id);
		Product.findOne({'_id' :id}, function(err, product){
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