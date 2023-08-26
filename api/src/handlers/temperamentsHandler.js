const getAllTemperaments = require('../controllers/temperamentsCtrl.js');

const getTemperaments = async (req, res) => {
    try {
        const temps = await getAllTemperaments();
        res.status(200).json(temps);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = getTemperaments;