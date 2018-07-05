const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const cons = require('consolidate');
const dust = require('dustjs-helpers');

//create connetion
const db = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'nodemysql'
});

const app = express();

//db connect
db.connect((err) => {
  if (err){
     throw err;
   }
  console.log('mysql connected');
});

//assign Dust engine to .dust files
app.engine('dust', cons.dust);

//set default ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

app.get('/', (req,res) => {
  let sql = ' SELECT * FROM posts ';
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.render('app', { posts : result });

  });
});

app.post('/add', (req,res) => {
  var title = req.body.title;
  var descr = req.body.descr;
  let sql = "INSERT INTO posts (title, descr) VALUES (?, ?)";
  let query = db.query(sql, [title, descr],  (err, result) => {
    if(err) throw err;
    console.log(result);

  });
  res.redirect('/');
});

app.delete('/delete/:id', (req,res) => {
  var id = req.params.id;
  let sql = "DELETE FROM posts WHERE id = ?";
  let query = db.query(sql, [id],  (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(200);
  });

});

app.post('/edit', (req,res) => {
  var title = req.body.title;
  var descr = req.body.descr;
  var id = req.body.id;
  let sql = "UPDATE posts SET title = ?, descr = ? WHERE id = ?";
  let query = db.query(sql, [title, descr, id],  (err, result) => {
    if(err) throw err;
    console.log(result);

  });
  res.redirect('/');
});





app.listen(3000, () => {
  console.log('server started on 3000');
});
