const mongoose = require("mongoose");

const userGoals = new mongoose.Schema({

    name:{     
    type: String,
    required: true
    },

    email:{
    type: String,
    required: true 
    },

    pomodoro_created:{
    type: Number,
    required: true 
    },

    pomodoro_completed:{
    type: Number,
    required: true
    },

    pomodoro_failed:{
    type: Number,
    required: true 
    }

    
});

const FirstSch = mongoose.model("userGoal", userGoals);
module.exports = FirstSch;