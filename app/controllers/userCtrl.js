var sanitize = require('mongo-sanitize');
module.exports = function(app){

	var User = app.models.user;
	//var loginCtrl = app.controllers.loginCtrl;
	var controller = {};

	controller.findAll = function(req, res){
		User.find({}).populate('stores').exec(function(err, users) {
		    if (err) {
		      return res.send(err);
		    }
		    res.json(users);
		});
	}

	controller.findById = function(req, res){
		var id = sanitize(req.params.id);
		User.findOne({'_id' :id}, function(err, user){
			if (err){
				return res.status(401).json({message: 'Usuário não encontrado.'})
			}
			return res.json(user);
		});
	}

	controller.update = function(req, res){
		var id = sanitize(req.params.id);
		var updates = req.body;
		User.update({"_id" :id}, req.body,
			function(err){
				if (err){
					return res.json({ success: false, message: 'Erro ao alterar usuário.'});
				}
				return res.status(202).json({success: true, message: 'Usuário alterado com sucesso.'})
			});
	}

	controller.save = function(req, res){
		var dados = {
		    "name" : sanitize(req.body.name),
		    "email" : sanitize(req.body.email),
		    "phone" : sanitize(req.body.phone),
		    "password" : sanitize(req.body.password),
		    "role" : sanitize(req.body.role)
		};

		User.create(dados, function(err, user){


			if (err){
				if (err.code == 11000)
					return res.send({ success: false, message: 'Email já existente em nossa base de dados.'});
				else
					return res.send({ success:false, message: 'Erro ao salvar usuário.'});
			}
			//var token = loginCtrl.createToken(user);

			return res.json({
				success: true,
				message: 'Usuário criado com sucesso.'
				//token: token
			})
		});
	}

	controller.delete = function(req, res){
		var id = sanitize(req.params.id);
		User.remove({'_id' :id}, function(err, user){
			if (err){
				res.status(401).json({message: 'Erro ao deletar usuário.'})
			}
			res.json({message: 'Usuário deletado com sucesso.'})
		})
	}


	return controller;

}