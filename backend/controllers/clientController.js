const sanitize = require('mongo-sanitize');
const bcrypt = require('bcryptjs')

const Client = require('../models/Client')

//Returns all clients
exports.getAll = async (req, res) => {
    try {
        const user = await Client.find((error, result) => {
            if (error) {
                return res.status(400).json({ msg: "Error with database" })
            }

            if (result) {
                return res.status(200).json(result)
            } else {
                return res.status(400).json({ msg: "Clients not found" })
            }
        })
    } catch (err) {
        throw err
    }
}

//Returns one client
exports.getOne = async (req, res) => {

    let id = sanitize(req.body.id)

    try {
        const user = await Client.findOne({ "_id": id }, (error, result) => {
            if (error) {
                return res.status(404).json({ msg: "Client not found" })
            } else if (result) {
                return res.status(200).json(result)
            }
        })
    } catch (err) {
        console.error(err)
    }
}

//Returns clients - by name
exports.getClientsByName = async (req, res) => {

    let firstName = sanitize(req.body.firstName)

    try {
        const user = await Client.find({ "firstName": firstName }, (error, result) => {
            if (error) {
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
    const { firstName, lastName, idNumber } = sanitize(req.body)

    if (!firstName || !lastName || !idNumber) {
        return res.status(200).json({ msg: "Fill all fields" })
    }

    //Check if client exist
    Client.findOne({ 'idNumber': idNumber }, async (error, result) => {
        if (error) {
            return res.status(400).json({ msg: "Problem with database", error: error, res: result })
        }

        //If exist
        if (result) {
            return res.status(200).json({ msg: "Client is already registred" })
        }

        const client = new Client({
            firstName: firstName,
            lastName: lastName,
            idNumber: idNumber
        })

        try {
            await client.save((error, result) => {
                if (error) {
                    return res.status(400).json({ msg: 'Client not added', error: error })
                }

                return res.status(201).json({ msg: result })
            })
        } catch (err) {
            throw err
        }
    })
}

//Update one clinet
exports.updateOne = async (req, res) => {

    const { firstName, lastName, idNumber, id } = sanitize(req.body)

    if (!firstName || !lastName || !idNumber) {
        return res.status(200).json({ msg: "Fill all fields" })
    }

    const client = {
        firstName: firstName,
        lastName: lastName,
        idNumber: idNumber
    }

    // const id = sanitize(req.query.id)

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
        await Client.deleteOne({ "_id": id }, (error, result) => {
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
    const { username, password } = sanitize(req.body)

    try {
        //Check if user exist
        const client = await Client.findOne({ 'username': username }, (error, result) => {
            if (error) {
                return res.status(404).json({ msg: "Client not found" })
            }

            bcrypt.compare(password, result.password, async (error, isMatch) => {
                if (error) {
                    return res.status(400).json({ msg: "Problem with bcrypt" })
                }

                if (isMatch) {
                    await Client.find({ username: username, password: password }, (error, result) => {
                        if (error) {
                            return res.status(400).json({ msg: "Problem with mogooe" })
                        }

                        if (result) {
                            return res.status(200).json({ msg: "Logedin" })
                        }
                    })
                } else {
                    return res.status(200).json({ msg: "Pasword incorect" })
                }
            })
        })
    } catch (err) {
        console.error(err)
    }
}
