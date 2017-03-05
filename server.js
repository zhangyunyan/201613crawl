var express=require('express');
var app=express();
var path=require('path');
var Movie=require('./model').Movie;
app.set('view engine','html');
app.set('views',path.resolve('views'));
app.engine('html',require('ejs').__express);
// app.use(express.static(__dirname));
app.use(express.static(path.resolve('node_modules')));
app.get('/',function (req, res) {
    Movie.find({},function (err, movies) {
        res.render('index',{movies})
    })
})


app.listen(80);