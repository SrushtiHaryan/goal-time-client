class AuthenticationService {
    constructor(){}
    
    verifyCredentials =  async function (req, res){
  
        
     
    
        if(req.body.isGoog==true){
        
        
        const user = new userDetailsColl();
        
        
        ACCESS_TOKEN = req.body.access_token;
       
    
        name = req.body.name;
        email = req.body.email;
        isGoogle = req.body.isGoog;
        
    
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
    
    };

    
    
}


module.exports = AuthenticationService;