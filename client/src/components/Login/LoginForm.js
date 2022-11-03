import React from 'react';

import './LoginForm.css';
// import Illustration from '../../components/Illustration/Illustration';

const LoginForm = function(){
    return(
        <div className="login-form-container">
        <div className="login-form-input-box">
        <label className="login-form-label">Enter Your Name:</label>
        <input type="text" className="login-form-name"></input>
        <button>Sign in with Google</button>

        </div>
        </div>
    );
}


export default LoginForm;
