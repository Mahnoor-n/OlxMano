import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import { FooterEnd } from '../Parent/footer'
import * as firebase from 'firebase';
import logo from '../images/olx.png'
import dp from '../images/dp.jpg'
import './sell.css'


class Selling extends React.Component {

  myfunc() {
    console.log(this.props)
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light p-3 shadow">
          <a className="navbar-brand" href="#">
            <Link to="/"> <i className="fa fa-arrow-left" style={{ fontWeight: 400, marginRight: 25, marginLeft: 10, color: 'black' }}></i>
              <img src={logo} width="50" alt="" /></Link>
          </a>
        </nav>
        <SellingAdd />
      </div>
    )
  }
}

 class SingleImageUploadComponent extends React.Component {

  constructor(props) {
    super(props)
      this.state = {
          file: null
      }
      this.uploadSingleFile = this.uploadSingleFile.bind(this)
      this.upload = this.upload.bind(this)
  }

  uploadSingleFile(e) {
      this.setState({
          file: URL.createObjectURL(e.target.files[0])
      })
  }

  upload(e) {
      e.preventDefault()
      console.log(this.state.file)
  }

  render() {
      let imgPreview;
      if (this.state.file) {
          imgPreview = <img src={this.state.file} style={{width:'6.1rem', height:'6.7rem', position:"absolute", top:'32%', opacity:0.7}} alt='' />;
      }

    return (
      <form>
        <div className="row form-group">
          <div className="icons card p-4 button-wrapper" style={{ width: '6rem' }}>
            <span class="label"><i className="fa fa-camera" onClick={this.upload}></i></span>
            <input type="file" name="upload" id="upload" class="upload-box form-control" onChange={this.uploadSingleFile} placeholder="Upload File" />
          </div>
        </div>

        <div className="form-group preview">
          {imgPreview}
        </div>
      </form >
    )
  }
}

export default function SellingAdd () {
  const history = useHistory();
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] =useState('')
  const [name, setName] =useState('')
  const [place, setPlace] =useState('')
  const [number, setNumber] =useState('')
  const [fileUrl, setFileUrl] = useState(null)
  const [userProfile, setUserProfile] = useState([]);


  const onFileChange = function (e) {
    const file = e.target.files[0] //files target using this
    const storageRef = firebase.storage().ref(`Adds/${file.name}`); // store in var
    //and take name
    storageRef.put(file).then(function (res) {
      console.log('res****', res)
      res.ref.getDownloadURL().then(function (url) {
        console.log('url--->', url)
        setFileUrl(url)
        console.log('file url fromstate', fileUrl)
      })
    })
  }

  console.log('URLL STATE**************************', fileUrl)
console.log('user profile', userProfile)

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date(),
    // date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() + '-' + today.getSeconds() + ':' + today.getMinutes();
    date = new Date().toLocaleDateString(); // 11/16/2015
    firebase.firestore().collection("posts")
        .add({
            category,
            title,
            description,
            price,
            name,
            place,
            number,
            addsURL: fileUrl,
            date, 
            userProfile,
        }).then(() => {
            alert("Data Has Been Submitted ");
        }).catch((error) => {
            alert(error.message);
        })

    setCategory('') 
    setTitle('')
    setDescription('')
    setPrice('')
    setName('')
    setPlace('')
    setNumber('')
  }
  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const db = firebase.firestore();
    const myUid = localStorage.getItem('userId')
    const data = await db.collection("users").doc(myUid).get()
    console.log("ušerId from sellllll pageeeeee",myUid)
    setUserProfile(data.data());
  };

    return (
      <>
        <form onSubmit={handleSubmit}>
          <div className="category"><br />
            <h4>POST YOUR AD</h4><br />

            <div className="card mainCard" style={{ width: '60rem' }}>
              <div className="card-body">
                <h5>SELECT CATEGORY</h5>
                <Autocomplete
                  id="combo-box-demo"
                  options={top100Films}
                  getOptionLabel={(option) => option.title}
                  style={{ width: 450 }}
                  renderInput={(params) => <TextField {...params} variant="outlined"
                  onChange={(e) => setCategory(e.target.value)} value={category} />}
                />

                <div className="card cardChild p-4" style={{ width: '60rem'}}>

                  <h5>INCLUDE SOME DETAILS</h5>

                  <p>Add Title *</p>

                  <span>
                    <input type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                   />
                    <p>Mention the key features of your item e.g (brand , model , age , type)</p>
                  </span>

                  <p>Description *</p>

                  <span>
                    <textarea id="w3review" name="w3review" rows="4" cols="60"
                  onChange={(e) => setDescription(e.target.value)} value={description} 
                    ></textarea>
                    <p>Include Conditions , features and reason for selling.</p>
                  </span>

                </div>



                <div className="card cardChild p-4" style={{ width: '60rem' }}>
                  <h5>SET A PRICE</h5>
                  <div class="form-text"> 
                    <input type='text' id="youridhere" onChange={(e) => setPrice(e.target.value)} value={price} />  
                    <label for="youridhere" class="static-value">RS </label>
                  </div>
                </div>


                <div className="card cardChild p-4" style={{ width: '60rem' }}
                onChange={onFileChange}
                >
                  <h5>UPLOAD PHOTO</h5>
                  <SingleImageUploadComponent />
                </div>


                <div className="card cardChild p-4" style={{ width: '60rem' }}>
                  <h5>CONFIRM YOUR LOCATION</h5>
                  <p>Place *</p>
                  {/*<Autocomplete
                    id="combo-box-demo"
                    options={top100Films1}
                    getOptionLabel={(option) => option.title}
                    style={{ width: 450 }}
                    renderInput={(params) => <TextField {...params} variant="outlined"
                    onChange={(e) => setPlace(e.target.value)} value={place}
                    />}
                  />*/}
                    <input type='text' id="youridhere"
                    onChange={(e) => setPlace(e.target.value)} value={place}
                    />  

                </div>


                <div className="card cardChild p-4" style={{ width: '60rem' }}>
                  <h5>Review Details</h5>

                  <img src={userProfile.fileUrl} className="rounded-circle" width="100" />
                  {/* <img src={adsData{userProfile:fileUrl}} className="rounded-circle" width="100" /> */}


                  <p className="mt-2">Your Name *</p>
                  <input type='text' onChange={(e) => setName(e.target.value)} value={name}/>

                  <p className="mt-2">Mobile Phone Number *</p>
                  <div class="form-text"> 
                    <input type='text' id="youridhere" onChange={(e) => setNumber(e.target.value)} value={number}/>
                    <label for="youridhere" class="static-value">+92 </label>
                  </div>
                  <span>Show my phone number on my add </span>
                </div>

                <div className="card cardChild p-4" style={{ width: '60rem' }}>
                  <button style={{ width: "10%" }} type="submit" className="btn btn-info ">Post </button>
                </div>

              </div>
            </div>

            <br />
            <FooterEnd />

          </div>
        </form>
      </>
    )
}

