const mongoose = require('mongoose')

const InterventionSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true
    },
    carId: {
        type: String,
        required: true
    },
    intervention: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Intervention = mongoose.model('Intervention', InterventionSchema);

module.exports = Intervention;