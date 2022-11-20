const Timer = require("../controllers/Timer")
const timer = new Timer();

class TimerConfigurationClass {
    constructor(){}
    
    CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    // const CLIENT_SECRET = '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';
    CLIENT_SECRET = process.env.REACT_APP_SECRET;
    
    
    oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, 'http://localhost:3000/');
    
    ACCESS_TOKEN;

     formSubmit =  async function (req, res) {
        var { titlepomo, startdate, enddate, starttime, durationPomo, durationBreak, numsession, numrepetition,isGoog } = req.body;
    
        pomodoroSessionDetails = req.body;
        pomodoroSessionDetails.email = email;

    var login=timer.pomodoroUserGoogle(pomodoroSessionDetails);
    if(login==true){
    
    console.log('------------------------------pomodoroSessionDetails');
    console.log(pomodoroSessionDetails);

   

     var changedstartdate=startdate+"T"+starttime+":00+05:30";
     var changedenddate= enddate;

     changedenddate=changedenddate.replaceAll(':','');
     changedenddate=changedenddate.replaceAll('-', '');
     changedenddate=changedenddate.replaceAll('.', '');

     var stat=timer.pomodoroDateCheck(startdate, enddate)
     var dur=timer.pomodoroGreaterThanBreak(durationPomo,durationBreak)
     
     if(stat==true && dur==true){
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
}
    }
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



    let redir = { redirect: "/pomodoro-timer", ...pomodoroSessionDetails };
    return res.json(redir)
    }
}


module.exports = TimerConfigurationClass;
