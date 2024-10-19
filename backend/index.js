const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users.route.js');
require('dotenv').config()

const app = express();
const port = 5000;
const DB_STRING = process.env.DB_STRING

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//routes
app.use('/api/auth', userRoutes);

mongoose.connect(DB_STRING)
.then(() => {
  console.log("Connected to database Successfully!")
  app.listen(port, () => {
  console.log(`Server listening at port ${port}`)
})
}).catch((error) => {
  console.log({message: `Error connecting to database` || "SERVER ERROR", error})
})
