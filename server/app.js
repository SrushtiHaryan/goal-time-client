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

var id, email, image, name, streak, progress, isGoogle; //variables are out 

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

    var { titlepomo, startdate, enddate, starttime, durationPomo, durationBreak, numsession, numrepetition,isGoog } = req.body;

    pomodoroSessionDetails = req.body;
    pomodoroSessionDetails.email = email;

//    exceptions:
//if start date is stale
// if end date < start date

   

     var changedstartdate=startdate+"T"+starttime+":00+05:30";
     var changedenddate= enddate;

     changedenddate=changedenddate.replaceAll(':','');
     changedenddate=changedenddate.replaceAll('-', '');
     changedenddate=changedenddate.replaceAll('.', '');

    //  const d1=new Date(Date.UTC(startdate.getFullYear(),startdate.getMonth(), startDate.getDay(), starttime.getHours(), starttime.getMinutes(), starttime.getSeconds()));
     

    
    //console.log(d1);
     console.log(changedstartdate);
     console.log(changedenddate);
     console.log(new Date(startdate));
     console.log(starttime);
     console.log(startdate);

    //  var getYear=startdate.getFullYear();
    //  var getMonth=startdate.getMonth();
    //  var getDay=startdate.getDay();

    //  var date_together=getYear+getMonth+getDay;

    //  console.log(date_together)


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
                // timeZone: "Etc/GMT"
                timeZone: "Asia/Kolkata" 
            },
            end: {
                dateTime: changedstartdate,
                // timeZone: "Etc/GMT"
                timeZone: "Asia/Kolkata"
            },
            recurrence: [
                 'RRULE:FREQ=DAILY;UNTIL='+ changedenddate +';INTERVAL=' + numrepetition
               ],
            // reminders: {
            //     'useDefault': false,
            //     'overrides': [{
            //       'method': 'popup',
            //       'minutes': 10
            //     }]
            // }
        }
       
        // const { titlepomo, startdate, enddate, starttime, durationPomo, durationBreak, numsession, numrepetition,isGoog } = req.body;

    });

    console.log(response);

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
    // pomo_data.status="pending";
    // pomo_data.email=isGoogle;

    database.collection("pomodorosessions").insertOne(pomo_data, (err, collection) => {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log("Record inserted successfully ");

    });

    let redir = { redirect: "/pomodoro-timer", ...pomodoroSessionDetails };
    return res.json(redir)

});


app.post('/pomodoro-timer', (req,res)=>{
    console.log(req.body);
})

app.get('/pomodoro-timer', (req,res)=>{
    console.log("sending pomo dets from backend ")

    res.json(pomodoroSessionDetails);
// })
})


app.get("/userprofile", (req, res)=>{
res.json({name:name, email:email, image:image, isGoogle:isGoogle});

})

app.post('/user-profile-streak',(req,res)=>{

    const {dOC} = req.body;

   console.log(dOC.entries().length);

})
app.listen(5000, () => {
    console.log('Server listening on port 5000')
})