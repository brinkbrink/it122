import { Tape } from "../Tapes.js";

// return all records
Tape.find({}).lean()
  .then((tapes) => {
    console.log(tapes);
  })
  .catch(err => next(err));