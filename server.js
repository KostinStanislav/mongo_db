const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var db;
MongoClient.connect('mongodb://star:staruser@ds119548.mlab.com:19548/staruser', (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(process.env.PORT, () => {
    console.log('listening on Mongo');
  });
});
app.use(express.static('public'));
app.use(bodyParser.json());
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended: true}));
//READ
app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.render('index.jade', {quotes: result});
  });
});
//CREATE
app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/');
  });
});
//UPDATE
app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({"_id" : ObjectID(req.body._id)}, {
    $set: {
      name: req.body.name,
      surname: req.body.surname,
      email:req.body.email,
      age:req.body.age
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
});
//DELETE
app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete({"_id" : ObjectID(req.body._id)},
  (err, result) => {
    if (err) return res.send(500, err);
    res.send(result);
  });
})