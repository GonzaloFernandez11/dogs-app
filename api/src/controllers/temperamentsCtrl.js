const { Breeds, Temperaments } = require('../db.js');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;


const api_Link = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

let allTemperaments = [];
let aux = [];


const getTemperaments = async () => {
    
    const apiData = await axios.get(api_Link);
    
    apiData.data.map( ele => {
        let temperaments = [];

        if( ele.temperament  ) {
            temperaments = ele.temperament.split(', ');

            aux = allTemperaments;
            aux = [...aux, ...temperaments];
            aux = new Set( aux );    // Evitamos Repeticiones;
            allTemperaments = [...aux]
        }
    } );

    // Creación en la DB Temperaments:
    let tempsObj = [];

    for( let temp of aux ) {  
        tempsObj.push({ name: temp });
    }
    aux = []; 

    const verification = await Temperaments.findAll();
    if( !verification.length ) {
        await Temperaments.bulkCreate( tempsObj );
    }

}


const getAllTemperaments = async () => {

    if( !allTemperaments.length ) await getTemperaments();

    const tempsDB = await Temperaments.findAll();
    if( !tempsDB.length ) throw new Error( `Error in server` );

    return tempsDB;
} 

module.exports = getAllTemperaments;