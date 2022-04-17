const tapes = [
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

// export const getItem = (val) => {
//     return tapes.find(artist == )
// }