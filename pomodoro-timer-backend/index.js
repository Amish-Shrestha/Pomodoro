const connection = require('./db');
const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRoutes/authRoutes');
const cors = require('cors');


const app = express();
const port = 5000;

// Set up CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST'],         // Allow only these methods
  allowedHeaders: ['Content-Type'], // Allow only these headers
  credentials: true                 // Allow sending cookies with the request
};

app.use(cors());  


 
connection.connect(err => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(bodyParser.json());

app.use('/api/', authRouter)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
