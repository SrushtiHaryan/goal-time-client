import './App.css';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login'
import PomodoroTimer from './pages/PomodoroTimer/PomodoroTimer'
import PomodoroConfig from './pages/PomodoroConfig/PomodoroConfig'

function App() {
  
  return (
    <div>
      <Navbar></Navbar>
      <PomodoroConfig></PomodoroConfig>
      {/* <Login></Login> */}
    </div>
  );
}

export default App;
