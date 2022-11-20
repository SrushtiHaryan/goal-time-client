export class ProgressStatus {


    updateProgress = function (req, res) {
        pomoCo = req.body.pomodorocompleted;
        pomoCr = req.body.pomodorocreated;
        pomoF = req.body.pomodorofailed;

        var email_goalupdate = { email: email };
        var update_goals = { $set: { pomodoro_completed: req.body.pomodorocompleted, pomodoro_created: req.body.pomodorocreated, pomodoro_failed: req.body.pomodorofailed } };

        database.collection('usergoals').find({ 'email': email }).toArray(function (err, items) {

            if (err) {
                console.log(err);
                throw err;
            }

            if (items.length != 0) {
                database.collection("usergoals").updateOne(email_goalupdate, update_goals, (err, collection) => {
                    console.log("Record in user goals updated successfully");

                    // database.close();
                });

            }
        });

        console.log(req.body);
    }
}
