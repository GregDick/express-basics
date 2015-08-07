var mongo = require('mongodb').MongoClient;

if(!global.db){
  mongo.connect('mongodb://localhost:27017/express_basics', function(err, db){
    global.db = db;
  });
}

