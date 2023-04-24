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
  



//GET read endpoint to use a query papermeter studentID or for all student entries
// router.get('/', (req, res, next) => {
//     //checking whether a query parameter is used in the request
//     if (req.query.serviceNumber) {
//         ServiceModel.findOne({ serviceNumber: req.query.serviceNumber }, (error, data) => {
//             if (error) {
//                 return next(error)
//             } else if (data === null) {
//                 // Sending 404 when not found something is a good practice
//                 res.status(404).send('Service not found');
//             }
//             else {
//                 res.json(data)
//             }
//         });
//     } else {
//         //very plain way to get all the data from the collection through the mongoose schema
//         ServiceModel.find((error, data) => {
//             if (error) {
//                 //here we are using a call to next() to send an error message back
//                 return next(error)
//             } else {
//                 res.json(data)
//             }
//         })
//     }
// });

// //POST create endpoint for a student document
// router.post('/', (req, res, next) => {
//     ServiceModel.create(req.body, (error, data) => {
//         if (error) {
//             return next(error)
//         } else {
//             res.send('Student is added to the database');
//         }
//     });
// });

// //GET endpoint for retrieving student by _id
// router.get('/:id', (req, res, next) => {
//     ServiceModel.findOne({ _id: req.params.id }, (error, data) => {
//         if (error) {
//             return next(error)
//         } else if (data === null) {
//             // Sending 404 when not found something is a good practice
//             res.status(404).send('Student not found');
//         }
//         else {
//             res.json(data)
//         }
//     });
// });

// //PUT Updating - editing a student
// router.put('/:id', (req, res, next) => {
//     ServiceModel.findOneAndUpdate({ _id: req.params.id }, {
//         $set: req.body
//     }, (error, data) => {
//         if (error) {
//             return next(error);
//         } else {
//             res.send('Student is edited via PUT');
//             console.log('Student successfully updated!', data)
//         }
//     })
// });

// //DELETE student by _id
// router.delete('/:id', (req, res, next) => {
//     //mongoose will use _id of document
//     ServiceModel.findOneAndRemove({ _id: req.params.id }, (error, data) => {
//         if (error) {
//             return next(error);
//         } else {
//             res.status(200).json({
//                 msg: data
//             });
//             //  res.send('Student is deleted');
//         }
//     });
// });

module.exports = router;