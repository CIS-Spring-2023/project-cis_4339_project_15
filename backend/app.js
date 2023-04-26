const express = require('express')
const mongoose = require('mongoose') //require mongoose library functionaility
const morgan = require('morgan') // better debugging

const cors = require('cors')
// allow using a .env file
require('dotenv').config() //require the dotenv

// creates a new instance of express application
const app = express()

// add cors header to the server
app.use(
  cors({
    origin: '*'
  })
)

// sets up mongoose for the mongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Database connection Success!')
  })
  .catch((err) => {
    console.error('Mongo Connection Error', err)
  })

// declare port number for the api
const PORT = process.env.PORT || 3000

// setup and access request body
app.use(express.json())
app.use(morgan('dev'))

// setup middle ware for routes
app.use('/clients', require('./routes/clients'))
app.use('/events', require('./routes/events'))
app.use('/org', require('./routes/org'))
app.use('/services', require('./routes/services'))
app.use('/user', require('./routes/user'))


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

// Define a schema for pie chart data
const clientSchema = new mongoose.Schema({
  address: {
    line1: String,
    line2: String,
    city: String,
    county: String,
    zip: String
  }
}, {
  collection: 'client'
});

// Define a schema for event collection
const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  attendees: {
    type: [String]
  }
}, {
  collection: 'event'
});


// Create a model for client collection
const Client = mongoose.model('Client', clientSchema);

// Create a model for event collection
const Event = mongoose.model('Event', eventSchema);

// Fetch pie chart data from MongoDB
app.get('/api/piechartData', async (req, res) => {
  try {
    // Fetch data from MongoDB using the Client model
    const clients = await Client.find();

    // Calculate the number of clients by zip code
    const clientsByZip = {};
    clients.forEach(client => {
      if (client.address.zip in clientsByZip) {
        clientsByZip[client.address.zip] += 1;
      } else {
        clientsByZip[client.address.zip] = 1;
      }
    });

    // Process the data and format for the pie chart
    const piechartData = Object.keys(clientsByZip).map(zip => ({
      label: zip,
      value: clientsByZip[zip]
    }));

    // Send the data as response
    res.json(piechartData);
  } catch (err) {
    console.error('Failed to fetch pie chart data:', err);
    res.status(500).json({ error: 'Failed to fetch pie chart data' });
  }
});


// Fetch data from MongoDB
app.get('/api/barchartData', async (req, res) => {
  try {
    // Fetch data from MongoDB using the Event model
    const events = await Event.find();

    // Process the data and format for the barchart
    const barchartData = events.map(event => ({
      label: event.name,
      date: event.date,
      value: event.attendees.length
    }));

    // Send the data as response
    res.json(barchartData);
  } catch (err) {
    console.error('Failed to fetch chart data:', err);
    res.status(500).json({ error: 'Failed to fetch chart data' });
  }
});

// error handler
app.use(function (err, req, res, next) {
  // logs error and error code to console
  console.error(err.message, req)
  if (!err.statusCode) {
    err.statusCode = 500
  }
  res.status(err.statusCode).send(err.message)
})
