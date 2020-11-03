const express = require('express')
const router = express.Router()

const clientController = require('../controllers/clientController')

router.get('/', clientController.getAll) //Return all clients
router.post('/getOne', clientController.getOne) //Returns one clinet 
router.post('/addOne', clientController.addOne) //Add one client
router.put('/updateOne', clientController.updateOne) //Updates one clinet
router.delete('/deleteOne', clientController.deleteOne) //Deletes one clinet
router.post('/login', clientController.login)//Logs in client

module.exports = router