if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require('express');
const app = express();
const mongoose = require("mongoose");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/userSchema.js");

// to delete
const path = require("path");
const methodOverride = require("method-override");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(methodOverride("_method"));


const company = require("./routes/company.js")
const stock = require("./routes/stock.js")
const userRouter = require("./routes/user.js");


const DatabaseURL = process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });
    async function main() {
        await mongoose.connect(DatabaseURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // 30 seconds
            connectTimeoutMS: 30000,         // 30 seconds
        });
    }

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const store = MongoStore.create({
//     mongoUrl: DatabaseURL,
//     crypto: {
//         secret: process.env.SECRET,
//     },
//     touchAfter: 24 * 3600,
// });

// store.on("error" , ()=>{
//     console.log("Error in MONGO Session Store" , err);
// });

const sessionOptions = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/api/companies/:id/stocks", stock);
app.use("/api/companies", company);
app.use("/", userRouter);


app.listen(process.env.PORT, () => {
    console.log(`server is listening to port ${process.env.PORT}`);
});