import http from 'http';
import * as tape from './data.js';
import path from 'path';
import express from 'express';


const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('./public')); // set location for static files
app.use(express.urlencoded({ extended: true }));//Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies
app.set("view engine", "ejs");

// send static file as response
app.get('/', (req,res) => {
  res.type('text/html');
  res.render('home', { tapes: tape.getAll()});
 });

 app.get('/detail', (req,res) => {
  res.type('text/html');
  console.log(req.query);
  let result = tape.getItem(req.query.artist);
  res.render("details", { artist: req.query.artist, result })
 });

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