const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const PORT = 3000;
const carsRoute = require('./src/routes/cars-route')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/v1/api/cars', carsRoute)
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Ping Successfully!"
    })
})

app.listen(PORT, () => {
    console.log(`Server running in ${PORT}`)
})