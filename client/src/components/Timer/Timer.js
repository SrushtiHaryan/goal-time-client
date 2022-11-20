import { React, useState, useEffect, useRef } from 'react'
import './Timer.css'
import axios from 'axios';


//num of sessions

//first take the email
//send the latest pomodoro session of the google user from app.js

const Timer = () => {

    

  let [pomodoroMinutes, setPomodoroMinutes] = useState(0);
  let [pomodoroSeconds, setPomodoroSeconds] = useState(10);
  let [breakMinutes, setBreakMinutes] = useState(0);
  let [breakSeconds, setBreakSeconds] = useState(5);
  let [minutes, setMinutes] = useState(0);
  let [seconds, setSeconds] = useState(0);
  let [pomodoroComp, setPomodoroComp] = useState(0);
  let [pomodoroFailed, setPomodoroFailed] = useState(0);
  let [pomodoroCreated, setPomodoroCreated] = useState(0);
  let [clickStart, setClickStart] = useState(0);

  
  let [active, setActive] = useState('');
  let [pomodoroOver, setPomodoroOver] = useState('');

  let [numOfPomo, setnumOfPomo] = useState(2);
  let [numOfPomoCovered, setnumOfPomoCovered] = useState(0);


  const StartTimer = (e) => {

    e.preventDefault();

    setActive('pomodoro');
    setMinutes(pomodoroMinutes);
    setSeconds(pomodoroSeconds);
    setClickStart(clickStart+1);


    // if(clickStart+1>1 && (active=='pomodoro' || active=='pomo')){
    //   setActive('incomplete');
    // }
    // setPomodoroCreated(pomodoroCreated+1);
    // setPomodoroFailed(pomodoroFailed+1);

  }

  const getPomoDetails = () => {

    let response;

    console.log("Here I am ");
    
    
    axios.get('http://localhost:3000/pomodoro-timer').then(res => {
      console.log("Hello we are inside pomodoro-timer from user_data");
      console.log(res.data)
      if(res.data.isGoog){


        // console.log("Form details entered");
        setPomodoroMinutes(res.data.durationPomo);
        setPomodoroSeconds(0);
        setBreakMinutes(res.data.durationBreak);
        setBreakSeconds(0);
        setnumOfPomo(res.data.numsession);
        
        
      }

      
 
    })
      
  }

  // const getPomoDetails2 = () => {

  //   let response;

  //   console.log("Here I am ");

    useEffect(() => {
      axios.get('http://localhost:3000/pomodoro-timer-user-goals').then(res => {
      console.log("Hello we are inside pomodoro-timer-dup from user_data");
      console.log(res.data);
      //  if(res.data.isGoog){
         console.log("Form details entered");
        setPomodoroComp(res.data.pomodoro_completed);
        setPomodoroCreated(res.data.pomodoro_created+1);
        setPomodoroFailed(res.data.pomodoro_failed+1);

        console.log(res.data.pomodoro_completed);
        console.log(typeof(res.data.pomodoro_completed));
        console.log(res.data.pomodoro_created);
        console.log(res.data.pomodoro_failed);

        // axios.post('/pomo-progress',{
        //   pomodorocompleted : pomodoroComp,
        //   pomodorocreated : pomodoroCreated,
        //  pomodorofailed : pomodoroFailed
        // });  
      //}
      //If the user clicks on start, it will increase created by one 
      //if the button is gone to completed, then the completed will increase by one 
      //else the failed will increase by one 
      // return res;
 
   })
  }, [pomodoroOver])
    // .then(res=>{

    //   axios.get(`https://www.googleapis.com/calendar/v3/calendars/${res.data.email}/events?key=AIzaSyBkBQC1accQPgI4P3QZYf6ZfRB6FVlrepE`)
    //   .then(res=>{
    //     console.log(res.data);
    //   })

    // })    
  //}


  // const getStreak= () =>{

  //   let current_date = new Date();
  //   let pomodoro_completed = true;

  //   let myObj = {[current_date]: pomodoro_completed};
  // }


  useEffect(() => {

    getPomoDetails()

  }, []);
  // useEffect(() => {

  //   getPomoDetails2()

  // }, [active]);


  useEffect(() => {

    if (numOfPomo == numOfPomoCovered) { 

      setActiveSess('completed'); 
      console.log("In use effect");
      setPomodoroComp(pomodoroComp+1);
      console.log(pomodoroComp+1);
      setPomodoroFailed(pomodoroFailed-1);
      setMinutes(0);
      setSeconds(0); 
      setPomodoroOver("done");
      alert('Congratulations, you have completed the pomodoro');
      console.log("The pomodoro over value is");
      console.log(pomodoroOver)
      console.log(active, pomodoroComp, pomodoroFailed, pomodoroCreated);
      axios.post('/pomo-progress',{
         pomodorocompleted : pomodoroComp,
         pomodorocreated : pomodoroCreated,
        pomodorofailed : pomodoroFailed
       });   


}},[active]);


useEffect(() => {

    if (active === 'pomodoro' || active === 'break') {
      const timeCounter =
        setInterval(() => {
          countDown(minutes, seconds);
          // setTimer(`${minutes}:${seconds}`)
        }, 1000);

      return () => clearInterval(timeCounter);
    }

  });

  


  const setActiveSess = (session) => {

    setActive(session);  
   }
  


  const countDown = async (minutes, seconds) => {



    if (minutes > 0) {
      if (seconds > 0) seconds--;
      else {
        minutes--;
        seconds = 59;
      };
      // console.log("min: "+minutes)
      // console.log("seconds: "+seconds)
      // setTimer(`${minutes}:${seconds}`);
    } else {
      if (seconds > 0) { seconds-- }
      else if (seconds == 0) {

        


        if (active === 'pomodoro') {
          setActiveSess('break');
          numOfPomoCovered++;
          setnumOfPomoCovered(numOfPomoCovered)
          // setInterval(() => {
          //   console.log('boop')
          // }, 500);
          console.log('numOfPomoCovered: ' + numOfPomoCovered);
          console.log('numOfPomo: ' + numOfPomo);


        } else if (active === 'break') {
          setActiveSess('pomodoro');
        } else {

          setActiveSess('completed');
          console.log(active)
        }

        
        
        minutes = (active == 'pomodoro' ? breakMinutes : pomodoroMinutes);
        seconds = (active == 'pomodoro' ? breakSeconds : pomodoroSeconds);

        if (active === 'completed') {
          minutes = 0;
          seconds = 0;
          setMinutes(minutes);
          setSeconds(seconds);
        }

      };
    }
    setMinutes(minutes);
    setSeconds(seconds);

  }


  return (
    <div className="timer-container">
      <div className="timer-tags">
        <div className={"timer-tag " + `${active === 'pomodoro' ? 'active' : ''}`}>Pomodoro</div>
        <div className={"timer-tag " + `${active === 'break' ? 'active' : ''}`}>Break</div>
        <div className={"timer-tag " + `${active === 'completed' ? 'active active-completed' : ''}`}>Completed</div>
      </div>
      <div className="timer" >{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</div>
      <button className="start-button" onClick={StartTimer}>Start</button>

    </div>
  )
}

export default Timer