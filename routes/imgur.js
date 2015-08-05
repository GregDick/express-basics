var fs = require('fs');

var express = require('express');
var router = express.Router();
var multer = require('multer');

var imgur = require('imgur');


var upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 200 * 1000 * 1000
  },
  fileFilter: function(req, file, cb){
    cb(null, file.mimetype.slice(0, 6) === 'image/');
  }
});

router.get('/', function(req, res){
  res.render('templates/imgur');
});

router.post('/upload', upload.single('image'), function(req, res){
  if(req.file){
    imgur
      .uploadFile(req.file.path)
      .then(function(json){
        fs.unlink(req.file.path, function(){
          res.redirect(json.data.link);
        })
      })
      .catch(function(error){
        res.send(err);
      })
  }else{
    res.status(415).send('File must be an image');
  }
});

module.exports = router;
