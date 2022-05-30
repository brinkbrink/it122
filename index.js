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

app.get('/:title', (req,res) => {
  let title = req.params.title;
  Tape.findOne({ title: title }).lean().then((tape) => {
          res.render('details', {result: tape, artist: req.body.artist, title: title, genre: req.body.genre, year: req.body.year, price: req.body.price} )
      })
})

app.get('/api/v1/:title', (req, res) => {
  let title = req.params.title;
  Tape.findOne({title: title}, (err, result) => {
      if (err || !result) {
          res.status(500).json({"message":"Database error, artist not found"});
      } else {
          res.json({"message": `${title} found`, "Result": result} );
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
  let title = req.params.title;
  Tape.deleteOne({"title":req.params.title }, (err, result) => {
    if (err || !result) {
      res.status(500).json({"message":"Database error, title not found"});
  } else {
      res.status(200).json({"message": `${title} deleted`, "Result": result});
   }
  });
});

app.post('/api/v1/add', (req, res) => {
  let title = req.body.title;
  let newTape = {artist: req.body.artist, title: req.body.title, year: req.body.year, genre: req.body.genre, price: req.body.price }
  if (!req.body.title || !req.body.artist){
    res.json({"message":"Tape not added or modified: title and artist are required fields"})
  } else {
  Tape.updateOne({title: req.body.title,}, newTape, {upsert:true}, (err, result) => {
    if (err || !result) {
      res.status(200).json({"message":"Database error, tape not added"});
    } else {
        if(result.modifiedCount===0){
          res.json({"message":`${title} tape added`,"result":result})
        } else {
          res.json({"message":`${title} tape modified`,"result":result});
        }
    }
  });
}
});
 
app.use((req,res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
  console.log('Express started');
});