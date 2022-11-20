const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const {google} = require('googleapis');
const moment= require('moment');

const mongoose = require('mongoose');
const userDetailsColl = require('./models/User_Details');
const pomodoroSessionsColl = require('./models/Pomodoro_Sessions');
const userGoalsCOll= require('./models/User_Goals');


const CLIENT_ID = '1069461285378-buuq6q8f760psjkjmat2fudb1i1f14n3.apps.googleusercontent.com';
const CLIENT_SECRET = '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';


const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, 'http://localhost:3000/');

let ACCESS_TOKEN;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const connectDb = () => {
    mongoose.connect(
        "mongodb+srv://SH:SH2022@goaltimecluster.kfiaz6w.mongodb.net/test",
        { useNewUrlParser: true }
    );
    console.log("Connected to the database  ");
};

connectDb();



var database = mongoose.connection;

var id, email, image, name, streak, progress, isGoogle, pomoCo, pomoCr, pomoF; //variables are out 


app.post('/login', (req, res) => {
    // res.json({ "message":"connected"})
    console.log('hey')
    console.log(req.body)



    if(req.body.isGoog==true){
    
    
    const user = new userDetailsColl();
    
    ACCESS_TOKEN = req.body.access_token;
    name = req.body.name;
    email = req.body.email;
    image = req.body.propic;
    isGoogle=req.body.isGoog;

    user.name = req.body.name;
    user.email = req.body.email;
    user.image = req.body.propic;
    user.isGoogle = req.body.isGoog;
    user.progress = 0;
    user.streak = 0;

    database.collection("userdetails").insertOne(user, (err, collection) => {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log("Record inserted successfully ");
        

    });
    
    const pomo_status = new userGoalsCOll();

    pomo_status.name=name;
    pomo_status.email=email;
    pomo_status.pomodoro_created=0;
    pomo_status.pomodoro_completed=0;
    pomo_status.pomodoro_failed=0;
    
    database.collection('usergoals').find({email :email}).toArray(function(err,items){
    
        if (err) {
            console.log(err);
            throw err;
        }

        if(items.length==0)
        {
            database.collection("usergoals").insertOne(pomo_status, (err, collection) => {
                console.log("Record in usergoals inserted successfully :)");
            })

        }
        else 
        {
            console.log("The usergoals for the user already exists :(");
        }
    });


    let redir = { redirect: "/pomodoro-form"};
    return res.json(redir);

}else{

    let redir = { redirect: "/pomodoro-timer",  guestName : req.body.name  };
    return res.json(redir);


}

});



let pomodoroSessionDetails = {};
app.post('/pomodoro-form', async (req, res) => {

    console.log(req.body);

    
    var { titlepomo, startdate, enddate, starttime, durationPomo, durationBreak, numsession, numrepetition,isGoog } = req.body;
    
    
    pomodoroSessionDetails = req.body;
    pomodoroSessionDetails.email = email;
    
    console.log('------------------------------pomodoroSessionDetails');
    console.log(pomodoroSessionDetails);

   

     var changedstartdate=startdate+"T"+starttime+":00+05:30";
     var changedenddate= enddate;

     changedenddate=changedenddate.replaceAll(':','');
     changedenddate=changedenddate.replaceAll('-', '');
     changedenddate=changedenddate.replaceAll('.', '');

     if(durationPomo>durationBreak){
     oauth2Client.setCredentials({access_token: ACCESS_TOKEN})
     const calendar = google.calendar('v3')
     const response = await calendar.events.insert({
        auth: oauth2Client,
        calendarId: 'primary',
        requestBody: {
            summary: titlepomo,
            description: "description",
            // location: location,
            colorId: 6,
            start: {
                dateTime: changedstartdate,
                timeZone: "Asia/Kolkata" 
            },
            end: {
                dateTime: changedstartdate,
                timeZone: "Asia/Kolkata"
            },
            recurrence: [
                 'RRULE:FREQ=DAILY;UNTIL='+ changedenddate +';INTERVAL=' + numrepetition
               ],
        }
       

    });

    // console.log(response);

    const pomo_data= new pomodoroSessionsColl();

    pomo_data.goal_title= titlepomo;
    pomo_data.start_dateTime= new Date(startdate);
    pomo_data.end_dateTime= new Date(enddate);
    pomo_data.pomodoro_duration=durationPomo;
    pomo_data.break_duration=durationBreak;
    pomo_data.no_sessions= numsession;
    pomo_data.no_days=numrepetition;
    pomo_data.name=name;
    pomo_data.email=email;
    pomo_data.start_time= starttime;

    var dateArray = [];
    var currentDate = moment(startdate);
    var stopDate = moment(enddate);
    while (currentDate <= stopDate) {
        dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
        currentDate = moment(currentDate).add(numrepetition, 'days');
    }
    pomo_data.daysfound= dateArray;
    console.log(dateArray);

    database.collection("pomodorosessions").insertOne(pomo_data, (err, collection) => {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log("Record inserted successfully ");

    });


     }
    let redir = { redirect: "/pomodoro-timer", ...pomodoroSessionDetails };
    return res.json(redir)

});




app.get('/pomodoro-timer', (req,res)=>{

    console.log("sending pomo dets from backend ")
    var daysOfworking=[{}];
    console.log("The details of pomodoroSessionDetails");
    console.log(pomodoroSessionDetails);
    console.log("Exiting pomodoroSessionDetails");
    let redir = {...pomodoroSessionDetails};
    return res.json(redir);
    // return res.json(...userGoalProgress);

})

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

app.post("/pomo-progress", (req, res) => {
    pomoCo=req.body.pomodorocompleted;
    pomoCr=req.body.pomodorocreated;
    pomoF=req.body.pomodorofailed;

    var email_goalupdate = {email: email };
    var update_goals= { $set: { pomodoro_completed: req.body.pomodorocompleted, pomodoro_created: req.body.pomodorocreated, pomodoro_failed: req.body.pomodorofailed } };
            
                database.collection('usergoals').find({'email' :email}).toArray(function(err,items){
        
                    if (err) {
                        console.log(err);
                        throw err;
                    }
            
                    if(items.length!=0)
                    {
                        database.collection("usergoals").updateOne(email_goalupdate,update_goals, (err, collection) => {
                                console.log("Record in user goals updated successfully");
                                
                                // database.close();
                            });
            
                    }
                });

    console.log(req.body);
})

app.get("/userprofile", (req, res)=>{

    database.collection('usergoals').find({'email' :email}).toArray(function(err,items){
        
        if (err) {
            console.log(err);
            throw err;
        }

        if(items.length!=0)
        {
            res.json({name:name, email:email, image:image, isGoogle:isGoogle, pomoCo:items[0].pomodoro_completed ,pomoCr:items[0].pomodoro_created ,pomoF:items[0].pomodoro_failed});
        }
    });
    
})

app.listen(5000, () => {
    console.log('Server listening on port 5000')
})

module.exports = app