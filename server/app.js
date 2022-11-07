const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const {google} = require('googleapis');

const mongoose = require('mongoose');
const userDetailsColl = require('./models/User_Details');
const pomodoroSessionsColl = require('./models/Pomodoro_Sessions');

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

// start
// end
// summary
// location



var database = mongoose.connection;

var id, email, image, name, streak, progress, isGoogle;

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

    let redir = { redirect: "/pomodoro-form"};
    return res.json(redir);

}else{

    let redir = { redirect: "/pomodoro-timer",  guestName : req.body.name  };
    return res.json(redir);


}

});



// startdate : startDate,
// enddate : endDate,
// starttime : startTime,
// titlepomo : title,
// durationPomo : pomodoroDur,
// durationBreak: breakDur,
// numsession:  numSess,
// numrepetition: numRep

let pomodoroSessionDetails = {};
app.post('/pomodoro-form', async (req, res) => {

    console.log(req.body);
    // const startDateTime = "";
    // const endDateTime = ;

    const { titlepomo, startdate, enddate, starttime, durationPomo, durationBreak, numsession, numrepetition,isGoog } = req.body;

    pomodoroSessionDetails = req.body;

//    exceptions:
//if start date is stale
// if end date < start date




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
                dateTime: new Date(startdate)
            },
            end: {
                dateTime: new Date(enddate)
            }
        }
    });

    console.log(response);



    let redir = { redirect: "/pomodoro-timer", ...pomodoroSessionDetails };
    return res.json(redir)

});


app.post('/pomodoro-timer', (req,res)=>{
    console.log(req.body);
})
app.get('/pomodoro-timer', (req,res)=>{
    console.log("sending pomo dets from backend ")
    res.json(pomodoroSessionDetails);
})

app.listen(5000, () => {
    console.log('Server listening on port 5000')
})