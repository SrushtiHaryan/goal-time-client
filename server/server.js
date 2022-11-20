const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const {google} = require('googleapis');
const moment= require('moment');


const TimeConf = require('./controllers/TimerConfiguration.js')
const AuthenticationService = require('./controllers/AuthenticationService.js')
const Timer = require('./controllers/Timer.js')
const ProgressStatus = require('./controllers/ProgressStatus.js')
const UserProfile = require('./controllers/UserProfile.js')

const timeConfiguration = new TimeConf();
const authenticationService = new AuthenticationService();
const timer = new Timer();
const progressStatus = new TimeConf();
const profile = new ProgressStatus();


app.post('/login',authenticationService.verifyCredentials);

let pomodoroSessionDetails = {};
app.post('/pomodoro-form', timeConfiguration.formSubmit());

app.get('/pomodoro-timer', timer.displayTimer())

app.get("/pomodoro-timer-user-goals", (req,res)=>{

    var found_data={};
    var namegoal, emailgoal, completegoal, failgoal, creategoal;

    database.collection('usergoals').find({email :email}).toArray(function(err,items){
    
        if (err) {
            console.log(err);
            throw err;
        }

        if(items.length==0)
        {
            console.log("Though it first existed, it doesnt now");
        }
        else 
        {
            found_data.name=items[0].name;
            found_data.email=items[0].email;
            found_data.pomodoro_completed=items[0].pomodoro_completed;
            found_data.pomodoro_created=items[0].pomodoro_created;
            found_data.pomodoro_failed=items[0].pomodoro_failed;
            console.log("Finded data");
            console.log(items[0]);
            let redir = {...found_data};
            console.log(found_data);
           console.log("Exiting the pomodoro dup");
            return res.json(redir);
            
            
        }
    });
    

})


app.post("/pomo-progress", progressStatus.updateProgress())

app.get("/userprofile", profile.displayProfile())
