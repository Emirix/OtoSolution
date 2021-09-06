import React,{useEffect,useState} from 'react'
import axios from "axios"
function List({val,title}) {

    const [colors,setColors] = useState(null)

    useEffect(()=>{

        axios.get("/api/utils/color/names",{
          headers:{
            "Authorization" : `Token ${localStorage.getItem("key")}`
          }
        }).then(color=>{
            setColors(color.data)
        })
        
    },[])
    return (
        <div className="vd-list">
            <div className="c-title">{title}</div>
            <ul className="c-list">

           

        <li>
          <div className="title">Motorcycle Suspension Type</div>
          {val ? (
            <div
              className="data truncate"
              title={val.vin.specs.MotorcycleSuspensionType}
            >
              {val.vin.specs.MotorcycleSuspensionType}
            </div>
          ) : (
            <div className="skeleton-text"></div>
          )}
        </li>

        <li>
          <div className="title">NCSA Body Type</div>
          {val ? (
            <div className="data truncate" title={val.vin.specs.NCSABodyType}>
              {val.vin.specs.NCSABodyType}
            </div>
          ) : (
            <div className="skeleton-text"></div>
          )}
        </li>

        <li>
          <div className="title">NCSA Make</div>
          {val ? (
            <div className="data truncate" title={val.vin.specs.NCSAMake}>
              {val.vin.specs.NCSAMake}
            </div>
          ) : (
            <div className="skeleton-text"></div>
          )}
        </li>

        <li>
          <div className="title">NCSA Model</div>
          {val ? (
            <div className="data truncate" title={val.vin.specs.NCSAModel}>
              {val.vin.specs.NCSAModel}
            </div>
          ) : (
            <div className="skeleton-text"></div>
          )}
        </li>


            <li>
          <div className="title">Other Restraint System Info</div>
          {val ? (
            <div
              className="data truncate"
              title={val.vin.specs.OtherRestraintSystemInfo}
            >
              {val.vin.specs.OtherRestraintSystemInfo}
            </div>
          ) : (
            <div className="skeleton-text"></div>
          )}
        </li>

        <li>
          <div className="title">Plant City</div>
          {val ? (
            <div className="data truncate" title={val.vin.specs.PlantCity}>
              {val.vin.specs.PlantCity}
            </div>
          ) : (
            <div className="skeleton-text"></div>
          )}{" "}
        </li>

        <li>
          <div className="title">Plant Company Name:</div>
          {val ? (
            <div
              className="data truncate"
              title={val.vin.specs.PlantCompanyName}
            >
              {val.vin.specs.PlantCompanyName}
            </div>
          ) : (
            <div className="skeleton-text"></div>
          )}{" "}
        </li>

        <li>
          <div className="title">Plant Country</div>
          {val ? (
            <div className="data truncate" title={val.vin.specs.PlantCountry}>
              {val.vin.specs.PlantCountry}
            </div>
          ) : (
            <div className="skeleton-text"></div>
          )}{" "}
        </li>

        <li>
          <div className="title">Plant State</div>
          {val ? (
            <div className="data truncate" title={val.vin.specs.PlantCountry}>
              {val.vin.specs.PlantCountry}
            </div>
          ) : (
            <div className="skeleton-text"></div>
          )}{" "}
        </li>

        <li>
          <div className="title">Rear Visibility System</div>
          {val ? (
            <div
              className="data truncate"
              title={val.vin.specs.RearVisibilitySystem}
            >
              {val.vin.specs.RearVisibilitySystem}
            </div>
          ) : (
            <div className="skeleton-text"></div>
          )}
        </li>

        <li>
          <div className="title">Seat Belts All</div>
          {val ? (
            <div className="data truncate" title={val.vin.specs.SeatBeltsAll}>
              {val.vin.specs.SeatBeltsAll}
            </div>
          ) : (
            <div className="skeleton-text"></div>
          )}{" "}
        </li>
                
                <li>
                    <div className="title">Seat Rows</div>    
                    {
                        val ?
                        <div className="data truncate" title={val.vin.specs.SeatRows}>{val.vin.specs.SeatRows}</div> : 
                        <div className="skeleton-text"></div>
                    }  
                </li>

                <li>
                    <div className="title">Seats</div>    
                    {
                        val ?
                        <div className="data truncate" title={val.vin.specs.Seats}>{val.vin.specs.Seats}</div> : 
                        <div className="skeleton-text"></div>
                    }
                </li>

                <li>
                    <div className="title">Steering Location</div>    
                    {
                        val ?
                        <div className="data truncate" title={val.vin.specs.SteeringLocation}>{val.vin.specs.SteeringLocation}</div> : 
                        <div className="skeleton-text"></div>
                    }
                </li>

                <li>
                    <div className="title">TPMS</div>    
                    {
                        val ?
                        <div className="data truncate" title={val.vin.specs.TPMS}>{val.vin.specs.TPMS}</div> : 
                        <div className="skeleton-text"></div>
                    }                </li>

                <li>
                    <div className="title">Top Speed (MPH)</div>    
                    {
                        val ?
                        <div className="data truncate" title={val.vin.specs.TopSpeedMPH}>{val.vin.specs.TopSpeedMPH}</div> : 
                        <div className="skeleton-text"></div>
                    }                </li>

                

                <li>
                    <div className="title">Traction Control</div>    
                    {
                        val ?
                        <div className="data truncate" title={val.vin.specs.TractionControl}>{val.vin.specs.TractionControl}</div> : 
                        <div className="skeleton-text"></div>
                    }                </li>

                <li>
                    <div className="title">Trailer Body Type</div>    
                    {
                        val ?
                        <div className="data truncate" title={val.vin.specs.TrailerBodyType}>{val.vin.specs.TrailerBodyType}</div> : 
                        <div className="skeleton-text"></div>
                    }                </li>

                <li>
                    <div className="title">Trailer Type</div>    
{
                        val ?
                        <div className="data truncate" title={val.vin.specs.TrailerType}>{val.vin.specs.TrailerType}</div> : 
                        <div className="skeleton-text"></div>
                    }                </li>

                <li>
                    <div className="title">Vehicle Type</div>    
                    {
                        val ?
                        <div className="data truncate" title={val.vin.specs.VehicleType}>{val.vin.specs.VehicleType}</div> : 
                        <div className="skeleton-text"></div>
                    }                </li>

                <li>
                    <div className="title">Wheel Base Short</div>    
                    {
                        val ?
                        <div className="data truncate" title={val.vin.specs.WheelBaseShort}>{val.vin.specs.WheelBaseShort}</div> : 
                        <div className="skeleton-text"></div>
                    }                </li>

                <li>
                    <div className="title">Wheels</div>    
                    {
                        val ?
                        <div className="data truncate" title={val.vin.specs.Wheels}>{val.vin.specs.Wheels}</div> : 
                        <div className="skeleton-text"></div>
                    }                </li>

                


            </ul>
        </div>
    )
}

export default List
