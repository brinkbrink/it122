import express from 'express';
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
      res.render('home', { tapes: JSON.stringify(tapes) });
  })
})

app.get('/api/v1/', (req,res, next) => {
  Tape.find((err,results) => {
    if (err || !results) {
      res.status(500).json({"message":"Database not found"});
  } else {
      res.json( results );
   }
});
});

app.get('/about', (req,res) => {
  res.type('text/plain');
  res.send('About page');
});

app.get('/:artist', (req,res) => {
  let artist = req.params.artist;
  Tape.findOne({ artist: artist }).lean().then((tape) => {
          res.render('details', {result: tape, artist: artist, title: req.body.title, genre: req.body.genre, year: req.body.year, price: req.body.price} )
      })
})

app.get('/api/v1/:artist', (req, res) => {
  let artist = req.params.artist;
  Tape.findOne({artist: artist}, (err, result) => {
      if (err || !result) {
          res.status(500).json({"message":"Database error, artist not found"});
      } else {
          res.json( result );
       }
  });
});

app.get('/delete/:title', (req,res) => {
  let title = req.params.title;
  Tape.deleteOne({ title:title}, (err, result) => {
    if (result.deletedCount === 0){
        res.render('delete', {result})
    }else{
        res.type('text/html');
        res.render('delete', {result: Tape}) 
    }
});
});

app.get('/api/v1/delete/:title', (req,res, next) => {
  Tape.deleteOne({"title":req.params.title }, (err, result) => {
    if (err || !result) {
      res.status(500).json({"message":"Database error, title not found"});
  } else {
      res.status(200).json({"Deleted": result});
   }
  });
});

app.post('/api/v1/add', (req, res) => {
  const newTape = {'artist': req.body.artist, 'title': req.body.title, 'year': req.body.year, 'genre': req.body.genre, 'price': req.body.price }
  Tape.updateOne({'title': req.body.title,}, newTape, {upsert:true}, (err, result) => {
    if (err || !result) {
      res.status(200).json({"message":"Database error, tape not added"});
    } else {
        if(result.modifiedCount===0){
          res.json({"message":"tape added","result":result})
        } else {
          res.json({"message":"tape modified","result":result});
        }
    }
  });
});
 
app.use((req,res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
  console.log('Express started');
});