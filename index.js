import http from 'http';
// import fs from fs;
import * as tape from './data.js';
import path from 'path';
import express from 'express';


const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('./public')); // set location for static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies
app.set("view engine", "ejs");

// send static file as response
app.get('/', (req,res) => {
  res.type('text/html');
  res.render('home', { tapes: tape.getAll()});
  // res.sendFile('./public/home.html');
 });

 app.get('/detail', (req,res) => {
  res.type('text/html');
  console.log(req.query);
  let result = tape.getItem(req.query.artist);
  // res.end("Detail for " + req.query.artist)
  // res.sendFile('./public/home.html');
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
 

// http.createServer((req, res) => {
//   let detail = req.url.split("?"); // split query string 
//   let params = new URLSearchParams(detail[1]); // used URLSearchParams as recommended, parse is deprecated as of 2019
//   let artist = params.get('artist'); // gets artist value from query
//   const path = req.url.toLowerCase();
//   switch(path) {
//     case '/':
//       res.writeHead(200, {'Content-Type': 'text/plain'});
//       res.end(JSON.stringify(tape.getAll())); // displays all objects in tapes array
//       break;
//     case '/about':
//       res.writeHead(200, {'Content-Type': 'text/plain'});
//       res.write(req.url);
//       res.end('Learning more about me could lead to learning more about you. Or it could just be a complete waste of time.');
//       break;
//     case `/detail?artist=${artist}`:
//       let found = tape.getItem(`${artist}`); // getting object from array
//       res.writeHead(200, {'Content-Type': 'text/plain'}); 
//       let results = (found) ? JSON.stringify(found) : 'Nothing found'; // if results exist display them, otherwise use nothing found msg
//       res.end(`Results for ${artist} 
//       ${results}`); // results displayed
//       break;
//     default:
//       res.writeHead(404, {'Content-Type': 'text/plain'});
//       res.end('404 error - These aren\'t the droids you\'re looking for...');
//       break;
//   }
// }).listen(process.env.PORT || 3000);