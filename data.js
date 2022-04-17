export const tapes = [
    {
        artist: 'armand hammer',
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
        artist: 'Matt Sweeney & Bonnie \'Prince\' Billy',
        title: 'Superwolves',
        year: 2021,
        genre: 'folk rock',
        price: 19.95
    },
    {
        artist: 'Pilgrim Screw',
        title: 'Pilgrim Screw',
        year: 2021,
        genre: 'lo-fi synth-punk',
        price: 6.95
    },
    {
        artist: 'Pink Siifu & Fly Anakin',
        title: 'Fly Siifu',
        year: 2020,
        genre: 'hip hop',
        price: 11.99
    },
    {
        artist: 'Spirito Di Lupo',
        title: '4 canzoni',
        year: 2021,
        genre: 'inner peace punk',
        price: 9.07
    },   
    {
        artist: 'Todd Rundgren',
        title: 'The Ever Popular Tortured Artist Effect',
        year: 1982,
        genre: 'pop rock',
        price: 3.79
    }
];

export const getAll = () => {
    return tapes;
}

// const hasDeath = el => el.artist ==='Death';
// const deathResult = tapes.find(hasDeath);
// console.log(deathResult);
export const getItem = (val) => {
const findTape = (tape) => {
    return tape.artist === val;
}
const result = tapes.find(findTape);
return result;
}
// console.log(getItem('death'));


// export const getItem = () => {
// tapes.find( tape => tape.artist === 'death' );
// }

// export const getItem = () => {
//     tapes.find((tape) => {
//     console.log('death');
//     let found = tape.artist
//     return tape.artist === 'death';
//     });
// }
     