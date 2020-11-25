const sanitize = require('mongo-sanitize');
const bcrypt = require('bcryptjs')

const Car = require('../models/Car')

//Returns all Cars
exports.getAll = async (req, res) => {
    try {
        await Car.find((error, result) => {
            if (error) {
                return res.status(400).json({ msg: "Error with database" })
            }

            if (result) {
                return res.status(200).json(result)
            } else {
                return res.status(400).json({ msg: "Cars not found" })
            }
        })
    } catch (err) {
        throw err
    }
}

//Returns one Car
exports.getOne = async (req, res) => {

    let id = sanitize(req.body.id)

    try {
        const car = await Car.findOne({ "_id": id }, (error, result) => {
            if (error) {
                return res.status(404).json({ msg: "Car not found" })
            } else if (result) {
                return res.status(200).json(result)
            }
        })
    } catch (err) {
        console.error(err)
    }
}

//Returns Cars - by model
exports.getCarByOwner = async (req, res) => {

    let clientID = sanitize(req.body.clientID)

    try {
        const car = await Car.find({ "clientID": clientID }, (error, result) => {
            if (error) {
                return res.status(404).json({ msg: "Car not found" })
            } else if (result) {
                return res.status(200).json(result)
            }
        })
    } catch (err) {
        console.error(err)
    }
}

//Add one Car
exports.addOne = async (req, res) => {
    const { clientID, maker, model, manufactYear, regNumber, engineNumber, chasNumber, description } = sanitize(req.body)

    if (!clientID || !maker || !model || !regNumber) {
        return res.status(200).json({ msg: "Fill all fields" })
    }

    const car = new Car({
        clientID: clientID,
        maker: maker,
        model: model,
        manufactYear: manufactYear,
        regNumber: regNumber,
        engineNumber: engineNumber,
        chasNumber: chasNumber,
        description: description
    })

    try {
        await car.save((error, result) => {
            if (error) {
                return res.status(400).json({ msg: 'Car not added', error: error })
            }

            return res.status(201).json({ msg: result })
        })
    } catch (err) {
        throw err
    }
}

//Update one intervention
exports.updateOne = async (req, res) => {

    const { clientID, maker, model, manufactYear, regNumber, engineNumber, chasNumber, description } = sanitize(req.body)

    if (!clientID || !maker || !model || !regNumber) {
        return res.status(200).json({ msg: "Fill all fields" })
    }

    const car = {
        clientID: clientID,
        maker: maker,
        model: model,
        manufactYear: manufactYear,
        regNumber: regNumber,
        engineNumber: engineNumber,
        chasNumber: chasNumber,
        description: description
    }

    const id = sanitize(req.query.id)

    try {
        const update = await Car.findOneAndUpdate({ "_id": id }, car, (error, result) => {
            if (error) {
                // console.log(error)
                return res.status(404).json({ msg: "Car not found" })
            } else if (result) {
                return res.status(200).json({ msg: "Car updated" })
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
        await Car.deleteOne({ "_id": id }, (error, result) => {
            if (error) {
                return res.status(404).json({ msg: "Car not found" })
            } else if (result) {
                return res.status(200).json({ msg: "Car successfully deleted" })
            }
        })
    } catch (err) {
        console.err(err)
    }

}