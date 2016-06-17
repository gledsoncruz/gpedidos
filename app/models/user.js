var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

module.exports = function(){

	var UserSchema = new Schema({
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			index: {
				unique: true
			}
		},
		password: {
			type: String,
			required: true,
			select: false
		},
		role: {
			type: String, //admin, gerente, funcionario, appuser
			required: true,
			select: false
		},
		block: {
			type: Boolean,
			default: false,
			select: false
		},
		updated_at: {
			type: Date,
			default: Date.now
		},
		created_at: {
			type: Date,
			default: Date.now
		}
	});

	UserSchema.pre('update', function() {
	  this.update({},{ $set: { updated_at: new Date() } });
	});

	UserSchema.pre('save', function(next){
		var user = this;

		if (!user.isModified('password'))
			return next();

		bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
			if (err)
				return next(err);
			bcrypt.hash(user.password, salt, function(err, hash){
				if (err)
					return next(err);
				user.password = hash;
				next();
			});
		});
	});

	UserSchema.methods.comparePassword = function(password) {
	    var user = this;

	    return bcrypt.compareSync(password, user.password);
	};



	return mongoose.model('User', UserSchema);

};
