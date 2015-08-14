var mongo = require('mongodb').MongoClient;

if(!global.db){
  var url = process.env.MONGODB_URL;
  mongo.connect('mongodb://tester:bouaTkj6DpHIV66@ds047800.mongolab.com:47800/express_basics', function(err, db){
    global.db = db;
  });
}

