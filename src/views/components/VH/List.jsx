import React, { useEffect, useState } from "react";
import axios from "axios";
function List({ val, title }) {
  const [colors, setColors] = useState(null);

  useEffect(() => {
    axios
      .get("/api/utils/color/names", {
        headers: {
          Authorization: `Token ${localStorage.getItem("key")}`,
        },
      })
      .then((color) => {
        setColors(color.data);
      });
  }, []);
  return (
    <div className="vd-list">
      <div className="c-title">{title}</div>
      <ul className="c-list">
        <li>
          <div className="title">STK</div>
          <div className="data truncate">{val ? val.stock_no : ""}</div>
        </li>

        <li>
          <div className="title">VIN</div>
          <div className="data truncate">{val ? val.vin.vin : ""}</div>
        </li>

        <li>
          <div className="title">Serial ID</div>
          <div className="data truncate">123123</div>
        </li>

        <li>
          <div className="title">Make</div>
          <div className="data truncate">{val ? val.vin.brand_name : ""}</div>
        </li>

        <li>
          <div className="title">Model</div>
          <div className="data truncate">{val ? val.vin.model_name : ""}</div>
        </li>

        <li>
          <div className="title">Year</div>
          <div className="data truncate">{val ? val.year : ""}</div>
        </li>

        <li>
          <div className="title">Color</div>
          <div className="data truncate">
            {/*val && colors ? colors[2].name : ""*/}
            {val ? val.color_name :""}
          </div>
        </li>

        <li>
          <div className="title">Inventory Type</div>
          <div className="data truncate">
            {val ? val.inventory_type || "Null" : ""}
          </div>
        </li>

        <li>
          <div className="title">Created Date</div>
          <div className="data truncate">
            {val ? val.created_at.substring(0, 10).replaceAll("-", "/") : ""}
          </div>
        </li>

        <li>
          <div className="title">ABS</div>
          {val ? (
            <div className="data truncate" title={val.vin.specs.ABS}>
              {val.vin.specs.ABS}
            </div>
          ) : (
            <div className="skeleton-text"></div>
          )}
        </li>

        <li>
          <div className="title">Active Safety Sys Note</div>
          {val ? (
            <div
              className="data truncate"
              title={val.vin.specs.ActiveSafetySysNote}
            >
              {val.vin.specs.ActiveSafetySysNote}
            </div>
          ) : (
            <div className="skeleton-text"></div>
          )}
        </li>

        <li>
          <div className="title">Air Bag Loc Curtain</div>
          {val ? (
            <div
              className="data truncate"
              title={val.vin.specs.AirBagLocCurtain}
            >
              {val.vin.specs.AirBagLocCurtain}
            </div>
          ) : (
            <div className="skeleton-text"></div>
          )}
        </li>

        <li>
          <div className="title">Auto Reverse System</div>
          {val ? (
            <div
              className="data truncate"
              title={val.vin.specs.AutoReverseSystem}
            >
              {val.vin.specs.AutoReverseSystem}
            </div>
          ) : (
            <div className="skeleton-text"></div>
          )}
        </li>

        <li>
          <div className="title">Battery Info</div>
          {val ? (
            <div className="data truncate" title={val.vin.specs.BatteryInfo}>
              {val.vin.specs.BatteryInfo}
            </div>
          ) : (
            <div className="skeleton-text"></div>
          )}
        </li>

        <li>
          <div className="title">Body Class</div>
          {val ? (
            <div className="data truncate" title={val.vin.specs.BodyClass}>
              {val.vin.specs.BodyClass}
            </div>
          ) : (
            <div className="skeleton-text"></div>
          )}
        </li>

        <li>
          <div className="title">Custom Motorcycle Type</div>
          {val ? (
            <div
              className="data truncate"
              title={val.vin.specs.CustomMotorcycleType}
            >
              {val.vin.specs.CustomMotorcycleType}
            </div>
          ) : (
            <div className="skeleton-text"></div>
          )}
        </li>

        <li>
          <div className="title">Doors</div>
          {val ? (
            <div className="data truncate" title={val.vin.specs.Doors}>
              {val.vin.specs.Doors}
            </div>
          ) : (
            <div className="skeleton-text"></div>
          )}
        </li>

        <li>
          <div className="title">Drive Type</div>
          {val ? (
            <div className="data truncate" title={val.vin.specs.DriveType}>
              {val.vin.specs.DriveType}
            </div>
          ) : (
            <div className="skeleton-text"></div>
          )}
        </li>

        <li>
          <div className="title">Dynamic Brake Support</div>
          {val ? (
            <div
              className="data truncate"
              title={val.vin.specs.DynamicBrakeSupport}
            >
              {val.vin.specs.DynamicBrakeSupport}
            </div>
          ) : (
            <div className="skeleton-text"></div>
          )}
        </li>

        <li>
          <div className="title">Electrification Level</div>
          {val ? (
            <div
              className="data truncate"
              title={val.vin.specs.ElectrificationLevel}
            >
              {val.vin.specs.ElectrificationLevel}
            </div>
          ) : (
            <div className="skeleton-text"></div>
          )}
        </li>

        <li>
          <div className="title">Fuel Type Primary</div>
          {val ? (
            <div
              className="data truncate"
              title={val.vin.specs.FuelTypePrimary}
            >
              {val.vin.specs.FuelTypePrimary}
            </div>
          ) : (
            <div className="skeleton-text"></div>
          )}
        </li>

        <li>
          <div className="title">Manufacturer</div>
          {val ? (
            <div className="data truncate" title={val.vin.specs.Manufacturer}>
              {val.vin.specs.Manufacturer}
            </div>
          ) : (
            <div className="skeleton-text"></div>
          )}
        </li>

        <li>
          <div className="title">Motorcycle Chassis Type</div>
          {val ? (
            <div
              className="data truncate"
              title={val.vin.specs.MotorcycleChassisType}
            >
              {val.vin.specs.MotorcycleChassisType}
            </div>
          ) : (
            <div className="skeleton-text"></div>
          )}
        </li>
  
      </ul>
    </div>
  );
}

export default List;
/*

  {
                        val ?
                        <div className="data truncate" title={val.vin.specs.}>{val.vin.specs.}</div> : 
                        <div className="skeleton-text"></div>
                    }
                    
                    
                    */
