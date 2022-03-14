const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Data base connected');
  } catch (error) {
    console.log('Data base connection failed', error);
  }
};

module.exports = connectDB;
