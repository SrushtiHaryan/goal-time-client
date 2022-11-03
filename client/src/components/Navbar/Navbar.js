import React from "react";
import "./Navbar.css";
import { HiShoppingBag, HiOutlineUserCircle } from "react-icons/hi";
import { GiStairsGoal} from "react-icons/gi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = function () {
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
          <li>
            Home
          </li>
        {/* </Link> */}
        {/* <Link to="/pomodoro-form"> */}
          <li>
            Pomodoro
          </li>
        {/* </Link> */}
        {/* <Link to="/quick-notes"> */}
          <li>
            QuickNotes
          </li>
        {/* </Link> */}
        {/* <Link to="/about"> */}
          <li>
            About Us
          </li>
        {/* </Link> */}
      </ul>
      <div className="user-profile">
        
        <HiOutlineUserCircle />
      </div>
    </div>
  );
};

export default Navbar;
