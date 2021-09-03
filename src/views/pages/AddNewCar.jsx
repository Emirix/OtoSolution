import axios from "axios";
import React, { useState, useEffect } from "react";
import CardInfo from "../components/VH/CardInfo";
import Page from "./Page";
import { Redirect } from "react-router-dom";
import SolBildirim from "../components/SolBildirim";
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

  const [bildirim, setBildirim] = useState({
    img: "",
    title: "",
    caption: "",
    show: false,
  });

  function editCar(){

  }

  useEffect(() => {

    if(url.get("edit")){
        axios.get("/api/dealer/vehicles/"+url.get("id"),{
            headers:{
              "Authorization" : `Token ${localStorage.getItem("key")}`
            }
          }).then(res=>{
            console.log("EDIT DATA")
            console.log(Number(res.data.vin.specs.MakeID    ))
            console.log(res.data)
            setStk(res.data.stock_no)
            setVin(res.data.vin.vin)
            setserialId(res.data.device_serial_no)
            
            brandChange({target:{value:81}})
            setYear(res.data.year)
            setColor(res.data.color)            
           setDesiretLot(res.data.desired_lot.id)
           setIV(res.data.inventory_type)
           document.querySelector("#span-dealer").innerText = " : " + res.data.dealer.name
           setDealer(res.data.dealer.id)   
          })

    }

    axios
      .get("/api/catalog/brandnames/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("key")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setBrand(res.data);
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
        console.log(res)
        setDevices(res.data)
    })

    axios
      .get("/admin/api/dealers/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("key")}`,
        },
      })
      .then((res) => {
        console.log(res);

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
          console.log("DÖNDÜ");
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
        console.log(array);

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

  function addCar() {
    if (vin.trim() == "") {
      axios
        .post(
          "/api/dealer/vehicles/",
          {
            stock_no: stk,
            dealer: Number(dealer) || null,
            color: color || null,
            year: year || null,
            brand: make || null,
            model: model || null,
            desired_lot: Number(desiretLot) || null,
            inventory_type: Number(iv) || null,
            device: Number(device) || null
          },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("key")}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
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
          }
        })
        .catch((err) => {
          NotificationManager.error(
            "Could not add car",
            "Check the information",
            2000
          );
        });
    } else {
      axios
        .post(
          "/api/dealer/vehicles/",
          {
            stock_no: stk,
            dealer: Number(dealer) || null,
            vin: vin.trim(),
            color: color || null,
            year: year || null,
            brand: make || null,
            model: model || null,
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
          console.log(res);
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
          }
        })
        .catch((err) => {
          NotificationManager.error(
            "Could not add car",
            "Check the information",
            2000
          );
        });
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
                <input
                  value={stk}
                  onChange={(e) => setStk(e.target.value)}
                  type="text"
                  placeholder="*STK"
                />
                <input
                  value={vin}
                  onChange={(e) => setVin(e.target.value)}
                  type="text"
                  placeholder="*VIN"
                />
                <input
                  value={serialId}
                  onChange={(e) => setserialId(e.target.value)}
                  type="text"
                  placeholder="*Serial ID"
                />

                <select value={make} onChange={(e) => brandChange(e)}>
                  <option value="">Make</option>
                  {brand
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((val) => {
                      return (
                        <option value={val.id} key={val.id}>
                          {val.name}
                        </option>
                      );
                    }) || <option>Loading</option>}
                </select>

                <select
                  disabled={brand.length == 0 ? true : false}
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                >
                  <option value="">Model</option>
                  {models
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((val) => {
                      return (
                        <option value={val.id} key={val.id}>
                          {val.name}
                        </option>
                      );
                    }) || <option>Loading</option>}
                </select>

                <input
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  type="number"
                  placeholder="Year"
                />

                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  <option value="">Color</option>
                  {colors.map((val) => {
                    return (
                      <option value={val.id} key={val.id}>
                        {val.name}
                      </option>
                    );
                  }) || <option>Loading</option>}
                </select>

                <div className="emir-selectbox">
                  <div
                    className="emir-selectbox__header"
                    onClick={(e) => {
                      e.currentTarget.parentNode
                        .querySelector(".emir-dropdown")
                        .classList.toggle("emir-dropdown-acik");
                    }}
                  >
                    Device <span id="span-device"></span>
                  </div>
                  <Dropdown
                    onChange={(val) => {
                      console.log(val);
                    }}

                    onSelect={(id,val)=>{
                        console.log(id)
                        setDevice(id)
                        document.querySelector("#span-device").innerText = " : "+val
                    }}
                    title="Device"
                    data={devices}
                    object="serial_no"
                    index="id"
                  />
                </div>


                <div className="emir-selectbox">
                  <div
                    className="emir-selectbox__header"
                    onClick={(e) => {
                      e.currentTarget.parentNode
                        .querySelector(".emir-dropdown")
                        .classList.toggle("emir-dropdown-acik");
                    }}
                  >
                    Dealer <span id="span-dealer"></span>
                  </div>
                  <Dropdown
                    onChange={(val) => {
                      console.log(val);
                    }}

                    onSelect={(id,val)=>{
                        console.log(id)
                        setDealer(id)
                        document.querySelector("#span-dealer").innerText = " : "+val
                    }}
                    title="Dealer"
                    data={dealers}
                    object="name"
                    index="id"
                  />
                </div>

                <select
                  value={desiretLot}
                  onChange={(e) => setDesiretLot(e.target.value)}
                >
                  <option value="0">Desiret Lot</option>
                  {lots.map((val) => {
                    return (
                      <option value={val.id} key={val.id}>
                        {val.name}
                      </option>
                    );
                  }) || <option>Loading</option>}
                </select>

                <select value={iv} onChange={(e) => setIV(e.target.value)}>
                  <option value="0">Inventory Type</option>
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
