import { React, useState, useEffect, useRef } from 'react'
import './PomodoroForm.css'

const Form = () => {

    return (
        <form>
            <div>

                <label for="title">Enter the title:
                    <input type="text" name="title" ></input>
                </label>
                
                <label for="num_pomo">Enter the number of pomodoro sessions
                    <input type="number" name="num_pomo" ></input>
                </label>

                <label for="dur_pomo">Enter the duration of 1 pomodoro
                    <input type="number" name="dur_pomo" ></input>
                </label>
                <label for="dur_break">Enter the duration of 1 break
                    <input type="number" name="dur_break" ></input>
                </label>
            </div>
        </form>
    )

}

export default Form;