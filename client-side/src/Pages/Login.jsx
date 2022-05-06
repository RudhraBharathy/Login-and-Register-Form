import React ,{ useState } from 'react';
import Axios from 'axios';
import './styles.css';
import WavesImg from '../assets/Images/waves.png'
import { AiFillEye } from 'react-icons/ai';
import { AiFillEyeInvisible } from 'react-icons/ai';


export const Login = () => {
  const [PasswordShow, setPasswordShow] = useState(false);
  const [emailLog,setEmailLog] = useState("");
  const [passwordLog,setPasswordLog] = useState("");
  const [formMessage,setFormMessage] = useState("");
  const togglePasswordShowValue = () => {
    setPasswordShow(!PasswordShow);
  };

  const borderColorChange = (color) => {
    if(color==="green"){
      return "1px solid green";
    }
    else{
      return "1px solid red";
    }
  }
  const passwordValidation = () => {
    let email = document.getElementById("email");
    let password = document.getElementById("passwordArea-1");
    let form = document.querySelector("form");
    
    if(email.value.length!==0){
      email.style.border = borderColorChange("green");
    }
    else{
      email.style.border = borderColorChange("red");
    }

    if(password.value.length!==0){
      password.style.border = borderColorChange("green");
    }
    else{
      password.style.border = borderColorChange("red");
    }
    const loginAuth = () => {
      Axios.post("http://localhost:3001/login",{
      email: emailLog,
      password: passwordLog
      }).then((response) => {
        if(response.data.incorrectAuthValues){
            setFormMessage(response.data.incorrectAuthValues)
            email.style.border = borderColorChange("red");
            password.style.border = borderColorChange("red");
        }
        else{
            if(response.data.message){
                form.submit();
                Axios.post("http://localhost:3001/login/userdata",{
                    email: emailLog}).then((response) => {
                    form.reset();
                })
            }
        }
      });
    }
    if(email.value.length !== 0 && password.value.length !== 0){
      loginAuth();
    }

    
  }
  return (
    <div className="registerPage">
      <div className="registerCard">
        <img className="wavesImg" src={WavesImg} alt="WavesImage" />
        <h1 className="registerTitle">Login</h1>
        <form className="registerForm">
            <input id="email" type="email" placeholder="Email" onChange={(e)=>{setEmailLog(e.target.value);}} required></input>
            <div className="inputField-eyeIcon">
                <input type={ PasswordShow ? 'text' : 'password'} id="passwordArea-1" placeholder="Password" onChange={(e)=>{setPasswordLog(e.target.value);}} required></input>
                <span className='login-eyeicon-1' onClick={togglePasswordShowValue}>{PasswordShow ? <AiFillEye /> : <AiFillEyeInvisible />}</span>
            </div>
            <p className="message">{formMessage}</p>
            <h5 className="forget-pass">Forget Password ?</h5>
            <input onClick={passwordValidation} type="button" className="loginSubmitBtn" value="Login"></input>
        </form> 
      </div>
    </div>
  )
}
