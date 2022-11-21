import './App.css';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login'
import PomodoroTimer from './pages/PomodoroTimer/PomodoroTimer'
import PomodoroConfig from './pages/PomodoroConfig/PomodoroConfig'
import Home from './pages/HomePage/Home'
import QuickNotes from './pages/QuickNotes/QuickNotes'
import UserProfile from './pages/UserProfile/UserProfile'
import  {BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';


function App() {
  
  return (
 

<Router>
      <div className="App">
        <Navbar></Navbar>
       

        <Routes>
          {/* <Route path="/" element={<Homepage />} /> */}
          <Route path="/pomodoro-timer" exact element={<PomodoroTimer/>} />
          <Route path="/" exact element={<Login/>} />
          <Route path="/pomodoro-form" exact element={<PomodoroConfig/>} />
          {/* <Route path="/home" exact element={<Home/>} /> */}
          <Route path="/login" exact element={<Login />} />
          <Route path="/quicknotes" exact element={<QuickNotes />} />
          <Route path="/userprofile" exact element={<UserProfile/>} />
        </Routes>
        
      </div>
    </Router>
      
   
  );
}

export default App;
