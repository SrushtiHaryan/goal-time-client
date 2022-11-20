import { React, useState, useEffect, useRef } from 'react';
// import jwt_decode from "jwt-decode";
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import axios from "axios"
import jwt_decode from "jwt-decode";
import './LoginForm.css';

// import Illustration from '../../components/Illustration/Illustration';

// 1071314173715-a71ksf6t0sqlnt1su90a225jo89mae2d.apps.googleusercontent.com
// 1071314173715-a71ksf6t0sqlnt1su90a225jo89mae2d.apps.googleusercontent.com
// import {env} from 'process';


const LoginForm = function () {

  let [userName, setuserName] = useState("");
  // let [email_id, setEmail_id] = useState("");


  let [userLogged, setLogged] = useState(false);
  let [buttonDisable, setButtonDisable] = useState(false);

  let userDetails;

  const [bData, setBData] = useState({});



  const handleLogin = function (googleData) {

    // var decoded = jwt_decode(googleData.credential);

    // console.log(decoded)
    // userDetails.name = decoded.name;
    // userDetails.email = decoded.email;
    // userDetails.propic = decoded.picture;
    // userDetails.isGoog = true;

  }


  const sendUserDetails = (userDetails) => {

    console.log(userDetails);
    axios.post('/login', userDetails)
    .then(res=>{
      console.log(res);
      if(res.data.redirect=='/pomodoro-form'){
        window.location ="/pomodoro-form";
  
      }
      if(res.data.redirect=='/pomodoro-timer'){
        window.location ="/pomodoro-timer";
  
      }
    });
  }

  const handleNameInput = (e) => {

    if(e.target.value.trim()===""){
      setuserName(e.target.value.trim())
  }else{
      setuserName(e.target.value)

    }
    if (e.target.value.trim() === " " || e.target.value.trim().length<2 || e.target.value.trim().length>20) {
      setButtonDisable(false);
      
    } else if(e.target.value.length>=5) {
      setButtonDisable(true);
    }
  }
const login = useGoogleLogin({
    
    onSuccess: async response => {
      let res;

      let access_token;
      try {
        res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            "Authorization": `Bearer ${response.access_token}`
          }
        })


        console.log(response)
        access_token = response.access_token
        console.log('bombom')
        console.log(res.data)
      } catch (err) {
        console.log(err)

      }

      setLogged(true);
      setuserName(res.data.name)

      console.log(res.data)


    let userDetails={};

      userDetails.name = res.data.name;
      userDetails.email = res.data.email;
      userDetails.propic = res.data.picture;
      userDetails.isGoog = true;
      userDetails.access_token = access_token;


      if (userName != "undefined") {
        sendUserDetails(userDetails);
      }

    
  },
  scope : 'openid email profile https://www.googleapis.com/auth/calendar'
    

  });

  const loginAsGuest = () => {
    setLogged(true);
    setuserName(userName);
    console.log(userName)

    let userDetails={};

    userName = userName.trim();
    userDetails.name = userName;
    userDetails.isGoog = false;

    if (userName != "undefined" || userName != "" || userName != " ") {
      sendUserDetails(userDetails);
    }
    // else if(userName.length < 5){

    //   alert('The name is too short!');

    // }
 }

  const handleFailure = function (result) {
    console.log(result);

  }

  // console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);

  return (
    <div className="login-form-container">
      {/* <form action='/login' method='post'> */}
      <div className="login-form-input-box">
        <label className="login-form-label">{userLogged ? 'Hey, Nice to see you' : 'What would you want us to call you?'}</label>
        <input type="text" className={"login-form-name " + `${userLogged ? "disappear-ele" : ""}`} value={userName} onChange={handleNameInput} name="name_input"></input>



        <button disabled={buttonDisable} onClick={() =>login()} className={userLogged ? 'disappear-ele' : ""} >

          {userLogged ? 'You are all Set!' : "Sign in with Google 🚀"}
        </button>
        <button disabled={!buttonDisable} onClick={() => loginAsGuest()} className={userLogged ? 'disappear-ele' : ""} >
          Guest Login
        </button>

        <div className={!userLogged ? "disappear-ele" : "your-name"}>{userName}<br />✨</div>






      </div>
      {/* </form> */}
    </div>
  );
}


export default LoginForm;
