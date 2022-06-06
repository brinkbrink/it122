import express from 'express';
import { Tape } from "./Tapes.js";

const router = express.Router();

router.get('/', (req, res) => {
    Tape.find({}).lean().then((tapes) => {
        res.render('home', { tapes });
    })
    .catch((err) => {
        res.render( err );
    });
  });
  
router.get('/detail', (req,res) => {
    Tape.findOne({ artist:req.query.artist }).lean().then((tape) => {
        try{
            res.render('details', {result: tape, artist:req.query.artist} )
        } catch {
        return res.status(500).send('Database error occurrred');
    }});
  });
  
router.get('/delete', (req,res) => {
    Tape.deleteOne({ artist:req.query.artist}, (err, result) => {
      if (err){
          res.render('delete', {result: err});
        //   console.log(err);
      }else{
          res.type('text/html');
          res.render('delete', {result: Tape});
        //   console.log("Result :", result);
      }
  });
  });

router.post('/add', (req, res) => {
      const newTape = {'artist': req.body.artist, 'title': req.body.title, 'year': req.body.year, 'genre': req.body.genre, 'price': req.body.price }
  
      Tape.updateOne({'artist': req.body.artist,}, newTape, {upsert:true}, (err, result) => {
          if (err) return next(err);
          console.log(result);
          res.send( req.body.artist + " tape added");
      });
    });

    
export { router }