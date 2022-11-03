import { React, useState, useEffect, useRef } from 'react'
import './Timer.css'

const Timer = () => {

  let pomodoroMinutes=0;
  let pomodoroSeconds=10;
  let breakMinutes=0;
  let breakSeconds=5;
  let [minutes, setMinutes] = useState(pomodoroMinutes);
  let [seconds, setSeconds] = useState(pomodoroSeconds);

  // let [breakMinutes, setBreakMinutes] = useState(breakMinutes);
  // let [breakSeconds, setBreakSeconds] = useState(breakSeconds);
  // let [timer, setTimer] = useState('25:00');
  let [active, setActive]=useState('pomodoro');
  // let [active, setActive]=useState('pomodoro');

  useEffect(() => {


  
    const timeCounter = 
    setInterval(() => {
      countDown(minutes, seconds);
      // setTimer(`${minutes}:${seconds}`)
    }, 1000);
    
    return () => clearInterval(timeCounter);

  


  });

  function setStateSynchronous(stateUpdate) {
    return new Promise(resolve => {
        setActive(stateUpdate, () => resolve());
    });

    
}

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

        console.log(active);

        if(active==='pomodoro') {
          setActiveSess('break');
          
          console.log('pomodoro changed to break: '+active);
        }else{ 
          setActiveSess('pomodoro');
        }
       
        
        minutes = (active=='pomodoro'? pomodoroMinutes:breakMinutes);
        seconds = (active=='pomodoro'? pomodoroSeconds:breakSeconds);
        
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

    </div>
  )
}

export default Timer