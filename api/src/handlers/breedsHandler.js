const { getAllBreeds, getBreedsByID, postNewDog } = require('../controllers/breedsCtrl');

// Creación de los Handlers:

const getBreeds = async (req, res) => {
    const { name } = req.query;
    let breed = [];
    try {
        if(name) {
            breed = await getAllBreeds(name);
        } else {
            breed = await getAllBreeds();
        }
        res.status(200).json(breed);  // json o send, probar
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}


const getBreedById = async (req, res) => {

    const { id } = req.params;
    try {
        let response = await getBreedsByID(id)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).send({ error: error.mesage })
    }
}


const postBreed = async (req, res) => {
    const { name, image, min_height, max_height, min_weight, max_weight, min_life, max_life, temperaments } = req.body;
    try {
        const newDog = await postNewDog(name, image, min_height, max_height, min_weight, max_weight, min_life, max_life, temperaments);
        res.status(200).json(newDog);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
} 



module.exports = {
    getBreeds,
    getBreedById,
    postBreed,
}