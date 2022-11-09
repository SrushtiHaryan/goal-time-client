import {React, useState} from "react";
import "./Navbar.css";
import { HiShoppingBag, HiOutlineUserCircle } from "react-icons/hi";
import { GiStairsGoal} from "react-icons/gi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";


const Navbar = function () {
  let [navigate, setNavigate]=useState("");

  const handleNavigation=()=>{
    
    axios.get('http://localhost:3000/userprofile')
    .then(res=>{

     console.log(res.data.isGoogle);
      if(res.data.isGoogle){
        setNavigate("/userprofile");
      }else{
        setNavigate("/login");

      }
    })
  }


  return (
    <div className="navbar">
      <div className="Brand">
        <div className="Brand-logo">
          <GiStairsGoal />
        </div>
        <div className="Brand-name">GoalTime</div>
      </div>
      <ul>
        {/* <Link to="/"> */}
          {/* <li>
            Home
          </li> */}
        {/* </Link> */}
        <Link to="/pomodoro-timer">
          <li>
            Pomodoro
          </li>
        </Link>
        <Link to="/quicknotes">
          <li>
            QuickNotes
          </li>
        </Link>
      </ul>
      <Link to={navigate}>
      <div className="user-profile" onClick={handleNavigation}>
        
        <HiOutlineUserCircle />
      </div>
      </Link>
    </div>
  );
};

export default Navbar;
