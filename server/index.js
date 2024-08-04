//express config
const express = require('express');
const mongoose = require("mongoose");
// const cors = require('cors');
require('dotenv').config();

//express parse
const app = express();
app.use(express.json());

//use CORS middleware
// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

//global error handler
const errorHandler = require('./middlewares/ExpressError.js');

// Log all requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
const companyRoutes = require("./routes/companyRoutes.js");
const stockRoutes = require("./routes/stockRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const dataRoutes = require("./routes/dataRoutes.js");
const predictionRoutes = require("./routes/predictionRoutes.js");
const whatsappRoutes = require("./routes/chatRoutes.js");

// Base route
app.get("/", (req, res) => {
  res.json('/ route here');
});

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard/companies", companyRoutes);
app.use("/api/dashboard/companies/data", dataRoutes);
app.use("/api/dashboard/companies/prediction", predictionRoutes);
app.use("/api/dashboard/companies/chat", whatsappRoutes);
app.use("/api/dashboard/companies/:companyId/stocks", stockRoutes);

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Connected to DB and running on port http://localhost:${process.env.PORT}/`);
  });
});
