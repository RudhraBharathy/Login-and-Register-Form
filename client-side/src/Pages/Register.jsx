import React ,{ useState } from 'react';
import Axios from 'axios';
import './styles.css';
import WavesImg from '../assets/Images/waves.png'
import { AiFillEye } from 'react-icons/ai';
import { AiFillEyeInvisible } from 'react-icons/ai';




export const Register = () => {
  const [userNameReg,setUserNameReg] = useState("");
  const [emailReg,setEmailReg] = useState("");
  const [passwordReg,setPasswordReg] = useState("");
  const [confirmPasswordReg,setConfirmPasswordReg] = useState("");
  const [emailDuplication,setEmailDuplication] = useState("");
  const [PasswordShow, setPasswordShow] = useState(false);
  const [ConfirmPasswordShow, setConfirmPasswordShow] = useState(false);
  let noEmailDuplex = false;

  const borderColorChange = (color) => {
    if(color==="green"){
      return "1px solid green";
    }
    else{
      return "1px solid red";
    }
  }  

  
  
  const formSubmit = () => {
    let userName = document.getElementById("userName");
    let email = document.getElementById("email");
    let password = document.getElementById("passwordArea-1");
    let confirmPassword = document.getElementById("passwordArea-2");
    let form = document.querySelector("form");
    
    if(userName.value.length!==0){
      userName.style.border = borderColorChange("green");
    }
    else{
      userName.style.border = borderColorChange("red");
    }
    
  
    if(email.value.length!==0){
      email.style.border = borderColorChange("green");
    }
    else{
      email.style.border = borderColorChange("red");
    }
    if (password.value === confirmPassword.value && password.value.length !== 0 && confirmPassword.value.length !== 0) {
      password.style.border = borderColorChange("green");
      confirmPassword.style.border = borderColorChange("green");
    }
    else {
      password.style.border = borderColorChange("red");
      confirmPassword.style.border = borderColorChange("red");
      password.value="";
      confirmPassword.value="";
    }
    const isEmailDuplicated = () => {
      Axios.post("http://localhost:3001/register",{
      email: emailReg
      }).then((response) => {
        if(response.data.message){
          setEmailDuplication(response.data.message);
        }
        if(response.data.noDuplex){
          noEmailDuplex = response.data.noDuplex;
          if(noEmailDuplex===true){
            form.submit();
            Axios.post("http://localhost:3001/register/userdata",{
            username: userNameReg,
            email: emailReg,
            password: passwordReg,
            confirmpassword: confirmPasswordReg,}).then((response) => {
              form.reset();
            });
          }
        }   
        if(response.data.err){
          console.log(response.data.err);
        }   
        
    });
    }
  
    if(userName.value.length !== 0 && email.value.length !== 0 && password.value.length !== 0 && confirmPassword.value.length !== 0 && password.value === confirmPassword.value && noEmailDuplex===false){
      isEmailDuplicated();
    }

    
  }


  const togglePasswordShowValue = () => {
    setPasswordShow(!PasswordShow);
  };

  const toggleConfirmPasswordShowValue = () => {
    setConfirmPasswordShow(!ConfirmPasswordShow);
  };

  return (
    <div className="registerPage">
      <div className="registerCard">
        <img className="wavesImg" src={WavesImg} alt="WavesImage" />
        <h1 className="registerTitle">Register</h1>
        <form className="registerForm">
          <input id="userName" type="name" placeholder="Username" onChange={(e)=>{setUserNameReg(e.target.value);}} required></input>
          <input id="email" type="email" placeholder="Email" onChange={(e)=>{setEmailReg(e.target.value);}} required></input>
          <div className="inputField-eyeIcon">
          <input type={ PasswordShow ? 'text' : 'password'} id="passwordArea-1" placeholder="Password" onChange={(e)=>{setPasswordReg(e.target.value);}} required></input>
          <span className='eyeicon-1' onClick={togglePasswordShowValue}>{PasswordShow ? <AiFillEye /> : <AiFillEyeInvisible />}</span>
          </div>
          <div  className="inputField-eyeIcon">
            <input type={ ConfirmPasswordShow ? 'text' : 'password'} id="passwordArea-2" placeholder="Confirm Password" onChange={(e)=>{setConfirmPasswordReg(e.target.value);}} required></input>
            <span className='eyeicon-2' onClick={toggleConfirmPasswordShowValue}>{ConfirmPasswordShow ? <AiFillEye /> : <AiFillEyeInvisible />}</span>
          </div>
          <p className="emailIdDuplex">{emailDuplication}</p>
          <input onClick={formSubmit} type="button" className="registerSubmitBtn" value="Sign up"></input>
        </form> 
      </div>
    </div>
  )
}
