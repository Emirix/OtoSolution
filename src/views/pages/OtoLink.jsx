import React, { useState } from "react";
import Page from "./Page";
import LinkedAutosList from "../components/LinkedAutosList";
import axios from "axios";
function OtoLink() {
  const [odb, setOdb] = useState("");
  const [status,setStatus] = useState(null)
  const [forceUpdate,setForceUpdate] = useState(false)

  function submit() {
    console.log("İstek");
    setForceUpdate(false)

    axios
      .post(
        "/api/devices/oto-link-devices/",
        {
          serial_no: odb,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("key")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setStatus("ok")
        setForceUpdate(true)
        window.location.reload()
      }).catch(err=>{
          setStatus("hata")
      })
  }

  return (
    <Page>
      <div className="sayfa">
        <div className="row m-0">
          <div className="mini-title text-center">Add New Oto-link Device</div>

          <div className="d-flex justify-content-center">
            <div className={ status == "ok" ? " otolink-success link-container br-12  " : status == "hata" ? " otolink-error link-container br-12 " : " link-container br-12"}>
              <img src={status == "ok" ? "/icons/qr-valid.svg" : status == "hata" ? "/icons/qr-hata.svg" : "/icons/qr-code.svg" } />
              <div className="ms-3">
                <div className="link-container-desc">
                  Enter the Oto Link Device ID
                </div>
                <input
                  value={odb}
                  onChange={(e) => setOdb(e.target.value)}
                  type="text"
                  placeholder={"Oto Link Device ID"}
                  onFocus={e=>setStatus("")}
                />
                <div className={status == "ok" ? " mesaj succes " : status == "hata" ?  " mesaj hata " :  " mesaj "}>{status == "ok" ? "Added" : status == "hata" ? "Error" :""}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <button
              onClick={() => {
                submit();
              }}
              className="btn btn-yesil w-25 h-44 mx-auto my-3"
            >
              Submit
            </button>
          </div>
        </div>

        <div className="row  mt-3 m-0">
          <div className="mini-title mb-3">Recently Added</div>
          <div className="tb-container">
              {forceUpdate ? <LinkedAutosList /> : <LinkedAutosList /> }
            
          </div>
        </div>
      </div>
    </Page>
  );
}

export default OtoLink;
