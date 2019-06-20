var express = require('express');
var app = require('express')();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render("client");
});

app.listen(5000, function () {
  console.log('listening on *:5000');
});