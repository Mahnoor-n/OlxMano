import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import img1 from "../images/img1.jpg";
import "./Home.css";
import firebase from "firebase";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GetSpecificAdsId from "../config/firebase";
// import detail from './DetailedPage'

function HomeAdds() {
  const history = useHistory();
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    const db = firebase.firestore();
    const data = await db.collection("posts").get();
    const AdsShow = [];
    data.forEach((doc) => {
      console.log("ID OF Document ****************** ", doc.id);
      AdsShow.push({ ...doc.data(), adsID: doc.id });
    });
    setAds(AdsShow);
    console.log(AdsShow);
  };

  return (
    <div className="Home container-fluid pl-5 pr-5">
      <div className="row">
        {ads.map((ads) => (
          <div className="col-md-3">
            <div className="card shadow"   onClick={() => history.push(`./detail/${ads.adsID}`)} style={{ marginTop: "27px" }}>
              {/* <Link to="/detail"> */}
              <div className="img">
                <img
                  style={{ height: "13rem" }}
                  className="card-img-top"
                  key={ads.addsURL}
                  src={ads.addsURL}
                  alt=""
                />
              </div>
              <button>FEATURED</button>
              <i className="fa fa-heart-o"></i>
              <div className="card-body">
                <span className="price">RS {ads.price}</span>
                <span className="card-text">{ads.title}</span>
                {/* <span className="card-text" onClick={() => history.push(`./detail/${ads.adsID}`)} > go to detail page </span> */}
        <span className="time">{ads.date}</span>
              </div>
            </div>
          </div>
        ))}
        <br />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default HomeAdds;
