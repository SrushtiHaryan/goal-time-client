class Timer {
constructor(){}


    displayTimer = function (req, res) {

        console.log("sending pomo dets from backend ");

        console.log(pomodoroSessionDetails);

        let redir = { ...pomodoroSessionDetails };

        return res.json(redir);



    }

    pomodoroDateCheck = function(req) {



        let { startdate, enddate } = req;

        if (startdate < enddate) { 
            return false; 
        }
        else { 
            return true; 
        }


    }

    pomodoroGreaterThanBreak = function(req) {



        let { durationPomo, durationBreak } = req;

        if (durationPomo > durationBreak) { 
            return true; 
        }
        else { 
            return false; 
        }


    }

    pomodoroUserGoogle = function(req) {



        let {isGoog} = req;

        if (isGoog==true) { 
            return true;
        }
        else { 
            return false; 
        }


    }


}

module.exports = Timer;

