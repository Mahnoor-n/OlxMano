import React from 'react'
import './Login.css'
import googleIcon from '../../images/google.png'
import fbIcon from '../../images/facebook.png'
import emailIcon from '../../images/email.png'
import phoneIcon from '../../images/phone.png'
import olxImg from '../../images/olx.png'
import { BrowserRouter as Router,Route,Link } from "react-router-dom";
import { googleProvider, auth } from "../../config/firebase";
import { useHistory } from "react-router-dom"
import swal from 'sweetalert';


export const Login = () => {
  /*
  const history=useHistory()
const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider).then((res) => {
    // alert(res.user)
    swal("Logged In", "You are logged in sucessfully!", "success");
    history.replace('/mainOLX')
}).catch((error) => {
    alert(error.message)
  })
}*/

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 mt-5">
          <div className="card shadow mt-5">
            <div className="card-header text-center">
              <img src={olxImg} width="60" alt=""/>
            </div>
            <div className="card-body">
              <div>
                {/* <button onClick={signInWithGoogle} className="google"><img src={googleIcon} style={{marginRight:15}} width="25" />Sign In with Google</button><br/> */}
                <button  className="google"><img src={googleIcon} style={{marginRight:15}} width="25" />Sign In with Google</button><br/>

                <button className="facebook"><img src={fbIcon} style={{marginRight:10}} width="28" />Sign In with Facebook</button><br/>
                <Link to="/emailLogin"><button className="email"><img src={emailIcon} style={{position:'relative', right:15}} width="28" />Sign In with Email</button><br/></Link>
                <button className="phonee"><img src={phoneIcon} style={{position:'relative', right:15}} width="24" />Sign In with Phone</button><br/>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  )
}
