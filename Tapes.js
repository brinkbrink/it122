import mongoose from 'mongoose';
const { Schema } = mongoose;
import { connectionString } from './credentials.js';

mongoose.connect(connectionString, {
    dbName: 'projects',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const tapeSchema = new Schema({
 artist: { type: String, required: true },
 title: { type: String, required: true },
 year: Date,
 genre: String,
 price: Number
});

export const Tape = mongoose.model('Tapes', tapeSchema);