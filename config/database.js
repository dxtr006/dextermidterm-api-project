// config for connecting to the database I set up on atlas

// side note idk if you guys can accsess that from this? I would think you can since it has the .env file that connects it to the database so it "should" work 

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => console.log('Database connected'));
mongoose.connection.on('error', (err) => console.log('Database connection error:', err));

module.exports = mongoose;