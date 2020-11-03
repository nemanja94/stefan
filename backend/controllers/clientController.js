const sanitize = require('mongo-sanitize');
const bcrypt = require('bcryptjs')

const Client = require('../models/Client')

//Returns all clients
exports.getAll = async (req, res) => {
    try {
        const user = await Client.find((error, result) => {
            if (error) throw error

            if (result) {
                return res.status(200).json(result)
            } else {
                return res.status(400).json({ msg: "Client not found" })
            }
        })
    } catch (err) {
        throw err
    }
}

//Returns one client
exports.getOne = async (req, res) => {

    let id = sanitize(req.body.id)
    console.log(`ovo je prosledjen id ${id}`)

    try {
        const user = await Client.findOne({ "_id": id }, (error, result) => {
            if (error) {
                // console.error(error)
                return res.status(404).json({ msg: "Client not found" })
            } else if (result) {
                return res.status(200).json(result)
            }
        })
    } catch (err) {
        console.error(err)
    }
}

//Add one clinet
exports.addOne = async (req, res) => {
    const pass = sanitize(req.body.password)

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return res.status(400).json({ msg: "Mistake in creating salt" })
        } else {
            bcrypt.hash(pass, salt, (err, hash) => {
                if (err) {
                    return res.status(400).json({ msg: "Mistake in creating hash" })
                } else {
                    const client = new Client({
                        firstName: sanitize(req.body.firstName),
                        lastName: sanitize(req.body.lastName),
                        username: sanitize(req.body.username),
                        password: hash,
                        idNumber: sanitize(req.body.idNumber)
                    })

                    try {
                        client.save((error, result) => {
                            if (result) {
                                return res.status(201).json({ msg: "Client added" })
                            } else {
                                return res.status(400).json({ msg: 'Client not added', err: error })
                            }
                        })
                    } catch (err) {
                        throw err
                    }
                }
            });
        }

    });



}

//Update one clinet
exports.updateOne = async (req, res) => {
    const client = {
        firstName: sanitize(req.body.firstName),
        lastName: sanitize(req.body.lastName),
        username: sanitize(req.body.username),
        password: sanitize(req.body.password),
        idNumber: sanitize(req.body.idNumber)
    }

    const id = sanitize(req.query.id)

    try {
        const update = await Client.findOneAndUpdate({ "_id": id }, client, (error, result) => {
            if (error) {
                // console.log(error)
                return res.status(404).json({ msg: "Client not found" })
            } else if (result) {
                return res.status(200).json({ msg: "Client updated" })
            }
        })
    } catch (err) {
        console.log(err)
    }
}

//Delete one client
exports.deleteOne = async (req, res) => {
    const id = sanitize(req.body.id)

    try {
        Client.deleteOne({ "_id": id }, (error, result) => {
            if (error) {
                return res.status(404).json({ msg: "Client not found" })
            } else if (result) {
                return res.status(200).json({ msg: "Client successfully deleted" })
            }
        })
    } catch (err) {
        console.err(err)
    }

}

//Login client
exports.login = async (req, res) => {
    const username = sanitize(req.body.username)
    const pass = sanitize(req.body.password)

    try {
        //Check doses user exist
        const client = await Client.findOne({ 'username': username }, (error, result) => {
            if (error) {
                return res.status(404).json({ msg: "Client not foudn" })
            } else if (result) {
                //Check does pass matches
                bcrypt.compare(pass, result.password, function (err, res) {
                    if (err) {
                        return res.status(400).json({ msg: "Error in comparing pass" })
                    } else if (res) {
                        return res.send(result)
                    }
                });
            }
        })
    } catch (err) {
        console.error(err)
    }

    bcrypt.compare()
}
