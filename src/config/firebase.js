import * as firebase from 'firebase';
import 'firebase/database'
import 'firebase/auth';
import { YoutubeSearchedFor } from '@material-ui/icons';
import swal from 'sweetalert';

var firebaseConfig = {
  apiKey: "AIzaSyDfUjrFCT9wdZZR0ayvmJqAkPg1zT3D0pc",
    authDomain: "olx-b9e33.firebaseapp.com",
    databaseURL: "https://olx-b9e33.firebaseio.com",
    projectId: "olx-b9e33",
    storageBucket: "olx-b9e33.appspot.com",
    messagingSenderId: "247500360716",
    appId: "1:247500360716:web:f713b7dbf1883388adb229",
    measurementId: "G-XSHYT6TQYN"
  // apiKey: "AIzaSyD078mp2hZcyt1iI0hkt8Rv57DFX9S7tKw",
  // authDomain: "olxcreatedbyowais.firebaseapp.com",
  // databaseURL: "https://olxcreatedbyowais.firebaseio.com",
  // projectId: "olxcreatedbyowais",
  // storageBucket: "olxcreatedbyowais.appspot.com",
  // messagingSenderId: "283515172310",
  // appId: "1:283515172310:web:18719a6554d3ba2e55a077",
  // measurementId: "G-JZN7ZNN4YC"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.database();
const db = firebase.firestore()


// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: 'select_account' });
// export const signInWithGoogle = () => auth.signInWithPopup(provider);

function getSpecificAdsId(adsID) {
  return db.collection("posts").doc(adsID).get()
}

async function registerUser({ email, password, fullName, phone, fileUrl }) {
  try {
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
    db.collection('users').doc(user.user.uid).set({ email, fullName, phone, fileUrl, password })
    swal("Good job!", "You are Registerd sucessfully!", "success");
  } catch (e) {
    alert(e.message)
    swal("Oops!", "Something wents wrong!", "warning");
  }
}

function loginUser(email, password) {
  return auth.signInWithEmailAndPassword(email, password)
}

async function getAllUsers() {
  return await db.collection("users").get()
}

async function joinRoom(friendId, chatId) {
  const myUid = localStorage.getItem('userId')
  try {
    console.log('myUid , friendId', myUid, friendId, chatId)
    var response = await db.collection("chatroom")
      .where('user1', '==', myUid)
      .where('user2', '==', friendId)
      .get()
    console.log('response****', response)
    let foundChatroom = false
    response.forEach(doc => {
      console.log('docData****', doc.data())
      foundChatroom = { ...doc.data(), id: doc.id }
      console.log("friendId***** from firebase  ",friendId)
      localStorage.setItem("friend", friendId)

    })

    if (foundChatroom) return foundChatroom

    var response = await db.collection("chatroom")
      .where('user2', '==', myUid)
      .where('user1', '==', friendId)
      .get()
    foundChatroom = false
    response.forEach(doc => {
      console.log('docData****', doc.data())
      foundChatroom = { ...doc.data(), id: doc.id }
      console.log("friendId***** from firebase  ",friendId)
      localStorage.setItem("friend", friendId)
    })
    if (foundChatroom) return foundChatroom

    return await db.collection('chatroom').add({
      user1: myUid,
      user2: friendId,
      timeStamp: new Date().toLocaleTimeString(),
    })

  } catch (e) {
    alert(e.message)
  }
}
function sendMessageToDb(message, chatId) {
  const myUid = localStorage.getItem('userId')
  // const today = new Date(),
  // date = new Date().toLocaleDateString();
  db.collection('chatroom').doc(chatId).collection('messages').add({
    message,
    userId: myUid,
    timeStamp: new Date().toLocaleTimeString(),
    dateStamp: new Date().toLocaleDateString()
  })
}

async function getMessages(chatId) {
  return db.collection("chatroom").doc(chatId).collection('messages').orderBy("timeStamp","asc").get()
}


function signOut() {
  firebase.auth().signOut()
}
// Sign-out successful.

async function getFriendData() {
  return await db.collection("users").get()
}

export {
  firebase,
  getSpecificAdsId,
  registerUser,
  loginUser,
  getAllUsers,
  joinRoom,
  sendMessageToDb,
  getMessages,
  signOut,
  getFriendData
}