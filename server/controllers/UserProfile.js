 class UserProfile {
constructor(){}

    displayProfile=function(req, res){
    
        database.collection('usergoals').find({'email' :email}).toArray(function(err,items){
            
            if (err) {
                console.log(err);
                throw err;
            }
    
            if(items.length!=0)
            {
                res.json({name:name, email:email, image:image, isGoogle:isGoogle, pomoCo:items[0].pomodoro_completed ,pomoCr:items[0].pomodoro_created ,pomoF:items[0].pomodoro_failed});
            }
        })
        
    }

    consistencyPomodoroCount = function(req) {

        

        let { pomoCo, pomoF } = req;

       return pomoCo+pomoF;

    }
    

}

module.exports = UserProfile;

    
    