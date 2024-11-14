const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config();

const app = express();

//Instantiate DB
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

//Middleware
app.use(express.json());

//Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const componentRoutes = require('./routes/componentRoutes');
app.use('/api/components', componentRoutes);

//Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;