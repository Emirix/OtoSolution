import axios from "axios";
import React, { useState, useEffect } from "react";
import CardInfo from "../components/VH/CardInfo";
import Page from "./Page";
import { Redirect } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import Dropdown from "../components/Dropdown";


function AddNewCar({ bg, title }) {
  const [brand, setBrand] = useState([]);
  const [models, setModels] = useState([]);
  const [colors, setColors] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [lots, setLots] = useState([]);
  const [devices, setDevices] = useState([])
  const [stk, setStk] = useState("");
  const [vin, setVin] = useState("");
  const [serialId, setserialId] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [dealer, setDealer] = useState("");
  const [iv, setIV] = useState("");
  const [device, setDevice] = useState("")
  const [desiretLot, setDesiretLot] = useState("");
  const url = new URLSearchParams(window.location.search);


  const Yil =
[{
    id:1980,
    yil:1980
},



{
    id:1981,
    yil:1981
},



{
    id:1982,
    yil:1982
},



{
    id:1983,
    yil:1983
},



{
    id:1984,
    yil:1984
},



{
    id:1985,
    yil:1985
},



{
    id:1986,
    yil:1986
},



{
    id:1987,
    yil:1987
},



{
    id:1988,
    yil:1988
},



{
    id:1989,
    yil:1989
},



{
    id:1990,
    yil:1990
},



{
    id:1991,
    yil:1991
},



{
    id:1992,
    yil:1992
},



{
    id:1993,
    yil:1993
},



{
    id:1994,
    yil:1994
},



{
    id:1995,
    yil:1995
},



{
    id:1996,
    yil:1996
},



{
    id:1997,
    yil:1997
},



{
    id:1998,
    yil:1998
},



{
    id:1999,
    yil:1999
},



{
    id:2000,
    yil:2000
},



{
    id:2001,
    yil:2001
},



{
    id:2002,
    yil:2002
},



{
    id:2003,
    yil:2003
},



{
    id:2004,
    yil:2004
},



{
    id:2005,
    yil:2005
},



{
    id:2006,
    yil:2006
},



{
    id:2007,
    yil:2007
},



{
    id:2008,
    yil:2008
},



{
    id:2009,
    yil:2009
},



{
    id:2010,
    yil:2010
},



{
    id:2011,
    yil:2011
},



{
    id:2012,
    yil:2012
},



{
    id:2013,
    yil:2013
},



{
    id:2014,
    yil:2014
},



{
    id:2015,
    yil:2015
},



{
    id:2016,
    yil:2016
},



{
    id:2017,
    yil:2017
},



{
    id:2018,
    yil:2018
},



{
    id:2019,
    yil:2019},



{
    id:2020,
    yil:2020
},



{
    id:2021,
    yil:2021
}] 


  function editCar(){
     const data = {
      color:color || null,
      inventory_type:iv || null,
      year:Number(year) || null,
      brand:Number(make) || null,
      model:Number(model) || null,
      desired_lot:Number(desiretLot),
      device:Number(device) || null
     }
     
     axios.put(`/api/dealer/vehicles/${url.get("id")}/`,data,{
       headers:{
        "Authorization" : `Token ${localStorage.getItem("key")}`
       }
     }).then(res=>{
       console.log(res)
       
     })
     
     alert("MESAJ: CONSOLE'U KONTROL EDİN")
     console.clear()
     console.log("%cPUT ISTEKLERINDE BİR CORS HATASI ALIYORUM, POSTMANDE DENEDİĞİMDE HİÇBİR SIKINTI YOK ÇOK UĞRAŞTIM ÇÖZEMEDİM BUNA NE YAPABİLİRİZ ","background-color:#d35400")
     console.log(`Put İsteğinin gitti yer: /api/dealer/vehicles/${url.get("id")}/`)
     console.log("Giden veri:")
     console.log(data)
  }

  useEffect(() => {
    var brand_name = "";
    var brand_id = 0;
    var model_name = "";
    if(url.get("edit")){

        axios.get("/api/dealer/vehicles/"+url.get("id"),{
            headers:{
              "Authorization" : `Token ${localStorage.getItem("key")}`
            }
          }).then(res=>{            
            setStk(res.data.stock_no)
            setVin(res.data.vin.vin)
            setserialId(res.data.device_serial_no)            
            
            setYear(res.data.year)
            setColor(res.data.color)            
           setDesiretLot(res.data.desired_lot.id)
           setIV(res.data.inventory_type)
           setDealer(res.data.dealer.id)   

           brand_name =res.data.brand_name
           model_name=res.data.model_name
           

           //document.querySelector("#span-dealer").innerText = " : " + res.data.dealer.name
           document.querySelector("#span-make").innerText = " : " + res.data.brand_name
          // document.querySelector("#span-model").innerText = " : " + res.data.model_name
           document.querySelector("#span-color").innerText = " : " + res.data.color_name
           document.querySelector("#span-lot").innerText = " : " + res.data.desired_lot.name
          }).then(f=>{
            axios
            .get("/api/catalog/brandnames/", {
              headers: {
                Authorization: `Token ${localStorage.getItem("key")}`,
              },
            })
            .then((res) => {
              setBrand(res.data);
              if(url.get("edit")){
                res.data.map(val=>{
                  if(val.name == brand_name){
                    setMake(val.id)
                    brand_id = val.id
                    brandChange({target:{value:val.id}})
                  }
                })
              }
              axios
                .get("/api/utils/color/names", {
                  headers: {
                    Authorization: `Token ${localStorage.getItem("key")}`,
                  },
                })
                .then((res) => {
                  setColors(res.data);
                });
            })
      
          })
    }

    axios
      .get("/api/catalog/brandnames/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("key")}`,
        },
      })
      .then((res) => {
        setBrand(res.data);
        if(url.get("edit")){
          res.data.map(val=>{
            if(val.name == brand_name){
            }
          })
        }
        axios
          .get("/api/utils/color/names", {
            headers: {
              Authorization: `Token ${localStorage.getItem("key")}`,
            },
          })
          .then((res) => {
            setColors(res.data);
          });
      });


    axios.get("/api/devices/oto-link-devices/",{
        headers: {
            Authorization: `Token ${localStorage.getItem("key")}`,
          }
    }).then(res=>{
        
        setDevices(res.data)
    })

    axios
      .get("/admin/api/dealers/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("key")}`,
        },
      })
      .then((res) => {
        

        let array = [];
     
        array.push(...res.data.results);
        for (let i = 0; i <= Math.ceil(res.data.count / 10); i++) {
          axios
            .get("/admin/api/dealers/?page=" + i, {
              headers: {
                Authorization: `Token ${localStorage.getItem("key")}`,
              },
            })
            .then((res) => {
              const s1 = res.data.results;
              array.push(...res.data.results);
            });
        }
        setDealers(array);
      });

    axios
      .get("/api/dealer/lots", {
        headers: {
          Authorization: `Token ${localStorage.getItem("key")}`,
        },
      })
      .then((res) => {
        let array = [];
        for (let i = 1; i <= Math.ceil(res.data.count / 10); i++) {
          
          axios
            .get("/api/dealer/lots/?page=" + i, {
              headers: {
                Authorization: `Token ${localStorage.getItem("key")}`,
              },
            })
            .then((res) => {
              const s1 = res.data.results;
              array.push(...res.data.results);
              setLots(array);
            });

        }
        

      })


  }, []);

  function brandChange(e) {
    setMake(e.target.value);
    setModels([]);
    axios
      .get("/api/catalog/brandnames/" + e.target.value + "/models/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("key")}`,
        },
      })
      .then((res) => {
        setModels(res.data);
      });
  }

  function checkInputs(){
    if(stk == "" || vin == "" || make == "" ||model == "" || year == "" ||color == "" ||device == "" ||dealer == "" ||desiretLot == "" ||iv == ""){
      return false
    }else{
      return true
    }
  }
  function addCar() {
    if(checkInputs() == true){

   
    axios
      .post(
        "/api/dealer/vehicles/",
        {
          stock_no: stk,
          dealer: Number(dealer) || null,
          vin: vin.trim(),
          color: Number(color) || null,
          year: Number(year) || null,
          brand: Number(make) || null,
          model: Number(model) || null,
          device: Number(device) || null,
          desired_lot: Number(desiretLot) || null,
          inventory_type: Number(iv) || null,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("key")}`,
          },
        }
      )
      .then((res) => {
        
        if (res.statusText == "Created" || res.status == 200 || res.status == 201) {
      
          NotificationManager.success(
            "Car successfully added.",
            "You can find it in the car list",
            2000
          );

          setVin("");
          setStk("");
          setYear("");
          setserialId("");
          setMake("");
          setModel("");
          setColor("");
          document.querySelector("#span-device").innerText = ""
          document.querySelector("#span-dealer").innerText = ""
          document.querySelector("#span-lot").innerText = ""
          document.querySelector("#span-dealer").innerText =""
          document.querySelector("#span-make").innerText = ""
          document.querySelector("#span-model").innerText = ""
          document.querySelector("#span-color").innerText = ""
          
        }
      })
      .catch((err) => {
        NotificationManager.error(
          "Could not add car",
          "Check the information",
          2000
        );

        console.log(err.response)
      });
    }else{
      alert("Fill in the mandatory fields")
    }
  
}

  if (!localStorage.getItem("key")) {
    return <Redirect to="/login" />;
  } else {
    return (
      <Page>
        <div className="sayfa">
          <NotificationContainer />

          <div className="row m-0">
            <input type="file" name="upload" id="upload" className="d-none" />
            <div className="col-lg-6 col-md-12">
              <div className="add-car-image">
                <div className="mini-title">{url.get("edit") ? "Edit Existing Car" : "Add New Car"}</div>
                <label htmlFor="upload" id="upload">
                  <div className="sol">
                    <img src="icons/camera-solid.svg" alt="" />
                  </div>
                  <div className="sag">
                    upload images
                    <br />
                    or
                    <br />
                    drag&drop here
                  </div>
                </label>
              </div>

              <div className="as">
                <div className="mini-title"></div>
                <CardInfo />
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="mini-title">{url.get("edit") ? "Edit " : ""}Vehicle Information</div>
              <div className="info-form">
                {!url.get("edit") ?  <input
                  value={stk}
                  onChange={(e) => setStk(e.target.value)}
                  type="text"
                  placeholder="*STK"
                /> : "" }
               {!url.get("edit") ?
                <input
                  value={vin}
                  onChange={(e) => setVin(e.target.value)}
                  type="text"
                  placeholder="*VIN"
                /> : "" }



             

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
                   *Make<span id="span-make"></span>
                  </div>
                  <Dropdown
                    onChange={(val) => {
                      
                    }}

                    onSelect={(id,val)=>{
                      setMake(id);
                      setModels([]);
                      setModel("")
                      document.querySelector("#span-model").innerText = ""
                      axios
                        .get("/api/catalog/brandnames/" + id + "/models/", {
                          headers: {
                            Authorization: `Token ${localStorage.getItem("key")}`,
                          },
                        })
                        .then((res) => {
                          setModels(res.data);
                        });
                        document.querySelector("#span-make").innerText = " : "+val
                    }}
                    title="Make"
                    data={brand
                      .sort((a, b) => a.name.localeCompare(b.name))}
                    object="name"
                    index="id"
                  />
                </div>



               

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
                   *Model<span id="span-model"></span>
                  </div>
                  <Dropdown
                    onChange={(val) => {
                      
                    }}

                    onSelect={(id,val)=>{
                      setModel(id)
                      document.querySelector("#span-model").innerText = " : "+val

                    }}
                    title="Model"
                    data={ models.sort((a, b) => a.name.localeCompare(b.name)) }
                    object="name"
                    index="id"
                  />
                </div>



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
                    *Year<span id="span-year"></span>
                  </div>
                  <Dropdown
                   

                    onSelect={(id,val)=>{
                        
                        setYear(id)
                        document.querySelector("#span-year").innerText = " : "+val
                    }}
                    title="Year"
                    data={Yil}
                    object="yil"
                    index="id"
                    hideSearch
                  />
                </div>




              
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
                    *Color<span id="span-color"></span>
                  </div>
                  <Dropdown
                    onChange={(val) => {
                      
                    }}

                    onSelect={(id,val)=>{
                        
                        setColor(id)
                        document.querySelector("#span-color").innerText = " : "+val
                    }}
                    title="Color"
                    data={colors}
                    object="name"
                    index="id"
                  />
                </div>




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
                    Device <span id="span-device"></span>
                  </div>
                  <Dropdown
                    onChange={(val) => {
                      
                    }}

                    onSelect={(id,val)=>{
                        
                        setDevice(id)
                        document.querySelector("#span-device").innerText = " : "+val
                    }}
                    title="Device"
                    data={devices}
                    object="serial_no"
                    index="id"
                    addNull={true}
                  />
                </div>

                    {!url.get("edit") ? 
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
                    *Dealer <span id="span-dealer"></span>
                  </div>
                  <Dropdown
                    onChange={(val) => {
                      
                    }}

                    onSelect={(id,val)=>{
                        
                        setDealer(id)
                        document.querySelector("#span-dealer").innerText = " : "+val
                    }}
                    title="Dealer"
                    data={dealers}
                    object="name"
                    index="id"
                  />
                </div>
: "" }
              

                <div className="emir-selectbox">
                  <div
                    className="emir-selectbox__header"
                    onClick={(e) => {                      document.querySelectorAll(".emir-dropdown").forEach(e=>e.classList.remove("emir-dropdown-acik"))

                      e.currentTarget.parentNode
                        .querySelector(".emir-dropdown")
                        .classList.toggle("emir-dropdown-acik");
                    }}
                  >
                    *Desired Lot<span id="span-lot"></span>
                  </div>
                  <Dropdown
                    onChange={(val) => {
                      
                    }}

                    onSelect={(id,val)=>{
                        
                      setDesiretLot(id)
                        document.querySelector("#span-lot").innerText = " : "+val
                    }}
                    title="Desired Lot"
                    data={lots}
                    object="name"
                    index="id"
                  />
                </div>






                <select value={iv} onChange={(e) => setIV(e.target.value)}>
                  <option value="">*Inventory Type</option>
                  <option value="1">New</option>
                  <option value="2">Used</option>
                </select>
              </div>
              <div
                className="btn btn-primary h-44"
                onClick={() => {
                  url.get("edit") ? editCar() : addCar();
                }}
              >
                {url.get("edit") ? "Edit Car" : "Add Car"}
              </div>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}
export default AddNewCar;
