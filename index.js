const express = require("express");
const { connectToMongoDb } = require("./connect");
const path = require("path");
const URL = require("./model/url");
const cookieParse = require('cookie-parser')


const urlRoute = require("./router/url");
const StaticRouter = require("./router/staticRouter");
const userRouter = require("./router/user");

//middleware 
const {restricttologgedinUserOnly, checkAuth}= require('./middlewares/auth')

const app = express();
const PORT = 8001;

connectToMongoDb("mongodb://127.0.0.1:27017/short-url")
  .then(() => {
    console.log("DataBase Connect ");
  })
  .catch((err) => {
    console.log(`error ouccered ${err}`);
  });

// changing the engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


// for transfering the data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParse())

// use 
app.use("/url",restricttologgedinUserOnly, urlRoute);
app.use("/",checkAuth, StaticRouter);
app.use("/user", userRouter);



// Get for test 
app.get("/test", async (req, res) => {
  const AllUrl = await URL.find({});

  return res.render("Home", {
    urls: AllUrl,
  });
});

app.listen(PORT, () => console.log(`sever Connected :${PORT}`));
