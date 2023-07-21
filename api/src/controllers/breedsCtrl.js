const { Breeds, Temperaments } = require('../db.js');
const axios = require('axios'); // instalar Axios.
require('dotenv').config();
const { API_KEY } = process.env;

const api_Link = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;


const getApiBreeds = async () => {
    const apiInfo = await axios.get(api_Link);
    const data = apiInfo.data;
    const breedsApi = data.map( ele => {

        return {
            id: ele.id,
            name: ele.name,
            image: ele.image.url,
            height: ele.height.metric, // Usamos el sistema métrico (cm, metros, etc) y no el imperial (pulgadas, pies, etc);
            weight: ele.weight.metric, // Usamos el sistema métrico (gramos, kilogramos) y no el imperial (onzas, libras, etc);
            life_span: ele.life_span,
            temperaments: ele.temperament,
        }
    } );


    return breedsApi;
}

const getBreedsFromDB = async () => {
    const infoDB = await Breeds.findAll({
        include: {
            model: Temperaments,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },
    });
    
    const breedsDB = infoDB.map( ele => {
        return {
            id: ele.id,
            name: ele.name,
            image: ele.image,
            height: ele.height,
            weight: ele.weight,
            life_span: ele.life_span,
            temperaments: ele.temperaments.map( temp => temp.name ) // asi no me trae el objeto, sino los nombres.
        }
    } );

    return breedsDB;
}


const getAllBreeds = async (name) => {

    const breedsAPI = await getApiBreeds();
    const breedsDB = await getBreedsFromDB();
    const allBreeds = [...breedsAPI, ...breedsDB];

    if(name) {
        const filterByName = allBreeds.filter(
        ele => ele.name.toUpperCase().includes(name.toUpperCase())
        );
        if(!filterByName.length) {
            throw new Error(`The Breed with name ${name} doesn't exist`)
        } else {
        return filterByName;
      }
    } else {
        return allBreeds;
    }
}


const getBreedsByID = async (id) => {

    const breeds = await getAllBreeds();
    const breedsID = breeds.filter( breed => breed.id == id );

    if( !breedsID.length ) throw new Error( `Breed with id ${id} not found` );

    return breedsID;
}



const postNewDog = async (name, image, min_height, max_height, min_weight, max_weight, min_life, max_life, temperaments) => {

    if(!name || !image || !min_height || !max_height || !min_weight || !max_weight || !min_life || !max_life || temperaments.length === 0) {
        throw new Error(`Missing Data`)
    } else if (
        
    !/^[A-Za-z ]+$/.test(name) 
    || min_height < 15 
    || !/^[0-9]+$/.test(min_height)

    || max_height > 110 
    || !/^[0-9]+$/.test(max_height)

    || min_height > max_height 
    || min_weight < 1 || !/^[0-9]+$/.test(min_weight) 

    || max_weight > 90 
    || !/^[0-9]+$/.test(max_weight) 
    || min_weight > max_weight || min_life < 1 
    || !/^[0-9]+$/.test(min_life) 
    || max_life > 20 || !/^[0-9]+$/.test(max_life) 
    || min_life > max_life

    ) {
        throw new Error(`Wrong Data`);
    }
// Combinamos las Alturas:
    const mixed_Heights = [];
    mixed_Heights.push(`${min_height} - ${max_height}`);
    // const mixed_Heights = `${min_height} - ${max_height}`

// Combinamos los Pesos:
    const mixed_Weight = [];
    mixed_Weight.push(`${min_weight} - ${max_weight}`);

// Combinamos la Esperanza de Vida:
    const mixed_Life = [];
    mixed_Life.push(`${min_life} - ${max_life}`);

// Ahora lo creo en la DB:
    let breedCreated = await Breeds.create({
        name,
        image,
        height: mixed_Heights,
        weight: mixed_Weight,
        life_span: mixed_Life,
    });

    await Promise.all(temperaments.map(async (temp) => {
        const [associate] = await Temperaments.findOrCreate({
          where: { name: temp },
        });
        await breedCreated.addTemperament(associate); // Asociamos la raza creada a los temp.
      }));

    return breedCreated;
}


const test = async (name) => {
    const allBreeds = await getAllBreeds();

    if(name) {
        const filtered = allBreeds.filter(ele => ele.name.toUpperCase().includes( name.toUpperCase() ));
        if(!filtered.length) {
            throw new Error('no nombre');
        } else {
            return filtered;
        }
    }
}

module.exports = {
    getAllBreeds,
    getBreedsByID,
    postNewDog,
    test,
}