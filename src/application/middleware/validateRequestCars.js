const resBase = require('../res/resCars')

const validateRequest = (req, res, next) => {
    if (!req.body.plate || !req.body.manufacture) {
        const response = resBase.resBaseError(400, "Plate and manufacture are required fields.", true)
        return res.status(400).json(response);
    }
    return next()
};

module.exports = validateRequest