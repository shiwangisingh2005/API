const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/preparationdb'
  
)
.then(() => {
  console.log('MongoDB database connection established successfully');
})
.catch(err => {
  console.error('MongoDB connection error:', err.message);
});

// Define a mongoose schema for user
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  email: String,
  password: String
});

// Create a mongoose model based on the schema
const User = mongoose.model('User', userSchema);

// POST route for creating a new user
app.post('/api/users', (req, res) => {
  // Assuming your server expects JSON data with 'name', 'email', 'password'
  const { name, email, password } = req.body;

  // Example: Save user data to database
  const newUser = new User({ name, email, password });
  newUser.save()
    .then(() => {
      res.status(201).json({ message: 'User created successfully', name, email });
    })
    .catch(err => {
      console.error('Error saving user to database:', err.message);
      res.status(500).json({ error: 'Failed to create user' });
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
