// // import http from 'http';
// import * as tape from './data.js';
// import path from 'path';
import express from 'express';
import { Tape } from "./Tapes.js";


const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('./public')); // set location for static files
app.use(express.urlencoded({ extended: true }));//Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies
app.set("view engine", "ejs");


app.get('/', (req, res) => {
  Tape.find({}).lean().then((tapes) => {
      // respond to browser only after db query completes
      res.render('home', { tapes });
  })
})

app.get('/detail', (req,res) => {
  // db query can use request parameters
  Tape.findOne({ artist:req.query.artist }).lean().then((tape) => {
          res.render('details', {result: tape} )
      })
})

// send static file as response
// app.get('/', (req,res) => {
//   res.type('text/html');
//   res.render('home', { tapes: tape.getAll()});
// });

// app.get('/detail', (req,res) => {
//   res.type('text/html');
//   let result = tape.getItem(req.query.artist);
//   res.render("details", { artist: req.query.artist, result })
// });

// send plain text response
app.get('/about', (req,res) => {
  res.type('text/plain');
  res.send('About page');
});
 
// define 404 handler
app.use((req,res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
  console.log('Express started');
});