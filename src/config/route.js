import React from 'react'
import {
    BrowserRouter as Router, //alias (nickname)
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import MainOLX from '../Parent/MainOLX'
import {Selling, SellingAdd} from '../Child/Sell'
import DetailPage from '../Parent/DetailedPage'
import { Login } from '../Parent/login/Login'
import  Email  from '../Parent/login/EmailLogin'
import { EmailSignUp } from '../Parent/login/EmailSignUp'
import Chat from  '../Child/Chat'
import Chatroom from '../Child/Chatroom'

export default function MainRouter ({ isLoggedIn, isLoading }) {
    if (isLoading) return <img width="150" style={{marginLeft:'45%',marginTop:'15%'}} src='https://cdn.lowgif.com/small/ee5eaba393614b5e-pehliseedhi-suitable-candidate-suitable-job.gif' /> 
    console.log('window.location.pathname***', window.location.pathname)
    const currentPath = window.location.pathname.length === 1 ? '/' : window.location.pathname

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/"  exact>
                        <Redirect to={currentPath} /> <MainOLX />
                    </Route>
                    <Route path="/sell">
                        {isLoggedIn ? <Redirect to={currentPath} /> && <Selling /> : <MainOLX />}
                    </Route>
                    {/* <Route path="/mainOLX" component={MainOLX}></Route> */}
                     <Route path="/sellingadd">
                     {/* {isLoggedIn ? <Redirect to={currentPath} /> && <SellingAdd /> : <MainOLX />} */}
                        {AuthChecker(isLoggedIn, <SellingAdd />)}
                    </Route>
                    {/* <Route path="/detail" component={DetailPage}></Route> */}
                    <Route path="/detail/:adsID">
                        {/* {AuthChecker(isLoggedIn, <DetailPage />)} */}
                        <DetailPage/>
                    </Route>
                    {/* <Route path="/Multilogin" component={Login}></Route> */}
                    <Route path="/Multilogin">
                        <Login/>
                    </Route>
                    <Route path="/emailLogin">
                    {/* {isLoggedIn ? <Redirect to={currentPath} /> && <Selling /> : <Email />} */}
                        <Email/>
                    </Route>
                    <Route path="/emailSignUp" component={EmailSignUp}></Route>
                    {/* <Route path="/chats" component={Chatting}></Route> */}
                    {/* <Route path="/chats"> */}
                    {/* {isLoggedIn ? <Redirect to={currentPath} /> && <Chat /> : <Email />} */}
                    {/* </Route> */}
                    <Route path="/chats" >
                    {AuthChecker(isLoggedIn, <Chat />)}
                    </Route>
                    <Route path="/chatroom/:chatId">
                        {/* {AuthChecker(isLoggedIn, <Chatroom />)} */}
                        <Chatroom />
                    </Route>


                </Switch>
            </div>
        </Router>
    );
}
function AuthChecker(isLoggedIn, component) {
    return isLoggedIn ? component : <Redirect to='/' />
}