import React, { useState, useEffect } from "react";
import VH from "../components/VH/VH";
import car1 from "../../assets/img/car.jpg";
import car2 from "../../assets/img/car2.jpg";
import DataInfo from "../components/VH/DataInfo";
import DataProgress from "../components/VH/DataProgress";
import List from "../components/VH/List";
import List2 from "../components/VH/List2";
import SI from "../components/VH/SI";
import SI2 from "../components/VH/SI2";
import RecentActivities from "../components/VH/RecentActivities";
import CardInfo from "../components/VH/CardInfo";
import { useParams, Redirect } from "react-router-dom";
import Page from "./Page";
import axios from "axios";

import {
  GoogleMap,
  withScriptjs,
  Marker,
  withGoogleMap,
  Circle,
  Polyline,
} from "react-google-maps";
import { Link } from "react-router-dom";

const MyMapComponent = withScriptjs(
  withGoogleMap((props) => {
    const [lat, setLat] = useState(props.p1);
    const [lng, setLng] = useState(props.p2);
    const [parkingLot, setParkingLot] = useState(props.parkingLot);

    return (
      <GoogleMap defaultZoom={14} defaultCenter={{ lat: lat, lng: lng }}>
        {props.isMarkerShown && <Marker position={{ lat: lat, lng: lng }} />}
        <Polyline
          path={[
            { lat: 37.772, lng: -122.214 },
            { lat: 21.291, lng: -157.821 },
            { lat: -18.142, lng: 178.431 },
            { lat: -27.467, lng: 153.027 },
          ]}
        />
        {props.isRadius ? (
          <Circle
            options={{
              fillColor: "#7075F6 ",
              strokeColor: "#7075F6 ",
            }}
            center={{ lat: parkingLot.lat, lng: parkingLot.lng }}
            radius={props.radius}
          />
        ) : (
          ""
        )}
      </GoogleMap>
    );
  })
);