const top100Films = [
  { title: 'AC' },
  { title: 'Agriculture' },
  { title: 'Apartments & Flats' },
  { title: 'Books' },
  { title: 'Buses , Vans & Trucks' },
  { title: 'Boats' },
  { title: 'Bicycles' },
  { title: 'Business for sale' },
  { title: 'Beds' },
  { title: 'Birds' },
  { title: 'Cars' },
  { title: 'Cars on Installments' },
  { title: 'Cars Accessories' },
  { title: 'Computers' },
  { title: 'Camera' },
  { title: 'Cooler' },
  { title: 'Construction & Heavy Machine' },
  { title: 'Catering & Restaurent' },
  { title: 'Clothes' },
  { title: 'Carpets' },
  { title: 'Car Rental' },
  { title: 'Cats' },
  { title: 'Chairs' },
  { title: 'Drivers &  Taxi' },
  { title: 'Dogs' },
  { title: 'Education & Classes' },
  { title: 'Electronics & Computer Repair' },
  { title: 'Event Services' },
  { title: 'Fishes' },
  { title: 'Food & Restaurants' },
  { title: 'Fridge & Freezers' },
  { title: 'Farm & Fresh Food' },
  { title: 'Gym Fitness' },
  { title: 'Generator - UPS & Power solutions' },
  { title: 'Garden & Outdoor' },
  { title: 'Houses' },
  { title: 'Health & Beauty' },
  { title: 'Horses' },
  { title: 'Hens' },
  { title: 'Home Appliances' },
  { title: 'Home & Office Repair' },
  { title: 'Home decoration' },
  { title: 'IT jobs' },
  { title: 'Jewellery' },
  { title: 'Kitchen Appliances' },
  { title: 'Kids Bikes' },
  { title: 'Lands & Plots' },
  { title: 'Laptops' },
  { title: 'Landn& Plots' },
  { title: 'Mobile Phones' },
  { title: 'MotorCycles' },
  { title: 'Medical & Pharma' },
  { title: 'Medical jobs' },
  { title: 'Maids & Domestic Help' },
  { title: 'Movers & Packers' },
  { title: 'Makeup' },
  { title: 'Mirrors' },
  { title: 'Musical Instruments' },
  { title: 'Other Business & Industry' },
  { title: 'Other Services' },
  { title: 'Office furniture' },
  { title: 'Online Jobs' },
  { title: 'Other Jobs' },
  { title: 'Part time Jobs' },
  { title: 'per food' },
  { title: 'Paintings' },
  { title: 'Prams' },
  { title: 'Rickshaw & Chingchi' },
  { title: 'Rooms' },
  { title: 'Shops - Offices - Commercial space' },
  { title: 'Spare Parts' },
  { title: 'Spare Parts' },
  { title: 'Scooters' },
  { title: 'Sofa' },
  { title: 'Skin & Hair' },
  { title: 'Sports Equipment' },
  { title: 'TV' },
  { title: 'Tablets' },
  { title: 'Tractr & Trailors' },
  { title: 'Trade & Industrial' },
  { title: 'Travel & Visa' },
  { title: 'Tables & Dining' },
  { title: 'Toys' },
  { title: 'Vacation Rentals - Guest houses' },
  { title: 'Washing Machines & Dryers' },
  { title: 'Web Development' },
  { title: 'Watches' },
  { title: 'Walkers' },
];
/*
const top100Films1 = [
  { title: 'Azad Kashmir' },
  { title: 'Balochistan' },
  { title: 'Capital teritory' },
  { title: 'KPK' },
  { title: 'Punjab' },
  { title: 'Sindh' },
];
*/
export {
  Selling,
  SellingAdd
}