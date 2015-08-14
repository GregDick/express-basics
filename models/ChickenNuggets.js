function Order (o) {
  this.createdAt = new Date();
  this.complete = false;
  this.cost = this.qty * 0.25;
}

Object.defineProperty(Order, 'collection', {
  get: function(){
    return global.db.collection('chickenNuggets');
  }
})

Order.prototype.save = function(cb){
  Order.collection.save(this, cb);
}

Order.prototype.complete = function(cb){
  Order.collection.update(
    {_id: this._id},
    {$set: {complete: true}},
    cb);
}


Order.findById = function(id, cb){
  Order.collection.find({_id: ObjectID(req.params.id)}, cb);
}


Order.findAll = function(cb){
  var collection = global.db.collection('chickenNuggets');
  collection.find().toArray(cb);
};

module.exports = Order;

