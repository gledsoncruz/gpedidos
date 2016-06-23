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
				return res.status(401).json({message: 'User not found'})
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
					return res.json({ success: false, message: 'Error updated.'});
				}
				return res.status(202).json({success: true, message: 'User has been updated'})
			});
	}

	controller.save = function(req, res){
		var dados = {
		    "name" : sanitize(req.body.name),
		    "email" : sanitize(req.body.email),
		    "password" : sanitize(req.body.password),
		    "role" : sanitize(req.body.role)
		};

		User.create(dados, function(err, user){


			if (err){
				if (err.code == 11000)
					return res.send({ success: false, message: 'Email is already taken.'});
				else
					return res.send({ success:false, message: 'Error'});
			}
			//var token = loginCtrl.createToken(user);

			return res.json({
				success: true,
				message: 'User created !'
				//token: token
			})
		});
	}

	controller.delete = function(req, res){
		var id = sanitize(req.params.id);
		User.remove({'_id' :id}, function(err, user){
			if (err){
				res.status(401).json({message: 'Error delete user'})
			}
			res.json({message: 'User has been deleted'})
		})
	}


	return controller;

}