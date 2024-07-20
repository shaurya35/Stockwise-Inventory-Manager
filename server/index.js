const express = require("express");
const mongoose = require("mongoose");
const app = express();
const company = require("./routes/company.js")
const stock = require("./routes/stock.js")
require('dotenv').config()

// to delete
const path = require("path");
const methodOverride = require("method-override");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Logger Middleware
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
app.use("/api/companies", company);
app.use("/api/companies/:id/stocks", stock);

const MONGO_URI = "mongodb://127.0.0.1:27017/stocks";
main()
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URI);
}

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port : ${process.env.PORT}`);
});
