// // import http from 'http';
// import * as tape from './data.js';
// import path from 'path';
import express from 'express';
import { Tape } from "./Tapes.js";
import cors from 'cors';
// import { router } from './routes.js';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('./public')); // set location for static files
app.use(express.urlencoded({ extended: true }));//Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies
app.set("view engine", "ejs");
// app.use('/api', router)
app.use('/api', cors());


app.get('/', (req, res) => {
  Tape.find({}).lean().then((tapes) => {
      res.render('home', { tapes });
  })
})

app.get('/api/v1/', (req,res, next) => {
  Tape.find((err,results) => {
      if (err || !results) return next(err);
      res.json(results);
  });
});

app.get('/about', (req,res) => {
  res.type('text/plain');
  res.send('About page');
});

app.get('/detail/:artist', (req,res) => {
  let artist = req.params.artist;
  Tape.findOne({ artist: artist }).lean().then((tape) => {
          res.render('details', {result: tape, artist: artist} )
      })
})

app.get('/api/v1/:artist', (req, res, next) => {
  let artist = req.params.artist;
  console.log(artist);
  Tape.findOne({artist: artist}, (err, result) => {
      if (err || !result) {
          res.status(404).json({"message":"not found"});
      } else {
          res.json( result );
       }
  });
});

app.get('/delete/:artist', (req,res) => {
  let artist = req.params.artist;
  Tape.deleteOne({ artist:artist}, (err, result) => {
    if (result.deletedCount === 0){
        console.log(err, "this don't work", result);
        res.render('delete', {result})
    }else{
        res.type('text/html');
        res.render('delete', {result: Tape}) 
        console.log("Result :", result, artist, " deleted");
    }
});
});

app.get('/api/v1/delete/:title', (req,res, next) => {
  Tape.deleteOne({"title":req.params.title }, (err, result) => {
      if (err) return next(err);
      console.log(result.deletedCount, "deleted")
      res.json({result});
  });
});

app.post('/api/v1/add', (req, res) => {
  const newTape = {'artist': req.body.artist, 'title': req.body.title, 'year': req.body.year, 'genre': req.body.genre, 'price': req.body.price }

  Tape.updateOne({'artist': req.body.artist,}, newTape, {upsert:true}, (err, result) => {
      if (err) return next(err);
      console.log(result);
      // res.send( req.body.artist + " tape added");
      res.json(newTape)
  });
});

// app.post('/api/v1/add/', (req,res, next) => {
//   console.log(req.body)
//   if (!req.body._id) { 

//       let tape = new Tape({artist:req.body.artist, title:req.body.title, year:req.body.year, genre:req.body.genre, price:req.body.price});
//       tape.save((err,tape) => {
//           if (err) return next(err);
//           console.log(newTape)
//           res.json({tape});
//       });
//   } else { 
//       Tape.updateOne({artist:req.body.artist, title:req.body.title, year:req.body.year, genre:req.body.genre, price:req.body.price}, (err, result) => {
//           if (err) return next(err);
//           res.json({updated: result.nModified, _id: req.body._id});
//       });
//   }
// });

// app.post('/api/v1/add', (req, res) => {
//   const data = new Tape({artist: req.body.artist, title: req.body.title, year: req.body.year, genre: req.body.genre, price: req.body.price});
//   try{
//     const saveData = data.save();
//     res.status(200).json(saveData)
//   } 
//   catch(error) {
//     res.status(400).json({message: error.message})
//   }
// })

 
app.use((req,res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
  console.log('Express started');
});