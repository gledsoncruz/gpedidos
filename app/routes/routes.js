var express = require('express');

module.exports = function(app){

	var userCtrl = app.controllers.userCtrl;

	var router = express.Router();
    app.use('/api', router);

	router.route('/by')
	   .get(function(req, res){
	   	//console.log('response: '+ req);
		res.json({"appname":"GPedidos-Sistema de Pedidos", "author":"Gledson Cruz", "email":"gledson.cruz@gmail.com"});
	});

    router.route('/signup').post(userCtrl.save);

   	router.route('/users/:id')
		.get(userCtrl.findById)
		.delete(userCtrl.delete)
		.put(userCtrl.update);

	router.route('/users')
		.get(userCtrl.findAll);



	app.use(function(req,res){
	    res.status(404).send({message: 'Erro 404: Rota não encontrada'});
	});

}
