const express = require('express');
const connection = require('./db');
const UserRounter = require('./Routes/user.Routes');
const app = express()
require("dotenv").config();
const auth = require("./Middlewares/auth");
const appoinmentRouter = require('./Routes/appointment.Routes');
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(UserRounter);
app.use(auth,appoinmentRouter);
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(process.env.PORT, async() => 
{
    await connection;
    console.log(`The server is running at ${process.env.PORT} and connected to db!`)
});