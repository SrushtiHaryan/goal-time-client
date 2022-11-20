import { React, useState, useEffect, useRef } from 'react'
import './UserData.css'
import axios from 'axios';
import { PieChart } from 'react-minimal-pie-chart';




const User = () => {

    let [image, setImage] = useState("");
    let [email, setEmail] = useState("");
    let [name, setName] = useState("");

     let [pomoCo, setpomoCo] = useState("");
     let [pomoCr, setpomoCr] = useState("");
     let [pomoF, setpomoF] = useState("");

    let [quote, setQuote] = useState("With Great Power Comes Great Responsibilty");
    let [x, setX] = useState(Math.floor(Math.random() * 1000));
    let [y, setY] = useState(0);
    
    useEffect(()=>{
    axios.get('http://localhost:3000/userprofile').then(response => {
        console.log(response)

        
        setName(response.data.name);

        setEmail(response.data.email);
        
        setImage(response.data.image);

         setpomoCo(response.data.pomoCo);
        
         setpomoCr(response.data.pomoCr);

         setpomoF(response.data.pomoF);
        
        console.log("Entry in the userdata page");
        console.log(name);
        console.log(email);
        console.log(image);
         console.log(pomoCo);
         console.log(pomoCr);
         console.log(pomoF);
        console.log("Exit in the userdata page");
    });

    axios.get('https://type.fit/api/quotes')
    .then(res=>{

        // console.log(Math.floor(Math.random() * 100));
        // console.log(Math.random() * 1000);
        //  setX(Math.floor(Math.random() * 100));
        //  setY(Math.floor(Math.random() * 100));
        //  setInterval(()=>{

        //     console.log('loading...')

        //  },1000);

        // console.log(res.data[x].text)
        // console.log(res.data)
        setQuote(res.data[x].text);
    })},[]);

   


    return (
<div className='profile-box'>
<div className="box">
        <div className="box-user"> 
            <div className="left-side">
             <div className="user-details">
                <div className='user-image-box'>
               <div className="user-image">
                   <img name="profile-pic" src={image}/>
                </div>
                </div>
               <div className="user-name">
                <div className="user-name-box">
                <p class="name">Name: <br/><br/>{name}</p>
                <p class="email">Email:<br/><br/> {email}</p>
                </div>
              </div>
             </div>
            </div>
            <div className="right-side">
            <div className="right-side-box1">
                {/* <div className="right-side-box-pomodoro">
                    <div className="pomodoro-details">
                        <p>hola</p>
                    </div>
                </div>
                <div className="space"></div>
                <div className="right-side-box-calendar">
                    <div className="calendar">
                        <p>Hi</p>
                    </div>
            </div>  */}
            {quote}
            </div>
            <div className="right-side-box2">
                <div className="right-side-box-progress">
                    <div className="progress-chart">
                        {/* <img name="graph" src="\assets\images\goal-image\graph.png"/> */}
                        {/* <p>hola</p> */}
                        <PieChart data={[
    { title: 'Pomodoro Completed', value: pomoCo, color: '#04aa6d'},
    { title: 'Pomodoro Created', value:  pomoCr, color: '#ffba01' },
    { title: 'Pomodoro Failed', value:  pomoF, color: '#da2a2a' },
  ]} animate={true}/>
                    </div>
                </div>
                <div className="space"></div>
                <div className="right-side-box-streak">
                    <div className="streak">
                        <p>Completed Pomodoro Sessions</p><br/>
                        <span className="streak">{pomoCo}</span>
                    </div>
            </div> 
            </div>
            </div>
        </div>   
    </div>
    </div>
    )

}

export default User;