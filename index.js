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
      res.render('home', { tapes });
  })
})

app.get('/detail', (req,res) => {
  Tape.findOne({ artist:req.query.artist }).lean().then((tape) => {
          res.render('details', {result: tape} )
      })
})

app.get('/about', (req,res) => {
  res.type('text/plain');
  res.send('About page');
});

app.get('/delete', (req,res) => {
  Tape.remove({ artist:req.query.artist}, (err, result) => {
    if (err){
        console.log(err)
    }else{
        console.log("Result :", result) 
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