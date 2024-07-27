// // express config
// const express = require('express');
// const app = express();

// // mongoose config
// const mongoose = require("mongoose");

// // dotenv config
// require('dotenv').config();

// // middleware to parse json bodies
// app.use(express.json());

// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

// //middleware to use error handler
// const errorHandler = require('./middlewares/expressError.js');

// //using global error handler
// app.use(errorHandler);

// // routes
// const companyRoutes = require("./routes/companyRoutes.js")
// const stockRoutes = require("./routes/stockRoutes.js")
// const authRoutes = require("./routes/authRoutes.js");

// // base route
// app.get("/", (req, res) => {
//   res.json('/ route here');
// });

// // use routes
// app.use("/api/auth", authRoutes);
// app.use("/api/dashboard/companies", companyRoutes);
// app.use("/api/dashboard/companies/:companyId/stocks", stockRoutes);

// // connection string
// mongoose.connect(process.env.MONGO_URI).then(() => {
//   app.listen(process.env.PORT, () => {
//     console.log(
//       `Connected to DB and running on port https://localhost:${process.env.PORT}/`
//     );
//   });
// });

//express config
const express = require('express');
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
app.use(express.json());

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

// Base route
app.get("/", (req, res) => {
  res.json('/ route here');
});

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard/companies", companyRoutes);
app.use("/api/dashboard/companies/data", dataRoutes);
app.use("/api/dashboard/companies/:companyId/stocks", stockRoutes);

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Connected to DB and running on port http://localhost:${process.env.PORT}/`);
  });
});
