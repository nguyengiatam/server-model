const controller = require('../../controller/sakila.controller');
const middleware = require('../../middleware/sakila');
const router = require('./extention').Router()

router.getS('/film/:id', [middleware.authenticate, controller.getFilm])

module.exports = router