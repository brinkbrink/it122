// // import http from 'http';
// import * as tape from './data.js';
// import path from 'path';
import express from 'express';
// import { restart } from 'nodemon';
import { Tape } from "./Tapes.js";
import cors from 'cors';


const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('./public')); // set location for static files
app.use(express.urlencoded({ extended: true }));//Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies
app.set("view engine", "ejs");
app.use('/api', cors());


app.get('/', (req, res) => {
  Tape.find({}).lean().then((tapes) => {
      res.render('home', { tapes });
  })
})

app.get('/detail', (req,res) => {
  Tape.findOne({ artist:req.query.artist }).lean().then((tape) => {
          res.render('details', {result: tape, artist:req.query.artist} )
      })
})

app.get('/about', (req,res) => {
  res.type('text/plain');
  res.send('About page');
});

app.get('/delete', (req,res) => {
  Tape.deleteOne({ artist:req.query.artist}, (err, result) => {
    if (result.deletedCount === 0){
        console.log(err, "this don't work", result);
        res.render('delete', {result})
    }else{
        res.type('text/html');
        res.render('delete', {result: Tape})
        console.log("Result :", result, "deleted count:", result.deletedCount);
    }
});

}
)
 
app.use((req,res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
  console.log('Express started');
});