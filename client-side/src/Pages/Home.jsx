import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from '../Components/Button/Button';

export const Home = () => {
  return (
    <div className="homePage">
      <Link to='/Login'>
        <Button 
          className="loginBtn"
          value = "Login"
          btnType = "submit"
          btnName = "LoginButton"/>
      </Link>
      <Link to='/Register'>
        <Button 
          className="registerBtn"
          value = "Register"
          btnType = "submit"
          btnName = "RegisterButton"/>
      </Link>
      
    </div>
  )
}
