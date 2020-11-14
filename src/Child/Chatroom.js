import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { sendMessageToDb, getMessages, joinRoom } from '../config/firebase'
import dp from '../images/dp.jpg'
import * as firebase from 'firebase';
import {getFriendData} from '../config/firebase'


export default function Chatroom() {
   const {chatId} = useParams()
   const userId = localStorage.getItem('userId')
   const [message, setMessage] = useState('')
   const [messages, setMessages] = useState([])
   const [userData, setUserData]=useState([])
   const [friendData, setFriendData]=useState([])
   const { friendId } = useParams()
   const friend = localStorage.getItem('friend')

   useEffect(() => {
      renderMessages()
      fetchUserData();
      fetchDp();
   }, [])

   const renderMessages = async() =>{
      const response = await getMessages(chatId)
      const tempMessages=[]
      response.forEach(doc=>{
         tempMessages.push(doc.data())
      })
      setMessages(tempMessages)
      // setMessage('')
   }



   const sendMessage = async () => {
      await sendMessageToDb(message, chatId)
      renderMessages()
   }

   const fetchDp = async () => {
      // async function fetchDp() {
          if (friend != null) {
              const db = firebase.firestore();
            //   const friendUid = localStorage.getItem('friend')
              const data = await db.collection("users").doc(friend).get()
              console.log("ušerId from Heaqder pageeeeee", friend)
              setFriendData(data.data());
          }
      }
   
  const fetchUserData = async () => {
    try {
      const response = await getFriendData()
      const tempUsers = []
      response.forEach(doc => {
        tempUsers.push({ ...doc.data(), id: doc.id })
      })
      setUserData(tempUsers)
    } catch (e) {
      alert(e.message)
    }
  }
  console.log("userData**** from chatroom", userData)
  console.log("Friend ID**** from chatroom", userData)

  return (

      <div>
         <div className="right-card card h-100">
            <div className="card-header">
               <div className="row">
                  <div className="col-md-1">
                     {friendData && 
                     <img src={friendData.fileUrl} width="41px" className="rounded-circle" alt="" />                     
                     }
                  </div>
                  <div className="col-md-11">
                     <span className="d-none d-md-block " style={{position:'absolute', top:8 ,fontWeight:700, color:"#142e2e"}}>{friendData.fullName}</span>
                     <i className="fa fa-close" style={{position:'absolute', right:5, top:10}}></i>
                  </div>
               </div>
            </div>

            <div className="card-body" style={{height:'500px'}} >
               {messages.map(item => {
                  return <div style={{
                     textAlign:userId === item.userId ? 'right' : 'left', 
                     marginBottom:20,
                  }}
                  // key={item.timeStamp}
                  >
                     <p style={{
                        background:userId===item.userId 
                        ? 'linear-gradient(#6e9eeb, #547fc4, #3e65a3)'
                        : 'linear-gradient(#757575, #666665, #363535)',
                        color:'white',
                        display:'inline',
                        padding:'5px 15px 15px 15px',
                        borderRadius:'7px',
                        }}
                     >
                        {item.message}
                     </p>
                     <p style={{fontSize:9, color:'lightgrey', marginTop:-1}}>
                     {item.timeStamp}
                     </p>
                     <br />
                  </div>
               })}
            </div>

            <div className="card-footer">
               <div className="row">
                  <div className="col-md-1 col-2">
                     <i className="fa fa-file-image-o" style={{fontSize:20, marginTop:6, marginLeft:7}}></i>
                  </div>
                  <div className="col-md-10 col-8">
                     <input type="text" placeholder="Type Here" className="form-control form-rounded" 
                     style={{border:'none', backgroundColor:"#ebebeb", borderRadius:"20px" , boxShadow:"1px 1px 3px 1px darkgrey"}}
                     onChange={e => setMessage(e.target.value)}
                     />
                  </div>
                  <div className="col-md-1 col-2">
                     <i className="fa fa-sign-in" style={{fontSize:20,marginTop:6}} onClick={()=>sendMessage()} id="button"></i>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
