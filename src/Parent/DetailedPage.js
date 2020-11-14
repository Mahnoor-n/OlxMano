import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getSpecificAdsId } from '../config/firebase'
import { Header, ChildHeader } from './Header'
import img1 from '../images/img1.jpg'
import dp from '../images/dp.jpg'
import './detail.css'
import firebase from 'firebase';
// import {moment} from 'moment';
import * as moment from 'moment';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function DetailPage() {

    const { adsID } = useParams()
    const { userID } = useParams()
    const history = useHistory()
    const [adsData, setAdsData] = useState([])
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetchAdsData()
        // fetchUsers()
    }, [])

    const fetchAdsData = async () => {
        const db = firebase.firestore()
        const results = await db.collection("posts").doc(adsID).get()
        // console.log("adsId from detail pageeeeee",adsID)
        console.log('uadsDataa *****===', adsData)
        setAdsData(results.data())
        setUserData(results.data().userProfile)
    }

    // const fetchUsers = async () => {
    //     const db = firebase.firestore();
    //     const myUid = localStorage.getItem('userId')
    //     const data = await db.collection("users").doc(myUid).get()
    //     console.log("ušerId from detail pageeeeee", myUid)
    //     setUserData(data.data());
    // };
console.log("userData*********************** detail page",userData)
    const moment = require('moment');
    const todayy = moment().format('LLLL');;
    // alert(today.format());
    adsData.today = todayy
    // console.log('AdsData*******************************************************', todayy)
    // console.log('AdsData*******************************************************', setAdsData)


    return (
        <div>
            < Header />
            < ChildHeader />

            <div className=" detail container-fluid p-5">
                {adsData &&
                    <div className="row">
                        <div className="col-md-7">
                            <div className="card shadow ml-3 " style={{ border: '1px solid lightgrey' }}>
                                <img className="card-img-top" style={{ padding: 60 }} src={adsData.addsURL} alt="Post Image" />
                            </div>
                        </div>

                        <div className="col-md-5">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card  mb-3">
                                        <i className="fa fa-heart-o"></i>
                                        <div className="card-body">
                                            <p className="price">RS {adsData.price}</p>
                                            <p className="title">{adsData.title}</p>
                                            <p className="state">{adsData.place}</p>
                                            <p className="time">{adsData.date}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <p className="Seller-Desc">Seller Description</p>
                                            {userData && 
                                            <img src={userData.fileUrl} className="dp rounded-circle" width="70" /> }
                                            <p className="Name">{adsData.name}</p>
                                            <Link to="/chats">
                                                <button className="btn w-100">Chat with seller</button>
                                            </Link>
                                            <i className="fa fa-phone"></i>
                                            <p className="phone">{adsData.number}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <p className="place">Posted In</p>
                                            <p className="state">{adsData.place}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
export default DetailPage;
