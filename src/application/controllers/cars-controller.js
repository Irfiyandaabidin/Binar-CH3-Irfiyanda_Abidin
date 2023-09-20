// new data test
// {
//     "plate": "XYZ-1234",
//     "manufacture": "Toyota",
//     "model": "Camry",
//     "image": "./images/car02.min.jpg",
//     "rentPerDay": 250000,
//     "capacity": 4,
//     "description": "Spacious sedan with advanced safety features and comfortable interior.",
//     "availableAt": "2023-06-15T10:30:00.000Z",
//     "transmission": "Automatic",
//     "available": true,
//     "type": "Sedan",
//     "year": 2023,
//     "options": [
//         "Cruise Control",
//         "Tinted Glass",
//         "AM/FM Stereo",
//         "Bluetooth Connectivity",
//         "Navigation System"
//     ],
//     "specs": [
//         "Advanced safety features",
//         "Leather seats",
//         "Dual-zone climate control",
//         "Keyless entry",
//         "Rearview camera",
//         "Anti-lock brakes"
//     ]
// }


const uuid = require('uuid');
const path = require('path')
// const data = require('../../../database/database.json')
const fs = require('fs');
const responseBase = require('../res/resCars')
const databasePath = path.join(__dirname, '../../../database/database.json');
const reqCars = require('../req/reqCars')

const readData = () => {
    const data = fs.readFileSync(databasePath, 'utf-8')
    const dataJson = JSON.parse(data);
    return dataJson
}

const getAll = (req, res) => {
    try {
        const dataJson = readData()
        const response = responseBase.resBase(200, "Get data successfully", dataJson)
        res.status(200).json(response)
    } catch (e) {
        const response = responseBase.resBaseError(500, "Get data failed", e.message)
        return response
    }
}

const getById = (req, res) => {
    try {
        const dataJson = readData()
        const carsById = dataJson.find((e) => e.id == req.params.id)
        if(carsById) {
            const response = responseBase.resBase(200, "Get data successfully", carsById)
            return res.status(200).json(response)
        }
        const response = responseBase.resBase(404, "Id not found", null)
        return res.status(404).json(response)
    } catch (e) {
        return responseBase.resBaseError(500, "Get data by id failed", e.message)
    }
}

const addCars = (req, res) => {
    try {
        const requestCars = reqCars(req, res);

        const newCars = {
            id: uuid.v4(),
            requestCars  
        }
        const dataJson = readData()
        dataJson.push(newCars)
        fs.writeFile(databasePath, JSON.stringify(dataJson), err => {
            const response = responseBase.resBase(201, "add data successfully", newCars)
            res.status(201).json(response)
        });
    } catch (e) {
        const response = responseBase.resBaseError(500, "add data failed", e.message)
        return response 
    }
}

const updateCars = (req, res) => {
    try {
        const requestCars = reqCars(req);

        const id = req.params.id

        const updateData = {
            id,
            requestCars
        }
        const dataJson = readData()
        const findById = dataJson.findIndex((e) => e.id === id)
        if(findById == -1){
            const response = responseBase.resBase(404, "Id not found", null)
            res.status(404).json(response)
        }
        dataJson[findById] = updateData
        fs.writeFile(databasePath, JSON.stringify(dataJson), err => {
            const response = responseBase.resBase(200, `Update Id ${id} successfully`, data = updateData)
            res.status(200).json(response)
        })
    } catch (e) {
        const response = responseBase.resBaseError(500, "Update data failed", e.message)
        return res.status(500).json(response)
    } 
}

const deleteCars = (req, res) => {
    try {
        const id = req.params.id;
        const allData = readData();
        const indexCar = allData.findIndex(car => car.id === id)
        if(indexCar == -1){
            const response = responseBase.resBase(404, "Id not found", null)
            return res.status(404).json(response)
        }
        allData.splice(indexCar, 1)
        fs.writeFile(databasePath, JSON.stringify(allData), err => {
            const response = responseBase.resBase(200, `Delete Id ${id} successfully`, null, null)
            res.status(200).json(response)
        })
    } catch(e) {
        const response = responseBase.resBaseError(500, "Delete data failed", e.message)
        return res.status(500).json(response)
    }
}

module.exports = {
    getAll,
    getById,
    addCars,
    updateCars,
    deleteCars
}
