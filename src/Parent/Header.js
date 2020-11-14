import React, { useState, useEffect } from 'react'
import logo from '../images/olx.png'
import { firebase } from '../config/firebase'
import oneImg from '../images/1.webp'
import twoImg from '../images/2.webp'
import threeImg from '../images/3.webp'
import banner from '../images/banner-1.jpg'
import { signInWithGoogle } from '../config/firebase';
import { auth } from '../config/firebase';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import firebase from "firebase";
import { useHistory } from "react-router-dom";
import { signOut } from '../config/firebase'


function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDp, setUserDp] = useState([]);

    let userId = localStorage.getItem('userId')
    useEffect(() => {
        fetchDp()
        checkUser()
    }, [])

    const fetchDp = async () => {
    // async function fetchDp() {
        if (userId != null) {
            const db = firebase.firestore();
            const myUid = localStorage.getItem('userId')
            const data = await db.collection("users").doc(myUid).get()
            console.log("ušerId from Heaqder pageeeeee", myUid)
            setUserDp(data.data());
        }
    }
    console.log("ušerId from detail pageeeeee", userDp)

    const logOut = async function () {
        try {
            const user = await signOut()
            localStorage.removeItem('userId')
            alert("signout sucecsfully")
        } catch (e) {
            alert(e.message)
        }
        setIsLoggedIn(true)
    }
    const checkUser = () => {
        let userId = localStorage.getItem('userId')
        if (userId != null) {
            setIsLoggedIn(true)
        }
    }
    return (
        <div className="container-fluid header">

            <div className="row">

                <div className="img">
                    <img src={logo} />
                </div>

                <div className="search-city">
                    <i className="fa fa-search"></i>
                    <input type="text" placeholder="Search city area or location" />
                    <i className="fa fa-angle-down"></i>
                </div>

                <div className="search-things">
                    <input type="text" placeholder="Find Cars, Mobile phones and more.." />
                </div>

                <div className="search-icon">
                    <i className="fa fa-search"></i>
                </div>

                <div className="icons">
                    <Link to="/chats"><i className="fa fa-comment-o"></i></Link>
                    <i className="fa fa-bell-o"></i>


                    {!isLoggedIn && userId === null
                        ?
                        <Link to="/Multilogin"><a style={{ fontWeight: 700, marginRight: 12, position: 'relative', top: -6 }}>Login</a></Link>
                        :
                        // <a  onClick={logOut}  style={{marginLeft:10, padding:10}}>LogOut</a> 
                        <React.Fragment>
                            <img className="rounded-circle" src={userDp.fileUrl} width="30px" />
                            <div className="dropdown">
                                <span className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="fa fa-angle-down"></i>
                                </span>
                                <div className="dropdown-menu">
                                    <a onClick={logOut} style={{ marginLeft: 10, padding: 10 }}>LogOut</a>
                                    {/* <a  onClick={() => firebase.auth().signOut()}  style={{marginLeft:10, padding:10}}>LogOut</a> */}
                                </div>
                            </div>
                        </React.Fragment>
                    }

                    {/* <Link to="/Multilogin"><a style={{fontWeight:700, marginRight:12, position:'relative', top:-6}}>Login</a></Link> */}
                    <button>
                        <Link to="/sell">
                            <i className="fa fa-plus" style={{ color: 'black' }}></i><span style={{ color: 'black' }}>SELL</span>
                        </Link>
                    </button>
                </div>

            </div>

        </div>

    )
}



class ChildHeader extends React.Component {

    Hello = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
    }

    render() {
        return (
            <div className="container-fluid ChildHeader">
                <div className="row">

                    <div className="categories">ALL CATEGORIES
                            <i className="fa fa-angle-down"></i>
                    </div>

                    <div className="divCategory">
                        <span> Mobile Phones </span>
                        <span> Cars </span>
                        <span> Motorcycles </span>
                        <span> Houses </span>
                        <span> TV - Video-Audio </span>
                        <span> Tablets </span>
                        <span > Land & Plots </span>
                    </div>

                    <div className="divCategory1">
                        <span> M.. </span>
                        <span> Cars </span>
                        <span> M.. </span>
                        <span> H.. </span>
                        <span> TV. </span>
                        <span> T.. </span>
                        <span > L.. </span>
                    </div>

                </div>

            </div>
        )
    }
}

class Banner extends React.Component {
    render() {
        return (
            <div>
                <img src={banner} width='100%' alt="" />
            </div>
        )
    }
}

export {
    Header,
    ChildHeader,
    Banner,
};