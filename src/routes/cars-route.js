const express = require('express');
const route = express.Router()
const carsControllers = require('../application/controllers/cars-controller')
const validateRequest = require('../application/middleware/validateRequestCars')

route.get('/', carsControllers.getAll)
route.get('/:id', carsControllers.getById)
route.post('/', validateRequest, carsControllers.addCars)
route.put('/:id', validateRequest, carsControllers.updateCars)
route.delete('/:id', carsControllers.deleteCars)

module.exports = route