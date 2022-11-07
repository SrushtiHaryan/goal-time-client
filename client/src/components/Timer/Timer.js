import { React, useState, useEffect, useRef } from 'react'
import './Timer.css'
import axios from 'axios';


//num of sessions

const Timer = () => {

  let pomodoroMinutes=0;
  let pomodoroSeconds=10;
  let breakMinutes=0;
  let breakSeconds=5;
  let [minutes, setMinutes] = useState(0);
  let [seconds, setSeconds] = useState(0);

  // let [breakMinutes, setBreakMinutes] = useState(breakMinutes);
  // let [breakSeconds, setBreakSeconds] = useState(breakSeconds);
  // let [timer, setTimer] = useState('25:00');
  let [active, setActive]=useState('');
  // let [active, setActive]=useState('pomodoro');

  
  let numOfPomo=1;


  const StartTimer = (e)=>{
    
    e.preventDefault();
    
    setActive('pomodoro');
    setMinutes(pomodoroMinutes);
    setSeconds(pomodoroSeconds);
    
  }
    
  const getPomoDetails = ()=>{
    axios.get('http://localhost:3000/pomodoro-timer').then(response=>{
      console.log(response)
      // if(response.data.isGoog){

      //   // pomodoroMinutes=response.data.durationPomo;
      //   // breakMinutes=response.data.durationBreak;
      //   // numOfPomo = response.data.numsessions;
      // }
      
    });
  }

  useEffect(() => {

    getPomoDetails()

  },[]);


  useEffect(() => {

       
    if(active ==='pomodoro' || active ==='break'){
  const timeCounter = 
  setInterval(() => {
    countDown(minutes, seconds);
    // setTimer(`${minutes}:${seconds}`)
  }, 1000);
  
  return () => clearInterval(timeCounter);
}
  
});

// async function setStateAsync() {
//     // state.count has value of 0
    
// }


const setActiveSess=(session) =>{

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
    }else{
      if (seconds > 0){ seconds--}
      else if(seconds==0) {

        

        if(active==='pomodoro') {
          setActiveSess('break');
          
          
        }else{ 
          setActiveSess('pomodoro');
        }
       
        
        
        minutes = (active=='pomodoro'? breakMinutes: pomodoroMinutes);
        seconds = (active=='pomodoro'? breakSeconds:pomodoroSeconds);
        
      };
    }
    setMinutes(minutes);
    setSeconds(seconds);

  }


  return (
    <div className="timer-container">
      <div className="timer-tags">
        <div className={"timer-tag "+ `${active==='pomodoro'?'active':''}`}>Pomodoro</div>
        <div className={"timer-tag "+ `${active==='break'?'active':''}`}>Break</div>
        <div className="timer-tag">Completed</div>
      </div>
      <div className="timer" >{minutes<10?"0"+minutes:minutes}:{seconds<10?"0"+seconds:seconds}</div>
      <button className="start-button" onClick={StartTimer}>Start</button>

    </div>
  )
}

export default Timer