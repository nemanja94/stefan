const express = require('express')
const router = express.Router()

const carController = require('../controllers/carController')

router.get('/', carController.getAll) //Return all clients
router.post('/getOne', carController.getOne) //Returns one clinet 
router.post('/getCarsByOwner', carController.getCarByOwner) //Returns one clinet 
router.post('/addOne', carController.addOne) //Add one client
router.put('/updateOne', carController.updateOne) //Updates one clinet
router.delete('/deleteOne', carController.deleteOne) //Deletes one clinet

module.exports = router