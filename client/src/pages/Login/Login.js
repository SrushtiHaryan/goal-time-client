import React from 'react';

import './Login.css';
import Illustration from '../../components/Illustration/Illustration';
import LoginForm from '../../components/Login/LoginForm';
import { GoogleOAuthProvider } from '@react-oauth/google';

<GoogleOAuthProvider clientId="<your_client_id>">...</GoogleOAuthProvider>;

const Login = function () {
    return (
        <div className="login-container">
            <div className="login-left-container">

                <Illustration></Illustration>

            </div>
            <div className="login-right-container">

                <GoogleOAuthProvider clientId = {process.env.REACT_APP_GOOGLE_CLIENT_ID} >
                    <LoginForm></LoginForm>
                </GoogleOAuthProvider>


            </div>
        </div>
    );
}


export default Login;
