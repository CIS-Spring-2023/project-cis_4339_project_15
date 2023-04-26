const express = require("express");
const router = express.Router();

//importing data model
const ServiceModel = require("../models/services");

// List of all services
router.get('/', (req, res, next) => {
    //very plain way to get all the data from the collection through the mongoose schema
    ServiceModel.find((error, data) => {
        if (error) {
            //here we are using a call to next() to send an error message back
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Find service by Name
router.get('/by-name/:name', async (req, res) => {
    const { name } = req.params;
    try {
      const service = await ServiceModel.findOne({ serviceName: name });
  
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving service', error });
    }
  });

// Find service by Number
router.get('/by-number/:number', async (req, res) => {
    const { number } = req.params;
  
    try {
      const service = await ServiceModel.findOne({ serviceNumber: number });
  
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving service', error });
    }
  });
  

// POST route to create a new service
router.post('/', async (req, res) => {
    try {
      const newService = new ServiceModel(req.body);
      await newService.save();
      res.status(201).json({ message: 'Service created successfully', data: newService });
    } catch (error) {
      res.status(400).json({ message: 'Error creating service', error });
    }
  });
  
  // PUT route to edit an existing service by ID
  router.put('/:id', async (req, res) => {
    try {
      const updatedService = await ServiceModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      if (!updatedService) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      res.status(200).json({ message: 'Service updated successfully', data: updatedService });
    } catch (error) {
      res.status(400).json({ message: 'Error updating service', error });
    }
  });


module.exports = router;