import { useEffect, useState } from "react";
import './App.css';
import greentick from "./greentick.jpg";
import redcross from "./redcross.jpg";

function Header() {
  return (
    <div>
      <h1 className="header">
        Geo Location Finder
      </h1>
    </div>
  );
}

const GeoLocation = () => {
  const [data, setData] = useState();
  const [details, setDetails] = useState(null);
  const [valid, setValid] = useState(false);
  const isIp = require('is-ip');
  
  useEffect(() => {
    const regexipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (regexipformat.test(data)) {
      setValid(true);
    } else {
      setValid(false);      
    }
  }, [data]);

  const getGeolocationDetails = () => {
    var inputVal = document.getElementById("myInput").value;
    if(isIp.v4(inputVal)){
      var data1 = inputVal
      fetchData(); 
    } else if((inputVal = " ")) {
      data1 = inputVal
      fetchData();
    }

    function fetchData(){
    fetch(
      `https://freegeoip.app/json/${data1}`
    )
      .then(response => response.json())
      .then(data => setDetails(data));
    }    
  };

  const handleChange = (e) => {
    setData(e.target.value);
  };
  
  return (
    <div className="App">
      <Header />
      <div>
        <input type="text" id="myInput" onChange={handleChange} placeholder="Enter your IP"/>
        {valid ? <p className="green" >Valid <img src={greentick} height={20} alt = "correct"/></p> : <p className="pink">You have entered an invalid IP address! <img src={redcross} height={20} alt = "incorrect"/></p>}
        <button type="submit"onClick={getGeolocationDetails}>Submit</button><br/><br/>
          <div>
            {details && (
              <table className="center">
                <thead>
                  <tr><th>IP </th><td>{details.ip} </td></tr>
                  <tr><th>Country Code </th><td>{details.country_code} </td></tr>
                  <tr><th>Country Name </th><td>{details.country_name} </td></tr>
                  <tr><th>Region Name </th><td>{details.region_name} </td></tr>
                  <tr><th>Region Code </th><td>{details.region_code} </td></tr>
                  <tr><th>City </th><td>{details.city} </td></tr>
                  <tr><th>Zip Cod </th><td>{details.zip_code} </td></tr>
                  <tr><th>Time Zone </th><td>{details.time_zone} </td></tr>
                  <tr><th>Latitude </th><td>{details.latitude} </td></tr>
                  <tr><th>Longitude </th><td>{details.longitude} </td></tr>
                  <tr><th>Metro Code </th><td>{details.metro_code} </td></tr>
                </thead>
              </table>
              )}
          </div>
      </div>
    </div>
  );
};

export default GeoLocation;