const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    clientID: {
        type: String,
        required: true
    },
    maker: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    manufactYear: {
        type: String,
        required: false
    },
    regNumber: {
        type: String,
        required: true
    },
    engineNumber: {
        type: String,
        required: false
    },
    chasNumber: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Car = mongoose.model('Car', carSchema);

module.exports = Car;