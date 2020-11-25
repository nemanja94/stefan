const sanitize = require('mongo-sanitize');
const bcrypt = require('bcryptjs')

const Intervention = require('../models/Intervention')

//Returns all intervention
exports.getAll = async (req, res) => {
    try {
        const intervention = await Intervention.find((error, result) => {
            if (error) {
                return res.status(400).json({ msg: "Error with database" })
            }

            if (result) {
                return res.status(200).json(result)
            } else {
                return res.status(400).json({ msg: "Interventions not found" })
            }
        })
    } catch (err) {
        throw err
    }
}

//Returns one intervention
exports.getOne = async (req, res) => {

    let id = sanitize(req.body.id)

    try {
        const intervention = await Intervention.findOne({ "_id": id }, (error, result) => {
            if (error) {
                return res.status(404).json({ msg: "Intevention not found" })
            } else if (result) {
                return res.status(200).json(result)
            }
        })
    } catch (err) {
        console.error(err)
    }
}

//Returns interventons - by name
exports.getInterventionsByName = async (req, res) => {

    let intervention = sanitize(req.body.intervention)

    try {
        const intervention = await Intervention.find({ "intervention": intervention }, (error, result) => {
            if (error) {
                return res.status(404).json({ msg: "Intervention not found" })
            } else if (result) {
                return res.status(200).json(result)
            }
        })
    } catch (err) {
        console.error(err)
    }
}

//Add one intervention
exports.addOne = async (req, res) => {
    const { carId, clientId, intervention, description, price } = sanitize(req.body)

    if (!carId || !clientId || !intervention) {
        return res.status(200).json({ msg: "Fill intervention name" })
    }

    const interventionn = new Intervention({
        carId: carId,
        clientId: clientId,
        intervention: intervention,
        description: description,
        price: price
    })

    try {
        await interventionn.save((error, result) => {
            if (error) {
                return res.status(400).json({ msg: 'Intervention not added', error: error })
            }

            return res.status(201).json({ msg: result })
        })
    } catch (err) {
        throw err
    }
}

//Update one intervention
exports.updateOne = async (req, res) => {

    const { carId, intervention, description, price } = sanitize(req.body)

    if (!intervention) {
        return res.status(200).json({ msg: "Fill intervention name" })
    }

    const interventionn = {
        carId: carId,
        intervention: intervention,
        description: description,
        price: price
    }

    const id = sanitize(req.query.id)

    try {
        const update = await Intervention.findOneAndUpdate({ "_id": id }, interventionn, (error, result) => {
            if (error) {
                // console.log(error)
                return res.status(404).json({ msg: "Intervention not found" })
            } else if (result) {
                return res.status(200).json({ msg: "Intervention updated" })
            }
        })
    } catch (err) {
        console.log(err)
    }
}

//Delete one intervention
exports.deleteOne = async (req, res) => {
    const id = sanitize(req.body.id)

    try {
        await Intervention.deleteOne({ "_id": id }, (error, result) => {
            if (error) {
                return res.status(404).json({ msg: "Intervention not found" })
            } else if (result) {
                return res.status(200).json({ msg: "Intervention successfully deleted" })
            }
        })
    } catch (err) {
        console.err(err)
    }

}