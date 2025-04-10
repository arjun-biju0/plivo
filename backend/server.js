const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serviceRoutes = require('./routes/serviceRoutes');
const authRoutes = require('./routes/auth');

require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected"));

app.use('/api/services', serviceRoutes);
app.use('/api/auth', authRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
