const mongoose = require('mongoose');

const getDBConnection = async () =>
  await mongoose
    .connect(
      'mongodb+srv://sudhanshu:sud123@cluster0-7wmuj.mongodb.net/test?retryWrites=true&w=majority',
      {
        useNewUrlParser: true
      }
    )
    .then(() => console.log('connected to mongoDB...'))
    .catch(err => {
      console.error('could not connect to mongoDB...', err);
      return err;
    });

module.exports = { getDBConnection };
