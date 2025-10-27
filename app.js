if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");



const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const ExpressError = require("./utils/ExpressError.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const { serialize } = require("v8");
const wrapAsync = require('./utils/wrapAsync.js');


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));



// const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
const dbUrl = process.env.ATLASDB_URL;
main().then(() => {
    console.log("connected to DB");
    
}).catch(err => {
    console.log("err:", err);
})

async function main() {
    await mongoose.connect(dbUrl);
}


const store= MongoStore.create({
    mongoUrl:dbUrl,
    crypto: {
    secret:  process.env.SECRET,
  },
    touchAfter: 24 * 3600 
});

store.on("error",()=>{
    console.log("Error In Mongo Session Store");
})

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}


app.get("/", wrapAsync((req, res) => {
   res.redirect("/listings");
}))

app.use(session(sessionOptions));
app.use(flash());

//initialize pS middleware
app.use(passport.initialize());
//maintain same user acroess multiple route
app.use(passport.session());

//veriify user usinng ps local stretegy
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); //put user info into session after login,means 
// we tell session that this session is for user-1xxxx


passport.deserializeUser(User.deserializeUser()); //fetch full mongodb user info & put it into req.user during next new req

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
   
    next();
})



app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);




app.all(/.*/, (req, res, next) => {
    next(new ExpressError(400, "Page Not Found"));
});



app.use((err, req, res, next) => {
    // res.send("Oops there is an Errror");
    let { statusCode = 500, message = "Something Went Wrong" } = err;
    res.status(statusCode).render("error.ejs", { message });
})

app.listen(8080, () => {
    console.log(`app is listening on port : 8080`);
})