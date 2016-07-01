var sanitize = require('mongo-sanitize');
module.exports = function(app){

	var Store = app.models.store;
	var User = app.models.user;
	//var loginCtrl = app.controllers.loginCtrl;
	var controller = {};

	controller.findAll = function(req, res){
		Store.find({}).populate('owner').exec(function(err, stores) {
		    if (err) {
		      return res.send(err);
		    }

		    res.json(stores);
		});
	}

	controller.offersPerStore = function(req, res){
		var id = sanitize(req.params.id);
		Store.findOne({'_id' :id}).select('-__v -created_at -updated_at').populate([{
			path: 'offers',
			model: 'Offer',
			select: '_id product price available',
			match: {
				'available': true,
				'store': {$ne: null}
			},
			options: {
	          sort: 'price'
	        },
	        populate: {
	        	path: 'product',
	        	model: 'Product',
	        	select: '_id name description offers'
	        }
		},
		{
			path: 'owner',
			model: 'User',
			select: '_id name email'
		}]).exec(function(err, store){
			if (err){
				return res.status(401).json({message: 'Loja não encontrada.'})
			} else {
					store.offers.forEach(function (offer, index) {
					    if (!offer.available){
					    	store.offers.splice(index, 1);
					    }
					});

				res.json(store);
			}

		});

	}

	controller.findById = function(req, res){
		var id = sanitize(req.params.id);
		Store.findOne({'_id' :id}).populate('offers').exec(function(err, store){
			if (err){
				return res.status(401).json({message: 'Loja não encontrada.'})
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
					return res.json({ success: false, message: 'Erro ao alterar loja.'});
				}
				return res.status(202).json({success: true, message: 'Loja alterada com sucesso.'})
			});
	}

	controller.save = function(req, res){
		var dados = {
			//"owner" : req.decoded.id,
			"owner" : sanitize(req.body.owner),
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
				return res.send({ success:false, message: 'Erro ao criar loja.'});
			} else {

				User.update({_id: sanitize(req.body.owner) },{ $push: { stores: store } }, function(err, user){
					if (err){
						return res.send({ success:false, message: 'Erro ao associar loja ao usuário.'});
					}
				});

				return res.json({
					success: true,
					message: 'Loja criada com sucesso.'
				})

			}


		});
	}

	controller.delete = function(req, res){
		var id = sanitize(req.params.id);
		var owner = sanitize(req.body.owner);

		Store.remove({'_id' :id}, function(err, store){
			if (err){
				res.status(401).json({message: 'Erro ao deletar loja.'})
			} else {

				User.update({_id: owner },{ $pull: { stores: id } }, function(err, user){
				if (err){
					return res.send({ success:false, message: 'Erro ao desvincular loja do usuário.'});
					}
				});

				res.json({message: 'Loja deletada com sucesso.'})

			}

		});

	}

	return controller;

}