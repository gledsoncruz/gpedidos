var git = require('git-rev-sync');

module.exports = function(app){

	var controller = {};

	controller.appInfos = function(req, res){
		res.json({
			lastCommitHashLong: git.long(),
			lastCommitHashShort: git.short(),
			lastCommitMessage: git.message(),
			commitCount: git.count(),
			appName: 'Bebida Fácil',
			email: 'gledson.cruz@gmail.com',
			author: 'Gledson Cruz'

		})
	}





	return controller;

}