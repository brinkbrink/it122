export const tapes = [
    {
        artist: 'armandhammer',
        title: 'Shrines',
        year: 2020,
        genre: 'hip hop',
        price: 13.00
    },
    {
        artist: 'death',
        title: 'Leprosy',
        year: 1988,
        genre: 'death metal',
        price: 11.00
    },
    {
        // artist: 'matt sweeney & bonnie \'prince\' billy',
        // will use decodeURIComponent or something similar in the future...but for now this works!
        artist: 'sweeney',
        title: 'Superwolves',
        year: 2021,
        genre: 'folk rock',
        price: 19.95
    },
    {
        artist: 'pilgrimscrew',
        title: 'Pilgrim Screw',
        year: 2021,
        genre: 'lo-fi synth-punk',
        price: 6.95
    },
    {
        artist: 'pinksiifu',
        title: 'Fly Siifu',
        year: 2020,
        genre: 'hip hop',
        price: 11.99
    },
    {
        artist: 'spirito',
        title: '4 canzoni',
        year: 2021,
        genre: 'inner peace punk',
        price: 9.07
    },   
    {
        artist: 'rundgren',
        title: 'The Ever Popular Tortured Artist Effect',
        year: 1982,
        genre: 'pop rock',
        price: 3.79
    }
];

export const getAll = () => {
    return tapes;
}

export const getItem = (val) => {
const findTape = (tape) => {
    return tape.artist === val;
}
const result = tapes.find(findTape);
return result;
}
     