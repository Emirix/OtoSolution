import React,{useState} from "react";
import Switch from "react-switch";

function QA({ src,title,status,color}) {
  const [checked,setChecked] = useState(false)
  return (
    <div className="qa">
      <img src={src} alt="" />
      <div className="ms-3">
        <div className="qa__title">{title}</div>
        <div className="qa__status" style={{color:color}}>{status}</div>
      </div>
      <Switch
            checked={checked}
            onChange={()=>{setChecked(!checked)}}
            onColor="#3ECD7B"
            onHandleColor="white"
            handleDiameter={17}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={30}
            className="react-switch"
            id="material-switch"
          />
    </div>
  );
}

export default QA;
