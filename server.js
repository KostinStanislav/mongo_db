const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');
var db;
MongoClient.connect('mongodb://star:staruser@ds119548.mlab.com:19548/staruser', (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(process.env.PORT, () => {
    console.log('listening on Mongo');
  });
});
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err);
    // renders index.ejs
    res.render('index.ejs', {quotes: result});
  });
});
app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/');
  });
});
