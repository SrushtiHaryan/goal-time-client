const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const cors = require('cors');
// const user_det = require("./models/user_credentials");

// app.use(cors());

const PORT = process.env.PORT || 4040;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, }))

app.listen(PORT, console.log(`Server started on port ${PORT}`));