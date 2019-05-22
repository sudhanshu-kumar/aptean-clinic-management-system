const mongoose = require('mongoose');

const getDBConnection = async () => await mongoose.connect('mongodb://localhost/clinicdb', {
  useNewUrlParser: true,
})
  .then(() => console.log('connected to mongoDB...'))
  .catch(err => console.error('could not connect to mongoDB...', err));

module.exports = { getDBConnection };
