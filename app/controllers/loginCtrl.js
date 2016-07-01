var jsonwebtoken = require('jsonwebtoken');
var gpedidosToken = process.env.GTOKEN;

module.exports = function(app){

	var User = app.models.user;
	var controller = {};

	function createToken(user){

		var token = jsonwebtoken.sign({
			id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			block: user.block
		}, gpedidosToken, {
			expiresIn: 1440
		});

		return token;
	}

	controller.authorize = function(req, res, next){

		var id = req.decoded.id;
		//console.log(id);
		User.findOne({_id: id}).select('role').exec(function (err, user){
			if (err) throw err;
			if (user.role === 'admin'){
				next();
			} else {
				console.log(err);
				res.status(403).send({success: false, message: 'Não autorizado.'});
			}

		});
	}

	controller.authenticate = function(req, res){

		var email = req.body.email || '';
		var password = req.body.password || '';

		if (email == '' || password == '') {
		    return res.sendStatus(401);
		}

		User.findOne({email: email}).select('name email password role block').exec(function (err, user) {

			if (err) throw err;

			if(!user){
				res.send({message: 'Usuário não existe.'});
			} else if (!user.block){
				//console.log(user);
				var validPassword = user.comparePassword(req.body.password);

				if (!validPassword){
					res.send({message: 'Usuário ou senha inválido.'})
				} else {
					var token = createToken(user);

					res.json({
						success: true,
						message: 'Login efetuado com sucesso.',
						token: token
					})
				}
			} else {
				res.send({ message: 'Usuário bloqueado, entre em contato com o administrador.'})
			}
		});
	}

	controller.validateJWT = function(req, res, next){
		//console.log('Validate jwt');

		var token = req.body.token || req.params['token'] || req.headers['x-access-token'];
		//console.log('API-Token: ' +token);
		if (token){
			jsonwebtoken.verify(token, gpedidosToken, function(err, decoded){
				//console.log('Token: ' +token);
				if (err){
					res.status(403).send({success: false, message: 'Falha na autenticação.'});
				} else {
					req.decoded = decoded;
					//console.log(req.decoded);
					next();
				}
			});
		} else {

			res.status(403).send({success: false, message: 'Token inválido.'});
		}

	}

	return controller;

}


