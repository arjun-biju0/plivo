const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serviceRoutes = require('./routes/serviceRoutes');
const authRoutes = require('./routes/auth');
const publicRoutes = require('./routes/public');
const incidentRoutes=require('./routes/incident')
const {initSocket}= require('./socket')
const http = require("http");

require('dotenv').config();
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() =>{
    initSocket(server);
    console.log("MongoDB Connected");
    
})

app.use('/api/services', serviceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', publicRoutes);
app.use('/api/incidents', incidentRoutes);

server.listen(5000, () => console.log("Server running on port 5000"));
