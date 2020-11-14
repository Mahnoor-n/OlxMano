import React, { useState, useEffect } from 'react'
import './Login.css'
import { useHistory } from "react-router-dom"
import olxImg from '../../images/olx.png'
import { BrowserRouter as Router,Route,Link } from "react-router-dom";
import { loginUser } from '../../config/firebase'
import swal from 'sweetalert';

export default function Email(isLoggedIn){
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
/*
  const onLogin = async () => {
   const user = await loginUser({email, password})
   console.log('user logged In' ,user)
    history.replace('/mainOLX')
  //  localStorage.setItem('userid', user.user.uid)
  }*/
  const onLogin = async function () {
    try {
        const user = await loginUser(email, password)
        history.push('/sell')
        swal("Good job!", "You are logged in sucessfully!", "success");
        console.log('user logged In' ,user)
        localStorage.setItem("userId", user.user.uid)

    } catch (error) {
        // setMessage(error.message)
        swal("Oops!", "Something wents wrong!", "warning");

    }
}

  return (
    
    <div className="container email">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 mt-5">
          <div className="card shadow mt-5">
            <div className="card-header text-center">
              <img src={olxImg} width="60" alt=""/>
            </div>
            <div className="card-body">
              <input className="enterEmail" type="text" placeholder="Enter your Email"
              onChange={e => setEmail(e.target.value)}
              /><br/><br/>

              <input className="enterPass" type="password" placeholder="Enter your Password"
              onChange={e => setPassword(e.target.value)} 
              /><br/><br/>

              <button className="login" onClick={onLogin}>Login</button>
              <Link to="emailSignUp"><p>Not logged in?</p></Link>
            </div>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  )
}
