var sanitize = require('mongo-sanitize');
module.exports = function(app){

	var Category = app.models.category;
	var controller = {};

	controller.findAll = function(req, res){
		Category.find().exec(function(err, categories) {
		    if (err) {
		      return res.send(err);
		    }

		    res.json(categories);
		});
	}

	controller.findCategoryWithOffers = function(req, res){
		Category.find({"offers" : {$exists: true}, $where : "this.offers.length > 0"}).populate({
			path: 'offers',
			model: 'Offer',
			match: {
				available: true
			}
		}).exec(function(err, categories) {
		    if (err) {
		      return res.send(err);
		    } else {
				res.json(categories);
		    }
		});
	}

	controller.findById = function(req, res){
		var id = sanitize(req.params.id);
		Category.findOne({'_id' :id}).populate('products').exec(function(err, category){
			if (err){
				return res.status(401).json({message: 'Categoria não encontrada.'})
			}
			return res.json(category);
		});
	}

	controller.update = function(req, res){
		var id = sanitize(req.params.id);
		var updates = req.body;
		Category.update({"_id" :id}, req.body,
			function(err){
				if (err){
					return res.json({ success: false, message: 'Erro ao alterar categoria.'});
				}
				return res.status(202).json({success: true, message: 'Categoria alterada com sucesso.'})
			});
	}

	controller.save = function(req, res){
		var dados = {
		    "name" : sanitize(req.body.name)
		};

		Category.create(dados, function(err, category){


			if (err){
				return res.send({ success:false, message: 'Erro ao criar categoria.'});
			}

			return res.json({
				success: true,
				message: 'Categoria criada com sucesso.'
				//token: token
			})
		});
	}

	controller.delete = function(req, res){
		var id = sanitize(req.params.id);
		Category.remove({'_id' :id}, function(err, category){
			if (err){
				res.status(401).json({message: 'Erro ao deletar categoria.'})
			}
			res.json({message: 'Categoria deletada com sucesso.'})
		})
	}


	return controller;

}