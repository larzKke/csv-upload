var express = require('express');
var app = express();
var path = require('path');
var multer = require('multer');
var upload = multer();
var fs = require('fs');
var csv = require('fast-csv');

var upload = multer({ dest: 'uploads/' })


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

/*app.post('/upload', upload.single('file'),function(req, res, next) {
    if (req.file) {
        fs.readFile(req.file.path, 'utf8', function(err, data) {
            if (err) throw err;
            res.send(data);
        });
    } else {
        res.send('Error!');
    }
});*/

app.post('/upload', upload.single('file'),function(req, res, next) {
    if (req.file) {
            
            var stream = fs.createReadStream(req.file.path);
            
            csv
            .fromStream(stream, {headers : true})
            .on('data', function(data){
                console.log(data);
            })
            .on('end', function(){
                console.log('done');
                res.end('Done!');
            });
            
    } else {
        res.send('Error!');
    }
});



app.listen(8080);