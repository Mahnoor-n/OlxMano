import React, { useState, useEffect } from 'react'
import { getAllUsers, joinRoom } from '../config/firebase'
import { useHistory } from 'react-router-dom'
import emptyChat from '../images/emptyChat.webp'
import dp from '../images/dp.jpg'
import './chat.css'

export const EmptyChat = () => {
  return (
    <div className="card h-100">
      <div style={{ textAlign: 'center', marginTop: 50 }}>
        <p>No measges, yet?</p>
        <img src={emptyChat} alt="" />
        <p>We will keep messages for any item you're selling in here</p>
      </div>
    </div>
  )
}

export default function Chat() {
  const [users, setUsers] = useState([])
  const history = useHistory()
  const userId = localStorage.getItem('userId')

  // useEffect(async() => {
  //   try{
  //     const response = await getAllUsers()
  //     const tempUsers = []
  //     response.forEach(doc => {
  //     tempUsers.push({...doc.data(), id:doc.id})
  //   })    
  //     setUsers(tempUsers)
  //   } catch(e){
  //     alert(e.message)
  //   }
  // }, [])


  useEffect(() => {
    renderUsers()
  }, [])

  const renderUsers = async () => {
    try {
      const response = await getAllUsers()
      const tempUsers = []
      response.forEach(doc => {
        tempUsers.push({ ...doc.data(), id: doc.id })
      })
      setUsers(tempUsers)
    } catch (e) {
      alert(e.message)
    }
  }

  const navigateToChat = async (id) => {
    const chatroom = await joinRoom(id)
    console.log('chatroom***', chatroom.id)
    history.push(`/chatroom/${chatroom.id}`)
  }


  return (

    <div className="container mt-4">
      <div className="row">

        <div className="col-md-4">
          <div className="left-card card" style={{ height: '455px' }}>
            <div className="card-header p-3">
              <h5 style={{ fontWeight: 700, color: "#142e2e", display: "inline-block", paddingTop: 4 }}>INBOX</h5>
              <i className="fa fa-search" style={{ position: "absolute", right: 30, marginTop: 5, fontSize: 18, color: 'grey' }}></i>
              <i className="fa fa-ellipsis-v" style={{ position: "absolute", right: 15, marginTop: 6, fontSize: 19, color: 'grey' }}></i>
            </div>
            <div className="body">
              <ul style={{ listStyleType: 'none' }}>
                {users.map(({ fullName, id,fileUrl }) => {
                  return id !== userId && <li key={id} onClick={() => navigateToChat(id)}>
                    <div className="row">
                      <div className="col-lg-2 col-md-2 col-sm-12 col-12">
                        <img src={fileUrl} width="37px" className="rounded-circle" alt="" />
                      </div>
                      <div className="col-lg-10 col-md-10 col-sm-12 col-12" style={{ cursor: "pointer" }}>
                        <span className="d-none d-md-block " style={{ fontWeight: 700, color: "#142e2e" }}>{fullName}</span>
                        <p style={{ color: 'grey', fontSize: 13 }}>It is your message</p>
                      </div>
                    </div>
                  </li>
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="right-card card" style={{ height: '455px', marginLeft: -30 }}>
            <EmptyChat />
          </div>
        </div>

      </div>
    </div>
  )
}