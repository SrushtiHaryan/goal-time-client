const mongoose = require("mongoose");

const profile = new mongoose.Schema({

    name:{     
    type: String,
    required: true
    },

    image:{
    type: String,
    // required: true 
    },

    email:{
    type: String,
    // required: true 
    },

    streak:{
    type: Number,
    required: true 
    },

    progress:{
    type: Number,
    required: true
    },
});

const FirstSch = mongoose.model("userDetail", profile);
module.exports = FirstSch;