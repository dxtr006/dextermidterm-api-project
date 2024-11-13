require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const componentRoutes = require('./routes/componentRoutes');
//const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/components', componentRoutes);
//app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// to start just use node app.js in the command line and then open postman and use http://localhost:5003/api/ and then what ever you want to test 


/* 

ex Create Component: 
POST http://localhost:5003/api/components
Body (JSON): { "name": "Resistor", "quantity": 100, "description": "1k Ohm resistor", "location": "Bin A3" }

*/