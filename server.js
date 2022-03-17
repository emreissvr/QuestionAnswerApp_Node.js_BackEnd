const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./helpers/database/connectDatabase")
const customErrorHandler = require("./middlewares/errors/customErrorHandler");
const routers = require("./routers");
const path = require("path");

// Environment Variables
dotenv.config({
    path:"./config/env/config.env"
})

const app = express();

// Express - body Middleware --> önceden bodyParser() ile yapılıyordu fakat şimdi gelen request'i direkt json'a çeviriyoruz
app.use(express.json());

const PORT =  process.env.PORT;


// routers Middleware
app.use("/api",routers);

// MongoDb Connection
connectDatabase();

// Error Handler
app.use(customErrorHandler);

// static files 

app.use(express.static(path.join(__dirname,"public")))



app.listen(PORT,() => {
    console.log(`App started on ${PORT} : ${process.env.NODE_ENV}`);
})