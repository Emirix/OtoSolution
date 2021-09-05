import axios from "axios";
import React, { useState, useEffect } from "react";
import Page from "./Page";
import { Link, useParams } from "react-router-dom";
import { GoogleMap,withScriptjs, Marker,withGoogleMap } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
  const [lat,setLat] = useState(-34.397)
  const [lng,setLng] = useState(150.644)

  return(
    <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: lat, lng: lng }}
   
  >
    {props.isMarkerShown && <Marker position={{ lat: lat, lng: lng }} />}
  </GoogleMap>
  )
}))
function AddDealer() {
  let {id}= useParams()
  const [info, setInfo] = useState(null)
  const [map,setMap] = useState(null)
  
  useEffect(()=>{
    axios.get(`/api/dealer/lots/`+id,{
      headers:{
        "Authorization" : `Token ${localStorage.getItem("key")}`
      }
    }).then(res=>{
      
      setInfo(res.data)
      setMap({
        center: {
          lat: res.data.p1_lat,
          lng: res.data.p1_lon
        },
        zoom:50
      })
  
    })
  },[])

  

  return (
    <Page>
      <div className="sayfa">
        <div className="row m-0">
          <input type="file" name="upload" id="upload" className="d-none" />
          <div className="col-lg-6 col-md-12">
            <div className="mini-title">Parking Lot Details</div>
            <div className="vd-list">
            <div className="c-title"></div>
            {info != null ?  
            <ul className="c-list">
             
             
            

                <li>
                    <div className="title">Dealer Name</div>    
                    <div className="data">{info.dealer || "Unspecified"}</div>    
                </li>

                <li>
                    <div className="title">Parking Lot Name</div>    
                    <div className="data">{info.lot || "Unspecified"}</div>    
                </li>

                <li>
                    <div className="title">Description</div>    
                    <div className="data">{info.description  || "Unspecified"}</div>    
                </li>

                <li>
                    <div className="title">Created By</div>    
                    <div className="data">{info.created_by  || "Unspecified"}</div>    
                </li>

                <li>
                    <div className="title">Updated By</div>    
                    <div className="data">{info.updated_by  || "Unspecified"}</div>    
                </li>

                <li>
                    <div className="title">Created At</div>    
                    <div className="data">{info.created_at  || "Unspecified"}</div>    
                </li>

                <li>
                    <div className="title">Updated By</div>    
                    <div className="data">{info.updated_by || "Unspecified"}</div>    
                </li>


                <li>
                    <div className="title">Address</div>    
                    <div className="data">{info.address || "Unspecified"}</div>    
                </li>




                <li>
                    <div className="title">State</div>    
                    <div className="data">{info.state || "Unspecified"}</div>    
                </li>
                <li>
                    <div className="title">Zip</div>    
                    <div className="data">{info.zip || "Unspecified"}</div>    
                </li>


                <li>
                    <div className="title">Latitude</div>    
                    <div className="data">{info.p1_lat}</div>    
                </li>

                <li>
                    <div className="title">Longitute</div>    
                    <div className="data">{info.p1_lon}</div>    
                </li>

                <li>
                    <div className="title">Radius</div>    
                    <div className="data">{info.radius}</div>    
                </li>

                <li>
                    <div className="title">Total Cars</div>    
                    <div className="data">NEED API</div>    
                </li>

              

            </ul>
      :  <ul className="c-list skeleton-container">
             
             
            

      <li>
          <div className="title">Dealer Name</div>    
          <div className="data"><div className="skeleton-text"></div></div>    
      </li>

      <li>
                    <div className="title">Parking Lot Name</div>    
                    <div className="data"><div className="skeleton-text"></div></div>    
                </li>

                <li>
                    <div className="title">Description</div>    
                    <div className="data"><div className="skeleton-text"></div></div>    
                </li>

                <li>
                    <div className="title">Created By</div>    
                    <div className="data"><div className="skeleton-text"></div></div>    
                </li>

                <li>
                    <div className="title">Updated By</div>    
                    <div className="data"><div className="skeleton-text"></div></div>    
                </li>

                <li>
                    <div className="title">Created At</div>    
                    <div className="data"><div className="skeleton-text"></div></div>    
                </li>

                <li>
                    <div className="title">Updated By</div>    
                    <div className="data"><div className="skeleton-text"></div></div>    
                </li>


                <li>
                    <div className="title">Address</div>    
                    <div className="data"><div className="skeleton-text"></div></div>    
                </li>




                <li>
                    <div className="title">State</div>    
                    <div className="data"><div className="skeleton-text"></div></div>    
                </li>
                <li>
                    <div className="title">Zip</div>    
                    <div className="data"><div className="skeleton-text"></div></div>    
                </li>


                <li>
                    <div className="title">Latitude</div>    
                    <div className="data"><div className="skeleton-text"></div></div>    
                </li>

                <li>
                    <div className="title">Longitute</div>    
                    <div className="data"><div className="skeleton-text"></div></div>    
                </li>

                <li>
                    <div className="title">Radius</div>    
                    <div className="data"><div className="skeleton-text"></div></div>    
                </li>

                <li>
                    <div className="title">Total Cars</div>    
                    <div className="data"><div className="skeleton-text"></div></div>    
                </li>


    

  </ul>
}</div>

          </div>
          <div className="col-lg-6 col-md-12">
            <div className="add-dealer-sag">
            <div className="mini-title">Map</div>

            <div className="map">
      {
        map != null ?     <MyMapComponent
        
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        />: <div className="vd-list  skeleton-text"></div>
      }
   
       
     
    </div>
            <div className="d-flex mt-3">
              {  map != null ?  
            <Link to={"/add-lot/?edit=true&id="+id} className="outline-button outline-button-primary height-44 fs-12 px-3  me-3">
          Edit Details
        </Link>  : "" }
            </div>
            </div>
          
          </div>
          
        </div>
      </div>
    </Page>
  );
}

export default AddDealer;