function VehicleDetails() {
  const [car, setCar] = useState(null);
  const { id } = useParams();
  const [map, setMap] = useState(null);
  const [status, setStatus] = useState(null);

  const [lastSpeed, setLastSpeed] = useState(0);
  const [lastRpm, setLastRpm] = useState(0);
  const [lastVoltage, setLastVoltage] = useState(0);
  const [perde, setPerde] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {}, 1000);

    document.addEventListener("keydown", e=>{

      if(e.keyCode == 67){
        setPerde(false)
      }
      
      if(e.keyCode == 49){
        setStatus(1)
      }

      if(e.keyCode == 50){
        setStatus(2)
      }

      if(e.keyCode == 51){
        setStatus(3)
      }

      if(e.keyCode == 52){
        setStatus(4)
      }

      if(e.keyCode == 53){
        setStatus(5)
      }
    });


    axios.get("/api/dealer/vehicles/" + id).then((res) => {
      console.log(res.data);
      setCar(res.data);
      setStatus(res.data.status);

      var now = new Date();
      var bDay = new Date(res.data.last_connection_time);
      var elapsedT = now - bDay;
      console.log(elapsedT);
      if (elapsedT >= 150000) {
        setPerde(true);
      } else {
        setPerde(false);
      }

      var dakika = 60;
      var saat = dakika * 60;
      var gun = saat * 24;
      var ay = gun * 30;
      var yil = ay * 12 + 60 * 60 * 6;

      if (res.data.speed != 0) {
        setLastSpeed(res.data.speed);
      }

      if (res.data.rpm != 0) {
        setLastRpm(res.data.rpm);
      }

      if (res.data.battery != 0) {
        setLastVoltage(res.data.battery);
      }

      setMap({
        center: {
          lat: res.data.lat,
          lng: res.data.lon,
        },
        zoom: 80,
        radius: res.data.desired_lot.radius,
        parkingLot: {
          lat: res.data.desired_lot.p1_lat,
          lng: res.data.desired_lot.p1_lon,
        },
      });
    });
    return () => {
      clearInterval(interval);
    };
  }, []);
  var months = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  function timeAgo(input) {
    const date = input instanceof Date ? input : new Date(input);
    const formatter = new Intl.RelativeTimeFormat("en");
    const ranges = {
      years: 3600 * 24 * 365,
      months: 3600 * 24 * 30,
      weeks: 3600 * 24 * 7,
      days: 3600 * 24,
      hours: 3600,
      minutes: 60,
      seconds: 1,
    };
    const secondsElapsed = (date.getTime() - Date.now()) / 1000;
    for (let key in ranges) {
      if (ranges[key] < Math.abs(secondsElapsed)) {
        const delta = secondsElapsed / ranges[key];
        return formatter.format(Math.round(delta), key);
      }
    }
  }

  if (!localStorage.getItem("key")) {
    return <Redirect to="/login" />;
  } else {
    return (
      <Page>
        <div className="sayfa">
          <div className="vehicle-details-header">
            <img src="/icons/mark-as-sold.svg" className="add-car-button" />
            <Link
              to={"/add-new-car?edit=true&id=" + id}
              className="outline-button outline-button-primary height-44 fs-12 px-3 ms-auto me-3"
            >
              Edit Details
            </Link>
            <img src="/icons/delete.svg" className="add-car-button me-3" />
          </div>

          <div className="row m-0">
            <div className="mini-title mt-3">Vehicle Details</div>
            <div className="br-12 col-lg-6 vd h-266 m-0 position-relative ">
              <VH
                src={[car1, car2]}
                marka={car ? car.vin.brand_name : ""}
                model={car ? car.vin.model_name : ""}
                fiyat={
                  car
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      }).format(Number(car.vin.specs.BasePrice))
                    : ""
                }
              />
              <div
                onClick={() => {
                  setCar(null);
                  axios.get("/api/dealer/vehicles/" + id).then((res) => {
                    console.log(res.data);
                    setCar(res.data);

                    setMap({
                      center: {
                        lat: res.data.lat,
                        lng: res.data.lon,
                      },
                      zoom: 80,
                      radius: res.data.desired_lot.radius,
                      parkingLot: {
                        lat: res.data.desired_lot.p1_lat,
                        lng: res.data.desired_lot.p1_lon,
                      },
                    });
                  });
                }}
                title="Click for refresh data"
                className="refresh-data position-absolute"
              ></div>
              <div className=" position-relative">
                {
                  perde ?   <div className="premium-container br-12  p-3">
                  <button className=" mor-button text-center">
                    <strong>Connection Lost</strong> <br />
                    Last Updated:
                    {car != null && car.last_connection_time != null
                      ? months[car.last_connection_time.substring(5, 7)] +
                        " " +
                        car.last_connection_time.substring(8, 10) +
                        " " +
                        car.last_connection_time.substring(0, 4) +
                        " " +
                        car.last_connection_time.substring(11, 16) +
                        " (" +
                        timeAgo(car.last_connection_time) +
                        ")  "
                      : "No Data"}
                  </button>
                </div> : ""
                }
               
                <div className="data-title-container">
                  <DataInfo
                    data={
                      car ? (
                        car.vin.vin
                      ) : (
                        <div className="skeleton-text-kucuk"></div>
                      )
                    }
                    title="VIN"
                  />
                  <DataInfo data="50,000" title="Milage" />
                  <DataInfo
                    data={
                      car ? (
                        car.stock_no
                      ) : (
                        <div className="skeleton-text-kucuk"></div>
                      )
                    }
                    title="STK"
                  />
                  <DataInfo
                    data={
                      car ? (
                        car.vin.specs.DisplacementL + "L"
                      ) : (
                        <div className="skeleton-text-kucuk"></div>
                      )
                    }
                    title="Engine"
                  />
                  <DataInfo
                    data={
                      car != null && car.device != null
                        ? car.device.id
                        : "No Device"
                    }
                    title="Serial ID"
                  />
                  <DataInfo
                    data={
                      car ? (
                        car.year
                      ) : (
                        <div className="skeleton-text-kucuk"></div>
                      )
                    }
                    title="Year"
                  />
                </div>

                <div className="data-progress-container">
                  {status == null ? "No Device" : ""}
                  {status == 0 || status == 1 ? (
                    <>
                      <div className="data-progress">
                        <div className="title">Speed</div>
                        {car ? (
                          <div className="data-progress-text">0 MPH</div>
                        ) : (
                          <div className="skeleton-text-kucuk"></div>
                        )}
                      </div>

                      <div className="data-progress">
                        <div className="title">RPM</div>
                        {car ? (
                          <div className="data-progress-text">0</div>
                        ) : (
                          <div className="skeleton-text-kucuk"></div>
                        )}
                      </div>

                      <div className="data-progress">
                        <div className="title">Battery</div>
                        {car ? (
                          <div className="data-progress-text">0</div>
                        ) : (
                          <div className="skeleton-text-kucuk"></div>
                        )}
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  {status == 3 || status == 2 ? (
                    <>
                      <div className="data-progress">
                        <div className="title">Speed</div>
                        {car ? (
                          <div className="data-progress-text">0 MPH</div>
                        ) : (
                          <div className="skeleton-text-kucuk"></div>
                        )}
                      </div>

                      <div className="data-progress">
                        <div className="title">RPM</div>
                        {car ? (
                          <div className="data-progress-text">0 </div>
                        ) : (
                          <div className="skeleton-text-kucuk"></div>
                        )}
                      </div>

                      <div className="data-progress">
                        <div className="title">Battery</div>
                        {car ? (
                          <div className="data-progress-text">
                            {car.battery == 0 ? lastVoltage : car.battery}
                          </div>
                        ) : (
                          <div className="skeleton-text-kucuk"></div>
                        )}
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  {status == 4 ? (
                    <>
                      <div className="data-progress">
                        <div className="title">Speed</div>
                        {car ? (
                          <div className="data-progress-text">0 MPH</div>
                        ) : (
                          <div className="skeleton-text-kucuk"></div>
                        )}
                      </div>

                      <div className="data-progress">
                        <div className="title">RPM</div>
                        {car ? (
                          <div className="data-progress-text">
                            {car.rpm == 0 ? lastRpm : car.rpm}
                          </div>
                        ) : (
                          <div className="skeleton-text-kucuk"></div>
                        )}
                      </div>

                      <div className="data-progress">
                        <div className="title">Battery</div>
                        {car ? (
                          <div className="data-progress-text">
                            {car.battery == 0 ? lastVoltage : car.battery}
                          </div>
                        ) : (
                          <div className="skeleton-text-kucuk"></div>
                        )}
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  {status == 5 ? (
                    <>
                      <div className="data-progress">
                        <div className="title">Speed</div>
                        {car ? (
                          <div className="data-progress-text">
                            {car.speed == 0 ? lastSpeed : car.speed} MPH
                          </div>
                        ) : (
                          <div className="skeleton-text-kucuk"></div>
                        )}
                      </div>

                      <div className="data-progress">
                        <div className="title">RPM</div>
                        {car ? (
                          <div className="data-progress-text">
                            {car.rpm == 0 ? lastRpm : car.rpm}
                          </div>
                        ) : (
                          <div className="skeleton-text-kucuk"></div>
                        )}
                      </div>

                      <div className="data-progress">
                        <div className="title">Battery</div>
                        {car ? (
                          <div className="data-progress-text">
                            {car.battery == 0 ? lastVoltage : car.battery}
                          </div>
                        ) : (
                          <div className="skeleton-text-kucuk"></div>
                        )}
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  <div className="data-progress">
                    <div className="title">Temperature</div>
                    {car ? (
                      <div className="data-progress-text">No Data</div>
                    ) : (
                      <div className="skeleton-text-kucuk"></div>
                    )}
                  </div>

                  <DataProgress color="sari" title="Gas" value="90" />

                  <DataProgress color="yesil" title="Battery" value="30" />
                </div>
              </div>
            </div>

            <div className="br-12 col-lg-6 vm m-0 h-266 map-m">
              <div className="mini-title ">Map</div>
              <div style={{ height: "100%", width: "100%" }}>
                {map != null ? (
                  (map.center.lat != null) & (map.center.lng != null) ? (
                    <MyMapComponent
                      isMarkerShown
                      isRadius
                      isRoad
                      p1={map.center.lat}
                      p2={map.center.lng}
                      radius={map.radius}
                      parkingLot={map.parkingLot}
                      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBIekKkymRnVUNN800c6_Kd7OfMsTnVFWg&v=3.exp&libraries=geometry,drawing,places"
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div style={{ height: `100%` }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                    />
                  ) : (
                    <div className="hata-map">
                      <img
                        draggable={false}
                        src="/icons/map-error.svg"
                        alt=""
                      />
                    </div>
                  )
                ) : (
                  <div className="vd-list  skeleton-text"></div>
                )}
              </div>
              <div className="vm-button">Get Direction</div>
            </div>
          </div>

          <div className="row m-0 mt-3 gx-3">
            <div className="col">
              <List val={car} title="Vehicle Information" />
            </div>
            <div className="col">
              <List2 val={car} title="Vehicle Information" />
            </div>
            <div className="col">
              <RecentActivities
              perde={perde}
                status={status}
                data={car}
                updateStatus={(e) => {
                  console.log("SA");
                  console.log(e);
                  setStatus(e);
                }}
              />
              {car && car.device ? <CardInfo data={car} /> : ""}

              <SI data={car} title="Dealer Information" />
              <SI2 data={car} title="Parking Lot Information" />
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default VehicleDetails;
