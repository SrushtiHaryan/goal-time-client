import React from 'react';

import './Login.css';
import Illustration from '../../components/Illustration/Illustration';
import LoginForm from '../../components/Login/LoginForm';

const Login = function(){
    return(
        <div className="login-container">
        <div className="login-left-container">

        <Illustration></Illustration>

        </div>
        <div className="login-right-container">
        <LoginForm></LoginForm>

        </div>
        </div>
    );
}


export default Login;
