exports.pomodoroTimer =  (req)=>{

    console.log("sending pomo dets from backend ")
    // var daysOfworking=[{}];
    let {startdate, enddate} = req;

    if(startdate<enddate) return true;
    else return false;
    // console.log("The details of pomodoroSessionDetails");
    // console.log(pomodoroSessionDetails);
    // console.log("Exiting pomodoroSessionDetails");
    // let redir = {...pomodoroSessionDetails};
    // return res.json(redir);
    // // return res.json(...userGoalProgress);

}