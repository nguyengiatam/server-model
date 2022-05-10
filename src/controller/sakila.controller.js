const models = require('../database/index-database');
const { writeLog } = require('../lib/logger');
const {checkValues} = require('../router/extention')
const sakilaController = {}

sakilaController.getFilm = async (req, res, next) => {
    const filmId = req.params.id;
    checkValues([filmId], ['film id incorrect'], [400])
    const film = await models.Film.findByPk(filmId, { raw: true })
    console.log(film);
    writeLog(film)
    checkValues([film], ['film not exist'], [404])
    res.pass(film)
}

module.exports = sakilaController