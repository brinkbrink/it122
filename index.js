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

app.get('/detail/:title', (req,res) => {
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

app.get('/api/v1/delete/:id', (req,res) => {
  Tape.deleteOne({"_id":req.params.id}, (err, result) => {
    if (err || !result) {
      res.status(500).json({"message":"Database error, title not found"});
  } else {
      res.status(200).json({"deleted": result});
   }
  });
});

app.post('/api/v1/add', (req, res) => {
  console.log(req.body)
  if(req.body.title === ""){ // if no title, disallow add/edit
    res.status(500).json({"message":"Title field required!"});
    return;
  }else{
    if (!req.body._id) { // insert new tape
        let tape = new Tape({title:req.body.title,artist:req.body.artist,year:req.body.year,genre:req.body.genre,price:req.body.price});
        tape.save((err, result) => {
            if (err || !result) {
              res.status(500).json({"message":"Database error, tape not saved"});
              return;
            } else {
            console.log("result?",result)
            res.json({updated: 0, _id: result._id});
            }
        });
    } else { // update tape
        Tape.updateOne({ _id: req.body._id}, {title:req.body.title,artist:req.body.artist,year:req.body.year,genre:req.body.genre,price:req.body.price}, (err, result) => {
          if (err || !result) {
            res.status(500).json({"message":"Database error, tape not edited"});
            return;
          } else {
            res.json({updated: result.nModified, _id: req.body._id});
          }
        });
    }}
});
 
app.use((req,res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
  console.log('Express started');
});