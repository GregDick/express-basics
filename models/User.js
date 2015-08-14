var bcrypt = require('bcrypt');
function User(u){
  this.email = u.email;
  // this.passwordHash = ?
  this.hashedPassword = u.hashedPassword;
};

User.create = function(u, cb){
  if (u.password !== u.password_confirm) {
    cb('Password do not match');
  };
  bcrypt.hash(u.password, 8, function(err, hash){
    u.hashedPassword = hash;
    var user = new User(u);
    User.collection.save(user, cb);
  });
}

Object.defineProperty(User, 'collection', {
  get: function(){
    return global.db.collection('user');
  }
});



module.exports = User;
