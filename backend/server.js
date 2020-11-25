const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const bodyParser = require('body-parser')

const connectDB = require('./config/db')
const clientRoutes = require('./routes/clientRoutes')
const carRoutes = require('./routes/carRoutes')
const interventionRoutes = require('./routes/interventionRoutes')

//Load custom config
dotenv.config({ path: './config/config.env' })

//Create connection with database
connectDB()

//Create server
const app = express()

//json
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE"
    );
    next();
});

//Static folder
app.use(express.static(path.join(__dirname, 'assets')))

//Routes
app.use('/api/client', clientRoutes)
app.use('/api/car', carRoutes)
app.use('/api/intervention', interventionRoutes)

//Run server
const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server running on port ${PORT}`))
