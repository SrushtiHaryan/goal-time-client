const mongoose = require("mongoose");

const pomodorodetails = new mongoose.Schema({

    name:{
        type: String,
        required: true 
    },

    email:{
        type: String,
        // required: true 
    },

    goal_title:{
        type: String,
        required: true
    },

    start_date:{
        type: String,
        required: true 
    },

    end_date:{
        type: String,
        required: true 
    },

    start_time:{
        type: String, 
        required: true 
    },

    pomodoro_duration:{
        type: Number,
        required: true
    },

    break_duration:{
        type: Number,
        required: true 
    },

    no_sessions:{
        type: Number,
        required: true 
    },

    no_days:{
        type: Number,
        required: true 
    }
});

const FirstSch = mongoose.model("pomodoroSession", pomodorodetails);
module.exports = FirstSch;