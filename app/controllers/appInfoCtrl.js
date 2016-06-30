module.exports = function(app){

	var controller = {};

	controller.appInfos = function(req, res){
		res.json({
			appName: 'Bebida Fácil',
			email: 'gledson.cruz@gmail.com',
			author: 'Gledson Cruz'

		})
	}

	return controller;

}