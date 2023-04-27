const express = require('express')
const router = express.Router()

const org = process.env.ORG

// importing data model schemas
const { clients } = require('../models/models')

// Fetch pie chart data from MongoDB (MOVED FROM APP.JS BY ANDY)
router.get('/piechartData', async (req, res) => {
  try {
    // Fetch data from MongoDB using the Client model
    const clientsData = await clients.find();

    // Calculate the number of clients by zip code
    const clientsByZip = {};
    clientsData.forEach(client => {
      if (client.address.zip in clientsByZip) {
        clientsByZip[client.address.zip] += 1;
      } else {
        clientsByZip[client.address.zip] = 1;
      }
    });

    // Process the data and format for the pie chart
    const piechartData = Object.keys(clientsByZip).map(zip => ({
      zip: zip,
      value: clientsByZip[zip]
    }));

    // Send the data as response
    res.json(piechartData);
  } catch (err) {
    console.error('Failed to fetch pie chart data:', err);
    res.status(500).json({ error: 'Failed to fetch pie chart data' });
  }
});

// GET 10 most recent clients for org
router.get('/', (req, res, next) => {
  clients
    .find({ orgs: org }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        return res.json(data)
      }
    })
    .sort({ updatedAt: -1 })
    .limit(10)
})

// GET single client by ID
router.get('/id/:id', (req, res, next) => {
  // use findOne instead of find to not return array
  clients.findOne({ _id: req.params.id, orgs: org }, (error, data) => {
    if (error) {
      return next(error)
    } else if (!data) {
      res.status(400).send('Client not found')
    } else {
      res.json(data)
    }
  })
})

// GET entries based on search query
// Ex: '...?firstName=Bob&lastName=&searchBy=name'
router.get('/search', (req, res, next) => {
  const dbQuery = { orgs: org }
  switch (req.query.searchBy) {
    case 'name':
      dbQuery.firstName = { $regex: `^${req.query.firstName}`, $options: 'i' }
      dbQuery.lastName = { $regex: `^${req.query.lastName}`, $options: 'i' }
      break
    case 'number':
      dbQuery['phoneNumber.primary'] = {
        $regex: `^${req.query['phoneNumber.primary']}`,
        $options: 'i'
      }
      break
    default:
      return res.status(400).send('invalid searchBy')
  }
  clients.find(dbQuery, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// GET lookup by phone, verify org membership on frontend
router.get('/lookup/:phoneNumber', (req, res, next) => {
  clients.findOne(
    {
      ['phoneNumber.primary']: {
        $regex: `^${req.params.phoneNumber}`,
        $options: 'i'
      }
    },
    (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    }
  )
})

// POST new client
router.post('/', (req, res, next) => {
  const newClient = req.body
  newClient.orgs = [org]
  clients.create(newClient, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// PUT update client
router.put('/update/:id', (req, res, next) => {
  clients.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// PUT add existing client to org
router.put('/register/:id', (req, res, next) => {
  clients.findByIdAndUpdate(
    req.params.id,
    { $push: { orgs: org } },
    (error, data) => {
      if (error) {
        console.log(error)
        return next(error)
      } else {
        res.send('Client registered with org')
      }
    }
  )
})

// PUT remove existing client from org
router.put('/deregister/:id', (req, res, next) => {
  clients.findByIdAndUpdate(
    req.params.id,
    { $pull: { orgs: org } },
    (error, data) => {
      if (error) {
        console.log(error)
        return next(error)
      } else {
        res.send('Client deregistered with org')
      }
    }
  )
})

// hard DELETE client by ID, as per project specifications
router.delete('/:id', (req, res, next) => {
  clients.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else if (!data) {
      res.status(400).send('Client not found')
    } else {
      res.send('Client deleted')
    }
  })
})

module.exports = router
