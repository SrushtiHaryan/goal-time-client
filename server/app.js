const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const google = require('googleapis');

const mongoose = require('mongoose');
const userDetailsColl = require('./models/User_Details');
const pomodoroSessionsColl = require('./models/Pomodoro_Sessions');


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

// const calendar= google.calendar('v3')
//       const response= await calendar.events.insert({
//         auth: oauth2Client, =>
//         calendarId: 'primary',
//         requestBody: {
//           summary: summary,
//           description: description,
//           location: location,
//           colorId: 6,
//           start:{
//             dateTime: new Date(startDateTime)
//           },
//           end:{
//             dateTime: new Date(endDateTime)
//           }
//         } 
//       })

var database = mongoose.connection;

let id, email, image, name, streak, progress;

app.post('/login', (req, res) => {
    // res.json({ "message":"connected"})

    console.log('hey')
    console.log(req.body)

    const user = new userDetailsColl();

    name = req.body.name;
    email = req.body.email;
    image = req.body.propic;

    user.name = req.body.name;
    user.email = req.body.email;
    user.image = req.body.propic;
    user.progress = 0;
    user.streak = 0;

    database.collection("userdetails").insertOne(user, (err, collection) => {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log("Record inserted successfully");

    });

    let redir = { redirect: "/pomodoro-form" };
    return res.json(redir);
    
});


app.post('/pomodoro-form',(req,res)=>{

    console.log(req.body);
    


    let redir = { redirect: "/pomodoro-timer" };
    return res.json(redir)
});


app.listen(5000, () => {
    console.log('Server listening on port 5000')
})