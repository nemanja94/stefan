const express = require('express')
const router = express.Router()

const interventionController = require('../controllers/interventionController')

router.get('/', interventionController.getAll) //Return all clients
router.post('/getOne', interventionController.getOne) //Returns one clinet 
router.post('/getClientsByName', interventionController.getInterventionsByName) //Returns one clinet 
router.post('/addOne', interventionController.addOne) //Add one client
router.put('/updateOne', interventionController.updateOne) //Updates one clinet
router.delete('/deleteOne', interventionController.deleteOne) //Deletes one clinet

module.exports = router