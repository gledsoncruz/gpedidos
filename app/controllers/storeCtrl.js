var sanitize = require('mongo-sanitize');
module.exports = function(app){

	var Store = app.models.store;
	//var loginCtrl = app.controllers.loginCtrl;
	var controller = {};

	controller.findAll = function(req, res){
		Store.find(function(err, stores) {
		    if (err) {
		      return res.send(err);
		    }

		    res.json(stores);
		});
	}

	controller.findById = function(req, res){
		var id = sanitize(req.params.id);
		Store.findOne({'_id' :id}, function(err, store){
			if (err){
				return res.status(401).json({message: 'Store not found'})
			}
			return res.json(store);
		});
	}

	controller.update = function(req, res){
		var id = sanitize(req.params.id);
		var updates = req.body;
		Store.update({"_id" :id}, req.body,
			function(err){
				if (err){
					return res.json({ success: false, message: 'Error updated.'});
				}
				return res.status(202).json({success: true, message: 'Store has been updated'})
			});
	}

	controller.save = function(req, res){
		var dados = {
			"owner" : req.decoded.id,
		    "name" : sanitize(req.body.name),
		    "description" : sanitize(req.body.description),
		    "address" : sanitize(req.body.address),
		    "city" : sanitize(req.body.city),
		    "state" : sanitize(req.body.state),
		    "zipcode" : sanitize(req.body.zipcode),
		    "active" : sanitize(req.body.active)
		};

		Store.create(dados, function(err, store){


			if (err){
				return res.send({ success:false, message: 'Error'});
			}

			return res.json({
				success: true,
				message: 'Store created !'
				//token: token
			})
		});
	}

	controller.delete = function(req, res){
		var id = sanitize(req.params.id);
		Store.remove({'_id' :id}, function(err, store){
			if (err){
				res.status(401).json({message: 'Error delete store'})
			}
			res.json({message: 'Store has been deleted'})
		})
	}


	return controller;

}