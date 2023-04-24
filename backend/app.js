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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

// Define a schema for your pie chart data
const clientSchema = new mongoose.Schema({
  address: String,
  zip: String
});

// Define a schema for events collection
const eventSchema = new mongoose.Schema({
  eventName: String,
  eventDate: String,
  numberOfAttendees: Number
});

// const eventSchema = new mongoose.Schema({
//   eventName: String,
//   eventDate: String,
//   numberOfAttendees: Number
// });

// Create a model for clients collection
const Client = mongoose.model('Client', clientSchema);

// Create a model for events collection
const Event = mongoose.model('Event', eventSchema);

// Fetch pie chart data from MongoDB
app.get('/api/piechartData', async (req, res) => {
  try {
    // Fetch data from MongoDB using the Client model
    const clients = await Client.find();

    // Process the data and format it as needed for piechart
    const piechartData = clients.map(client => ({
      label: client.address,
      value: client.zip
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

    // Process the data and format it as needed for barchart
    const barchartData = events.map(event => ({
      label: event.eventName,
      date: event.eventDate,
      value: event.numberOfAttendees
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
