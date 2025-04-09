// server.js
const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const actorRoutes = require('./routes/actorRoutes');
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes'); 
const path = require('path');

dotenv.config();
connectDB();
console.log('Database Connected successfully')

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/actors', actorRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
