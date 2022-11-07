import React from 'react'
import Timer from '../../components/Timer/Timer'
import './PomodoroTimer.css'

const PomodoroTimer = () => {

  
  return (
    <div className="pomodoro-timer">
    <h1>🍅Pomodoro Timer🍅</h1>
    <div className="pomodoro-timer-container">
    <Timer></Timer>
    </div>
    </div>
  )
}

export default PomodoroTimer;