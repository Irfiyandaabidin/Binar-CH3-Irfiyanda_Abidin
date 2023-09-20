const reqCars = (req, res) => {

    return {
        plate : req.body.plate,
        manufacture : req.body.manufacture,
        model: req.body.model,
        image: req.body.image,
        rentPerDay: req.body.rentPerDay,
        capacity: req.body.capacity,
        description: req.body.description,
        availableAt: req.body.availableAt,
        transmission: req.body.transmission,
        available: req.body.available,
        type: req.body.type,
        year: req.body.year,
        options: req.body.options,
        specs: req.body.specs
    }
}

module.exports = reqCars