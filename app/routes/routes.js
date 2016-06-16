var express = require('express');

module.exports = function(app){

	var loginCtrl = app.controllers.loginCtrl;
	var userCtrl = app.controllers.userCtrl;

	var router = express.Router();
    app.use('/api', router);

	router.route('/by')
	   .get(function(req, res){
	   	//console.log('response: '+ req);
		res.json({"appname":"GPedidos-Sistema de Pedidos", "author":"Gledson Cruz", "email":"gledson.cruz@gmail.com"});
	});

    router.route('/signup').post(userCtrl.save);
    router.route('/login')
		.post(loginCtrl.authenticate);

	//ZONA RESTRITA
    //router.use(loginCtrl.validateJWT);
    router.route('/me')
		.get(function(req, res){
			res.json(req.decoded);
		});

   	router.route('/users/:id')
		.get(loginCtrl.authorize, userCtrl.findById)
		.delete(loginCtrl.authorize, userCtrl.delete)
		.put(loginCtrl.authorize, userCtrl.update);

	router.route('/users')
		.get(userCtrl.findAll);



	app.use(function(req,res){
	    res.status(404).send({message: 'Erro 404: Rota não encontrada'});
	});

}
