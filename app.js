require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const componentRoutes = require('./routes/componentRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Component API routes
app.use('/api/components', componentRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/* 
Example usage with Postman:
Create Component: 
POST http://localhost:5003/api/components
Body (JSON): { "name": "Resistor", "quantity": 100, "description": "1k Ohm resistor", "location": "Bin A3" }
*/
