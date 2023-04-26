const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let servicesSchema = new Schema({
    serviceNumber: {
      type: Number,
      required: true,
      unique: true
    },
    serviceName: {
      type: String
    },
    serviceStatus: {
        type: Boolean,
        default:true 
      },
    serviceDescription: {
      type: String
    }
  }, {
    collection: 'Services'
  });
  
  module.exports = mongoose.model('ServicesModel', servicesSchema)