const mongoose = require("mongoose");

const pomodorodetails = new mongoose.Schema({

     name:{
         type: String,
         // required: true 
     },

     email:{
         type: String,
         // // required: true 
     },

    goal_title:{
        type: String,
        // required: true
    },

    start_dateTime:{
        type: String,
        // required: true 
    },

    end_dateTime:{
        type: String,
        // required: true 
    },

    start_time:{
         type: String, 
    //     // required: true 
    },
// user1
// name
// email
// arrayofpomodoros: [
//     {
//         pomo1details
//     },
//     {
//         pomodorodetails
//     },
//     ...
// ]
    // },
pomodoro_duration:{
        type: Number,
        // required: true
    },

    break_duration:{
        type: Number,
        // required: true 
    },

    no_sessions:{
        type: Number,
        // required: true 
    },

    no_days:{
        type: Number,
        // required: true 
    },

    daysfound:{
        type: Array,
        //required:true
    }
});

const FirstSch = mongoose.model("pomodoroSession", pomodorodetails);
module.exports = FirstSch;