// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectToMongo = require('./db');
const { models } = require('mongoose');


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectToMongo();

// Middleware
app.use(cors());

app.use((req,res,next)=>{
  res.setHeader("Access-control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin ,x-Requested-With,Content-Type,Accept"
  );
  next();
})
// Sample route

app.use(express.json());
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/myorderData'));
app.use('/api/payment', require('./Routes/payment'));



app.get('/', (req, res) => {
  res.send('🚀 Hello from backend, DB connected!');
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
