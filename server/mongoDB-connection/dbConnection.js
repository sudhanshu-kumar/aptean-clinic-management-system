const mongoose = require('mongoose');

const getDBConnection = async () => await mongoose.connect('mongodb+srv://sudhana:sudhana123@cluster0-n2q25.mongodb.net/clinicdb?retryWrites=true', {
  useNewUrlParser: true,
})
  .then(() => console.log('connected to mongoDB...'))
  .catch(err => console.error('could not connect to mongoDB...', err));

module.exports = { getDBConnection };
