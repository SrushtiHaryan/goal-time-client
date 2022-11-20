import { React, useState, useEffect, useRef } from 'react'
import './PomodoroForm.css'
// import RangeSlider from 'react-range-slider-input';

import {Link} from 'react-router-dom';
import axios from 'axios';



const Form = () => {

    let [title, setTitle] = useState("");
    let [startDate, setStartDate] = useState("");
    let [endDate, setEndDate] = useState("");
    let [startTime, setStartTime] = useState("");
    let [pomodoroDur, setPomodoroDur] = useState(0);
    let [breakDur, setBreakDur] = useState(0);
    let [numSess, setNumSess] = useState(0);
    let [numRep, setNumRep] = useState(0);

    const incPomoDur = () => {
   if (pomodoroDur < 40) {
  pomodoroDur = pomodoroDur + 1;
  setPomodoroDur(pomodoroDur);
   }

    }
    const decPomoDur = (p) => {
   if (pomodoroDur >= 1) {
  pomodoroDur = pomodoroDur - 1;
  setPomodoroDur(pomodoroDur);
   }

    }
    const incBreakDur = () => {
   if (breakDur < 20) {
  breakDur = breakDur + 1;
  setBreakDur(breakDur);
   }

 }
    const decBreakDur = () => {
   if (breakDur >= 1) {
  breakDur = breakDur - 1;
  setBreakDur(breakDur);
   }

}
    const incNumSession = () => {
   if (numSess < 5) {
  numSess = numSess + 1;
  setNumSess(numSess);
   }

    }
    const decNumSession = () => {
   if (numSess >= 1) {
  numSess = numSess - 1;
  setNumSess(numSess);
   }

    }
    const incRep = () => {
   if (numRep < 21) {
  numRep = numRep + 1;
  setNumRep(numRep);
   }

    }
    const decRep = () => {
   if (numRep >= 1) {
  numRep = numRep - 1;
  setNumRep(numRep);
   }

    }

    const handleStartDate = (e) => {

   let sDate = e.target.value;
   setStartDate(sDate);
   setEndDate(sDate);
   console.log(sDate);

    }

    const dateStrToObj = (dateStr) => {
   const [year, month, date] = dateStr.split('-').map(Number)
   return new Date(year, month - 1, date)
    }
    const handleEndDate = (e) => {

   let eDate = e.target.value;
   const s2Date = dateStrToObj(startDate)
   const e2Date = dateStrToObj(eDate)

   if (e2Date.valueOf() < s2Date.valueOf()) {
  console.error('End date is before start date!')
   } else {
  setEndDate(eDate);
   }

 
 
    }
let time,goalTitle;

    const handleTitle = (e) => {
 goalTitle = e.target.value;

 if(e.target.value!=""){
   setTitle(goalTitle);

 }
    }


    const handleStartTime = (e) => {

  time = e.target.value;
  if(e.target.value!=""){
   setStartTime(time);
  }
    }

    const handleSubmitPomodoro = (e)=>{
  
   e.preventDefault();

   axios.post('/pomodoro-form',{
  
  startdate : startDate,
  enddate : endDate,
  starttime : startTime,
  titlepomo : title,
  durationPomo : pomodoroDur,
  durationBreak: breakDur,
  numsession:  numSess,
  numrepetition: numRep,
  isGoog: true

   }).then(res=>{
  
  axios.post('/pomodoro-timer', res.data)

  console.log(res.data.redirect)

  if(res.data.redirect=='/pomodoro-timer'){
      window.location='/pomodoro-timer';
  }
   })

    }
return (
   <div className="pomodoro-form-container">
   <form action='/pomodoro-form' method='post'> 


      <label htmlFor="title" className="goal-title">Title for the Session
     <input type="text" name="goal_title" className="title-input" value={title} onChange={handleTitle} required></input>
      </label>

      <div className="pomo-dates">
     <div className="start-date-pomo">
    <label htmlFor="start_pomo">Start Date
    </label>
    <div className="start-pomo-input">
        <input type="date" name="dur_pomo" value={startDate} onChange={handleStartDate} required></input>
    </div>
     </div>
     <div className="start-time-pomo">
    <label htmlFor="start_time">Start Time
    </label>
    <div className="start-pomo-input">
        <input type="time" name="start_pomo" value={startTime} onChange={handleStartTime} required></input>
    </div>
     </div>
     <div className="end-date-pomo">


    <label htmlFor="end_pomo">End Date
    </label>
    <div className="end-pomo-input">
        <input type="date"  name="dur_break" value={endDate} onChange={handleEndDate} required></input>
    </div>
     </div>
      </div>
<div className="duration">
     <div className="duration-pomo">
    <label htmlFor="dur_pomo">Duration of Pomodoro
    </label>
    <div className="dur-pomo-input">
        <span className="dec-button" onClick={decPomoDur}>-</span>
        <input type="text" name="dur_pomo" value={pomodoroDur} readOnly ></input>
        <span className="inc-button" onClick={incPomoDur}>+</span>
    </div>
     </div>

     <div className="duration-break">

    <label htmlFor="dur_break">Duration of Break
    </label>
    <div className="dur-break-input">
        <span className="dec-button" onClick={decBreakDur}>-</span>
        <input type="text" name="dur_break" value={breakDur} readOnly ></input>
        <span className="inc-button" onClick={incBreakDur}>+</span>
    </div>
     </div>
      </div>

      <div className="session-rep">

     <div className="number_sessions">
    <label htmlFor="num_pomo">Number of Sessions
    </label>
    <div className="sess-input">
        <span className="dec-button" onClick={decNumSession}>-</span>
        <input type="text" name="num_pomo" className="num-pomo-input" value={numSess} readOnly required></input>
        <span className="inc-button" onClick={incNumSession}>+</span>
    </div>
     </div>
     <div className="number_rep">
    <label htmlFor="num_prep">Number of Repetitions
    </label>
    <div className="rep-input">
        <span className="dec-button" onClick={decRep}>-</span>
        <input type="text" name="num_rep" className="num-pomo-input" value={numRep} readOnly required></input>
        <span className="inc-button" onClick={incRep}>+</span>
    </div>
     </div>
      </div>

    <Link to='/pomodoro-timer'> 
     <button className="create-pomodoro-btn" onClick={handleSubmitPomodoro}>Create Pomodoro</button>
      </Link> 


  </form> 
   </div>
    )

}

export default Form;
