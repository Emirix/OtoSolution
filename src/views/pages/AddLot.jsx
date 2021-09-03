import axios from "axios";
import React, { useState, useEffect } from "react";
import Page from "./Page";
import { Redirect } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { GoogleMap,withScriptjs, Marker,withGoogleMap } from "react-google-maps"


const MyMapComponent = withScriptjs(withGoogleMap((props) => {
  const [lat,setLat] = useState(props.lat)
  const [lng,setLng] = useState(props.lng)

  return(
    <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: lat, lng: lng }}
    onClick={ev => {
      console.log("latitide = ", ev.latLng.lat());
      console.log("longitude = ", ev.latLng.lng());
      setLat(ev.latLng.lat())
      setLng(ev.latLng.lng())
      props.onChange(ev.latLng.lat(),ev.latLng.lng())
    }}
  >
    {props.isMarkerShown && <Marker position={{ lat: lat, lng: lng }} />}
  </GoogleMap>
  )
}))

function AddDealer() {

  const [dealerList,setDealerList] = useState([])
  const [dealer, setDealer] = useState("")
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [adress, setAdress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [p1, setP1] = useState("")
  const [p2, setP2] = useState("")
  const [radius, setRadius] = useState("")

  const url = new URLSearchParams(window.location.search);
  const [data,setData] = useState(null)

  function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

  const [map,setMap] = useState({
    center: {
      lat: 0,
      lng:0
    },
    zoom: 11
  })
  const forceUpdate = useForceUpdate();

  useEffect(()=>{
    axios.get("/admin/api/dealers/",{
      headers:{
        "Authorization" : `Token ${localStorage.getItem("key")}`
      }
    }).then(res=>{
      setDealerList(res.data.results)
    })

    if(url.get("edit")){
      axios.get("/api/dealer/lots/"+url.get("id"),{
        headers:{
          "Authorization" : `Token ${localStorage.getItem("key")}`
        }
      }).then(res=>{
        console.log("EDIT DATA")
        console.log(res.data)
        setData(res.data)
        setDealer(res.data.dealer)
        setName(res.data.name)
        setDesc(res.data.description)
        setAdress(res.data.address)
        setState(res.data.state)
        setP1(res.data.p1_lat)
        setP2(res.data.p1_lon)
        setRadius(res.data.radius)
      })
    }
  },[])

  function edit(){

    axios.patch("https://api2.managedautos.com/api/dealer/lots/1/",{

      "id": 1,
      "created_by": null,
      "updated_by": null,
      "created_at": "2021-08-22T11:11:50.196830Z",
      "updated_at": "2021-09-03T12:46:55.488687Z",
      "name": "Parking Lot Name 1",
      "description": "Pxxxxxxsar",
      "p1_lat": 36.778259,
      "p1_lon": -119.417931,
      "radius": 300.0,
      "address": "Parking Lot Address 1",
      "zip": "Parking Lot City 1",
      "state": "Parking Lot State 1",
      "dealer": 1   
    },{
      headers:{
        "Authorization" : `Token ${localStorage.getItem("key")}`

      }
    }).then(res=>{
      console.log(res)
    })

    

       
       



  
  }

  function add(){
    axios.post("/api/dealer/lots/",{
     
        "name": name,
        "p1_lat": p1,
        "p1_lon": p2,
        "radius": radius,
        "dealer": dealer || null,
        "description": desc || null,
        "address": adress || null,
        "city":"s",
        "state": state || null
      
    },{
      headers:{
        "Authorization" : `Token ${localStorage.getItem("key")}`
      } 
    }).then(res=>{
      console.log(res)
      NotificationManager.success("Lot Created","",2000)
      resetForm()
    }).catch(err=>{
      NotificationManager.error("An error occured","",2000)
    })
  }

  function resetForm(){
    setDealer("")
    setName("")
    setP1("")
    setP2("")
    setRadius("")
    setState("")
    setAdress("")
    setCity("")
    setDesc("")
  }


  return (
    <Page>
      <div className="sayfa">
      <NotificationContainer/>

        <div className="row m-0">
          <input type="file" name="upload" id="upload" className="d-none" />
          <div className="col-lg-6 col-md-12">
            <div className="mini-title">{
              url.get("edit") ? "Edit Parking Lot": "Add New Parking Lot"
            }</div>
            <div className="info-form">
            <select value={dealer} onChange={e=>setDealer(e.target.value)} >
                        <option value="">Select Dealer</option>
                        {dealerList.map(val=>{
                            return(
                                <option value={val.id} key={val.id}>{val.name}</option>
                            )
                        }) || <option>Loading</option>}
              </select>


              <input value={name} onChange={e=>setName(e.target.value)}  placeholder="*Name" />
              <input  value={ desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" />
              <input  value={adress} onChange={e=>setAdress(e.target.value)} placeholder="Address" />
              <input  value={state} onChange={e=>setState(e.target.value)} placeholder="State" />
              <input  value={p1} onChange={e=>{
                setP1(Number(e.target.value))
                console.log(Number(e.target.value))
                
              }} type="number" placeholder="*P1 lat" />
              <input  value={p2} onChange={e=>setP2(e.target.value)} type="number" placeholder="*P1 lon" />
              <input  value={radius} onChange={e=>setRadius(e.target.value)} type="number" placeholder="*Radius" />
             
           
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="add-dealer-sag">
                <div className="mini-title">Map</div>
        <div className="map">

     
      <MyMapComponent
        
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        lat={32.769697}
        lng={-79.935045}
        onChange={(p1,p2)=>{
          setP1(p1)
          setP2(p2)
        }}
        />
               </div>  
            <div className="d-flex mt-3">
                <button onClick={()=>{url.get("edit") ? edit() : add()}} className="btn primary-btn">{url.get("edit") ? "Save Changes" : "Save"}</button>
                <button onClick={()=>{resetForm()}} className="btn ms-3 seconadary-btn">Reset Form</button>
               
                <img src="/icons/delete.svg" className="delete-button ms-auto" />

            </div>
            </div>
          
          </div>
          
        </div>
      </div>
    </Page>
  );
}

export default AddDealer;
