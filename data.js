export let tapes = [
    {
        artist: 'Armand Hammer',
        title: 'Shrines',
        year: 2020,
        genre: 'hip hop',
        price: 13.00
    },
    {
        artist: 'Death',
        title: 'Leprosy',
        year: 1988,
        genre: 'death metal',
        price: 11.00
    },
    {
        artist: 'Matt Sweeney and Bonnie \'Prince\' Billy',
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
        artist: 'Fly Anakin and Pink Siifu',
        title: 'Fly Siifu',
        year: 2020,
        genre: 'hip hop',
        price: 11.99
    },
    {
        artist: 'Spirito Di Lupo',
        title: '4 Canzoni',
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

export const getItem = (val) => {
const findTape = (tape) => {
    return tape.artist === val;
}
    const result = tapes.find(findTape);
    return result;
}

export const addItem = (artist, title, year, genre, price) => {
    let newTape = {artist: artist, title: title, year: year, genre: genre, price: price}
    let index = tapes.findIndex(tape => tape.title === newTape.title);
    if(index === -1){
        tapes.push(newTape);
        return true;
    }else{
        return false;
    }
}

export const deleteItem = (artist, title, year, genre, price) => {
    let newTape = {artist: artist, title: title, year: year, genre: genre, price: price}
    let index = tapes.findIndex(tape => tape.title === newTape.title);
    if(index === -1){
        return false;
    } else {
        tapes = tapes.filter(tape => tape.artist !== artist)
        return true;
    }
}