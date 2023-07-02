//4para cambiar el puerto
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts.js");

//1 express app
const app = express();
const cors = require("cors");

app.use(cors());
//5 middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//3 routes
app.use("/api/workouts", workoutRoutes);

//6 connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //2 listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening  on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
