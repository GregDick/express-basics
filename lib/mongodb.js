var mongo = require('mongodb').MongoClient;

var url = process.env.MONGODB_URL;

if(!global.db){
  mongo.connect('mongodb://localhost:27017/express_basics', function(err, db){
    global.db = db;
  });
}

