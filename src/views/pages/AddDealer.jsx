import axios from "axios";
import React, { useState, useEffect } from "react";
import Page from "./Page";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import map from "../../assets/img/map.jpg";
import Dropdown from "../components/Dropdown";

function AddDealer() {

  const [autoGroupList,setAutoGroupList] = useState([])

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [zip, setZip] = useState("")
  const [state, setstate] = useState("")
  const [mainAccount, setMainAccount] = useState("")
  const [autoGroup, setAutoGroup] = useState("")

  useEffect(()=>{
    axios.get("/admin/api/auto-groups/",{
      headers:{
        "Authorization" : `Token ${localStorage.getItem("key")}`
    }
    }).then(res=>{
      
      setAutoGroupList(res.data.results)
    })
  },[])

  function resetForm(){
    setName("")
    setDescription("")
    setPhone("")
    setAddress("")
    setZip("")
    setstate("")
    setMainAccount("")
    setAutoGroup("")
  }

  function addDealer(){
    // BURDA KALDINS
    axios.post("/admin/api/dealers/",{
     
        "name": name,
        "description": description,
        "phone": phone || null,
        "address": address || null,
        "zip": zip || null,
        "state": state || null,
        "main_account": mainAccount || null,
        "auto_group": Number(autoGroup) || null
       
    },{
      headers:{
        "Authorization" : `Token ${localStorage.getItem("key")}`
      }
    }).then(res=>{
      
      NotificationManager.success("Dealer Created","",2000)
      resetForm()

    }).catch(err=>{
      NotificationManager.error("Could not create delaer","Check the information",2000)

    })
  }

  return (
    <Page>
      <div className="sayfa">
      <NotificationContainer/>

        <div className="row m-0">
          <input type="file" name="upload" id="upload" className="d-none" />
          <div className="col-lg-6 col-md-12">
            <div className="mini-title">Add New Dealer</div>
            <div className="info-form">
              <input value={name} onChange={e=>setName(e.target.value)} type="text" placeholder="*Name" />
              <input value={description} onChange={e=>setDescription(e.target.value)} type="text" placeholder="*Description" />
              <input value={address} onChange={e=>setAddress(e.target.value)} type="text" placeholder="Address" />
              <input value={state} onChange={e=>setstate(e.target.value)}   type="text" placeholder="State" />  
              <input value={zip} onChange={e=>setZip(e.target.value)} type="text" placeholder="Zip Code" />  
              <input value={mainAccount} onChange={e=>setMainAccount(e.target.value)} type="number" placeholder="Main Account" />  

    



              <div className="emir-selectbox">
                  <div
                    className="emir-selectbox__header"
                    onClick={(e) => {
                      document.querySelectorAll(".emir-dropdown").forEach(e=>e.classList.remove("emir-dropdown-acik"))
                      e.currentTarget.parentNode
                        .querySelector(".emir-dropdown")
                        .classList.toggle("emir-dropdown-acik");
                    }}
                  >
                   Auto Group<span id="span-grup"></span>
                  </div>
                  <Dropdown
                    onChange={(val) => {
                      
                    }}

                    onSelect={(id,val)=>{
                      setAutoGroup(id);
                     
                        document.querySelector("#span-grup").innerText = " : "+val
                    }}
                    title="Auto Group"
                    data={autoGroupList
                      .sort((a, b) => a.name.localeCompare(b.name))}
                    object="name"
                    index="id"
                  />
                </div>




              {/*
              
              <input value={} onChange={e=>set(e.target.value)} type="text" placeholder="Total Number of Parking Lots" />  
              <input type="text" placeholder="Total Cars" />  
            
            
              */}
           
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="add-dealer-sag">
                <div className="mini-title">Map</div>
            <img src={map} alt="" />
            <div className="d-flex mt-3">
                <button onClick={()=>{addDealer()}} className="btn primary-btn">Save</button>
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
