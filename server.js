'use strict'

var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var http = require('http');
var path = require('path');
var reload = require('reload');
var logger = require('morgan');
var request = require('request');
var url = require('url');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' })
var fs = require('fs');



var app = express();
const singleUpload = upload.single('file1');

//views and port config
app.set('port', process.env.PORT || 3001);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public'));

//middleware
app.use(express.static(path.join(__dirname, '/public')));
app.use(logger('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));


app.get('/upload', function(req,res) {

	res.render('index');


});


app.post('/upload', singleUpload, function(req,res,next) {
	console.log("Fieldname: " + req.file.fieldName);
	console.log("originalname: " + req.file.originalname);
	console.log("encoding: " + req.file.encoding);
	console.log("mimetype: " + req.file.mimetype);
	console.log("size: " + req.file.size);
	console.log("tmp_path: " + req.file.path);
	console.log("target_path: " + req.file.path);

	res.send(req.file);
});


app.listen(3000, () => {
	console.log('Express server started on port 3000'); 
});




// /** Permissible loading a single file, 
//     the value of the attribute "name" in the form of "recfile". **/


// app.post('/upload', type, function (req,res) {

//   /** When using the "single"
//       data come in "req.file" regardless of the attribute "name". **/
//   var tmp_path = req.file.path;

//   * The original name of the uploaded file
//       stored in the variable "originalname". *
//   var target_path = 'uploads/' + req.file.originalname;

//   /** A better way to copy the uploaded file. **/
//   var src = fs.createReadStream(tmp_path);
//   var dest = fs.createWriteStream(target_path);
//   src.pipe(dest);
//   src.on('end', function() { res.render('complete'); });
//   src.on('error', function(err) { res.render('error'); });

// });


