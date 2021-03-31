const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();

// Database Connections
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then((res) => console.log("DB Connected"));

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

// Import all the global routes
const postRoute = require("./routes/post");

app.use("/api/v1/", postRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Port listening on ${port}`);
});
