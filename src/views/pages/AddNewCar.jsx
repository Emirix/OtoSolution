import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
//import CardInfo from "../components/VH/CardInfo";
import Page from "./Page";
import { Redirect } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import Dropdown from "../components/Dropdown";
import Cropper from "react-easy-crop";
import getCroppedImg from "../components/cropImage";

function AddNewCar({ bg, title }) {
  const [brand, setBrand] = useState([]);
  const [models, setModels] = useState([]);
  const [colors, setColors] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [lots, setLots] = useState([]);
  const [devices, setDevices] = useState([]);
  const [stk, setStk] = useState("");
  const [vin, setVin] = useState("");
  const [serialId, setserialId] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [dealer, setDealer] = useState("");
  const [iv, setIV] = useState("");
  const [device, setDevice] = useState("");
  const [desiretLot, setDesiretLot] = useState("");
  const url = new URLSearchParams(window.location.search);
  const [uploading, setUploading] = useState(false)
  const [carImages, setCarImages] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  function blobToFile(theBlob, fileName) {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, 0);
      console.log("donee", croppedImage);
      setCroppedImage(croppedImage);

      const formData = new FormData();

      var xhr = new XMLHttpRequest();
      var myBlob = null;
      xhr.open('GET', croppedImage, true);
xhr.responseType = 'blob';
xhr.onload = function(e) {
  if (this.status == 200) {
    myBlob = this.response;
    console.log(myBlob)
    const filex = new File([myBlob], `IMAGE_S.jpg`, { type: myBlob.type })
    console.log("dosya")
    console.log(filex)
    myBlob = filex;

    // myBlob is now the blob that the object URL pointed to.
    formData.append("photo", filex);
    setUploading(true)
    axios
    .post("/api/dealer/vehicles/"+url.get("id")+"/photos/", formData, {
    })
    .then((res) => {
      console.log("Uploaded");
      console.log(res);
      setUploading(false)
      window.location.reload()
    });
  }
};
xhr.send();




     
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  const fileChange = async (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0]);

    const file = e.target.files[0];
    let imageDataUrl = await readFile(file);
    setImageSrc(imageDataUrl);
    console.log("IMAGE : " + imageDataUrl);
    console.log(e.target.files[0]);
  };


  function editCar() {
    const data = {
      color: color || null,
      inventory_type: iv || null,
      year: Number(year) || null,
      brand: Number(make) || null,
      model: Number(model) || null,
      desired_lot: Number(desiretLot),
      device: Number(device) || null,
    };

    axios
      .put(`/api/dealer/vehicles/${url.get("id")}/`, data, {
        headers: {
          Authorization: `Token ${localStorage.getItem("key")}`,
        },
      })
      .then((res) => {
        console.log(res);
      });

    alert("MESAJ: CONSOLE'U KONTROL EDİN");
    console.clear();
    console.log(
      "%cPUT ISTEKLERINDE BİR CORS HATASI ALIYORUM, POSTMANDE DENEDİĞİMDE HİÇBİR SIKINTI YOK ÇOK UĞRAŞTIM ÇÖZEMEDİM BUNA NE YAPABİLİRİZ ",
      "background-color:#d35400"
    );
    console.log(
      `Put İsteğinin gitti yer: /api/dealer/vehicles/${url.get("id")}/`
    );
    console.log("Giden veri:");
    console.log(data);
  }

  useEffect(() => {
    var brand_name = "";
    var brand_id = 0;
    var model_name = "";
    if (url.get("edit")) {
      axios
        .get("/api/dealer/vehicles/" + url.get("id") + "/photos")
        .then((res) => {
          console.log(res);
          setCarImages(res.data);
        });

      axios
        .get("/api/dealer/vehicles/" + url.get("id"), {
          headers: {
            Authorization: `Token ${localStorage.getItem("key")}`,
          },
        })
        .then((res) => {
          setStk(res.data.stock_no);
          setVin(res.data.vin.vin);
          setserialId(res.data.device_serial_no);

          setYear(res.data.year);
          setColor(res.data.color);
          setDesiretLot(res.data.desired_lot.id);
          setIV(res.data.inventory_type);
          setDealer(res.data.dealer.id);

          brand_name = res.data.brand_name;
          model_name = res.data.model_name;

          //document.querySelector("#span-dealer").innerText = " : " + res.data.dealer.name
          document.querySelector("#span-make").innerText =
            " : " + res.data.brand_name;
          // document.querySelector("#span-model").innerText = " : " + res.data.model_name
          document.querySelector("#span-color").innerText =
            " : " + res.data.color_name;
          document.querySelector("#span-lot").innerText =
            " : " + res.data.desired_lot.name;
        })
        .then((f) => {
          axios
            .get("/api/catalog/brandnames/", {
              headers: {
                Authorization: `Token ${localStorage.getItem("key")}`,
              },
            })
            .then((res) => {
              setBrand(res.data);
              if (url.get("edit")) {
                res.data.map((val) => {
                  if (val.name == brand_name) {
                    setMake(val.id);
                    brand_id = val.id;
                    brandChange({ target: { value: val.id } });
                  }
                });
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
        });
    }

    axios
      .get("/api/catalog/brandnames/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("key")}`,
        },
      })
      .then((res) => {
        setBrand(res.data);
        if (url.get("edit")) {
          res.data.map((val) => {
            if (val.name == brand_name) {
            }
          });
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

    axios
      .get("/api/devices/oto-link-devices/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("key")}`,
        },
      })
      .then((res) => {
        setDevices(res.data);
      });

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
      });
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

  function checkInputs() {
    if (
      stk == "" ||
      vin == "" ||
      make == "" ||
      model == "" ||
      year == "" ||
      color == "" ||
      device == "" ||
      dealer == "" ||
      desiretLot == "" ||
      iv == ""
    ) {
      return false;
    } else {
      return true;
    }
  }
  function addCar() {
    if (checkInputs() == true) {
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
          if (
            res.statusText == "Created" ||
            res.status == 200 ||
            res.status == 201
          ) {
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
            document.querySelector("#span-device").innerText = "";
            document.querySelector("#span-dealer").innerText = "";
            document.querySelector("#span-lot").innerText = "";
            document.querySelector("#span-dealer").innerText = "";
            document.querySelector("#span-make").innerText = "";
            document.querySelector("#span-model").innerText = "";
            document.querySelector("#span-color").innerText = "";
          }
        })
        .catch((err) => {
          NotificationManager.error(
            "Could not add car",
            "Check the information",
            2000
          );

          console.log(err.response);
        });
    } else {
      alert("Fill in the mandatory fields");
    }
  }

  if (!localStorage.getItem("key")) {
    return <Redirect to="/login" />;
  } else {
    return (
      <Page>
        {" "}
        {selectedFile != null ? (
          <div className="crop-fixed position-fixed w-100 h-100">
            <button
            disabled={uploading}
              className="upload-btn primary-btn btn h-44"
              onClick={() => {
                showCroppedImage();
              }}
            >
              {uploading ?  <><i class="fa fa-spinner fa-pulse me-3"></i>Uploading</> : "Upload"}
             
            </button>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={16 / 9}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
        ) : (
          ""
        )}
        <div className="page-wrapper">
          <NotificationContainer />

          <div className="row m-0">
            <input
              onChange={(e) => fileChange(e)}
              accept="image/png, image/jpeg"
              type="file"
              name="upload"
              id="upload"
              className="d-none"
            />
            <div className="col-lg-6 col-md-12">
              <div className="add-car-image">
                <div className="mini-title">
                  {url.get("edit") ? "Edit Existing Car" : "Add New Car"}
                </div>
                <label htmlFor="upload" id="upload">
                  <div className="left-en">
                    <img src="icons/camera-solid.svg" alt="" />
                  </div>
                  <div className="right-en">
                    upload image
                    <br />
                    or
                    <br />
                    drag{"&"}drop here
                  </div>
                </label>
              </div>
              {url.get("edit") ?
              <div className="car-images mt-5">
               
                <div className="mini-title">Images for this car</div>
                <div className="car-images-grid">
                  {carImages != null
                    ? carImages.map((val) => {
                        return (
                          <div
                            onClick={(e) => {
                                axios
                                .delete(
                                  "/api/dealer/vehicle-photos/" +val.id.toString() +"/")
                                .then((res) => {
                                  console.log("silindi");
                                  console.log(res);
                                });
                            }}
                            className="car-image position-relative"
                            key={val.id}
                          >
                            <div className="hover position-absolute w-100 h-100 d-flex flex-row">
                              <span>Click for remove</span>
                            </div>
                            <img src={val.photo} alt="" />
                          </div>
                        );
                      })
                    : ""}
                </div>
              </div>
: ""}
              <div className="as">
                <div className="mini-title"></div>
                {/* <CardInfo /> */}
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="mini-title">
                {url.get("edit") ? "Edit " : ""}Vehicle Information
              </div>
              <div className="info-form">
                {!url.get("edit") ? (
                  <input
                    value={stk}
                    onChange={(e) => setStk(e.target.value)}
                    type="text"
                    placeholder="*STK"
                  />
                ) : (
                  ""
                )}
                {!url.get("edit") ? (
                  <input
                    value={vin}
                    onChange={(e) => setVin(e.target.value)}
                    type="text"
                    placeholder="*VIN"
                  />
                ) : (
                  ""
                )}

                <div className="emir-selectbox">
                  <div
                    className="emir-selectbox__header"
                    onClick={(e) => {
                      document
                        .querySelectorAll(".emir-dropdown")
                        .forEach((e) =>
                          e.classList.remove("emir-dropdown-acik")
                        );
                      e.currentTarget.parentNode
                        .querySelector(".emir-dropdown")
                        .classList.toggle("emir-dropdown-acik");
                    }}
                  >
                    *Make<span id="span-make"></span>
                  </div>
                  <Dropdown
                    onChange={(val) => {}}
                    onSelect={(id, val) => {
                      setMake(id);
                      setModels([]);
                      setModel("");
                      document.querySelector("#span-model").innerText = "";
                      axios
                        .get("/api/catalog/brandnames/" + id + "/models/", {
                          headers: {
                            Authorization: `Token ${localStorage.getItem(
                              "key"
                            )}`,
                          },
                        })
                        .then((res) => {
                          setModels(res.data);
                        });
                      document.querySelector("#span-make").innerText =
                        " : " + val;
                    }}
                    title="Make"
                    data={brand.sort((a, b) => a.name.localeCompare(b.name))}
                    object="name"
                    index="id"
                  />
                </div>

                <div className="emir-selectbox">
                  <div
                    className="emir-selectbox__header"
                    onClick={(e) => {
                      document
                        .querySelectorAll(".emir-dropdown")
                        .forEach((e) =>
                          e.classList.remove("emir-dropdown-acik")
                        );

                      e.currentTarget.parentNode
                        .querySelector(".emir-dropdown")
                        .classList.toggle("emir-dropdown-acik");
                    }}
                  >
                    *Model<span id="span-model"></span>
                  </div>
                  <Dropdown
                    onChange={(val) => {}}
                    onSelect={(id, val) => {
                      setModel(id);
                      document.querySelector("#span-model").innerText =
                        " : " + val;
                    }}
                    title="Model"
                    data={models.sort((a, b) => a.name.localeCompare(b.name))}
                    object="name"
                    index="id"
                  />
                </div>

                <input
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  type="text"
                  placeholder="*Year"
                />

                <div className="emir-selectbox">
                  <div
                    className="emir-selectbox__header"
                    onClick={(e) => {
                      document
                        .querySelectorAll(".emir-dropdown")
                        .forEach((e) =>
                          e.classList.remove("emir-dropdown-acik")
                        );

                      e.currentTarget.parentNode
                        .querySelector(".emir-dropdown")
                        .classList.toggle("emir-dropdown-acik");
                    }}
                  >
                    *Color<span id="span-color"></span>
                  </div>
                  <Dropdown
                    onChange={(val) => {}}
                    onSelect={(id, val) => {
                      setColor(id);
                      document.querySelector("#span-color").innerText =
                        " : " + val;
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
                      document
                        .querySelectorAll(".emir-dropdown")
                        .forEach((e) =>
                          e.classList.remove("emir-dropdown-acik")
                        );

                      e.currentTarget.parentNode
                        .querySelector(".emir-dropdown")
                        .classList.toggle("emir-dropdown-acik");
                    }}
                  >
                    Device <span id="span-device"></span>
                  </div>
                  <Dropdown
                    onChange={(val) => {}}
                    onSelect={(id, val) => {
                      setDevice(id);
                      document.querySelector("#span-device").innerText =
                        " : " + val;
                    }}
                    title="Device"
                    data={devices}
                    object="serial_no"
                    index="id"
                    addNull={true}
                  />
                </div>

                {!url.get("edit") ? (
                  <div className="emir-selectbox">
                    <div
                      className="emir-selectbox__header"
                      onClick={(e) => {
                        document
                          .querySelectorAll(".emir-dropdown")
                          .forEach((e) =>
                            e.classList.remove("emir-dropdown-acik")
                          );

                        e.currentTarget.parentNode
                          .querySelector(".emir-dropdown")
                          .classList.toggle("emir-dropdown-acik");
                      }}
                    >
                      *Dealer <span id="span-dealer"></span>
                    </div>
                    <Dropdown
                      onChange={(val) => {}}
                      onSelect={(id, val) => {
                        setDealer(id);
                        document.querySelector("#span-dealer").innerText =
                          " : " + val;
                      }}
                      title="Dealer"
                      data={dealers}
                      object="name"
                      index="id"
                    />
                  </div>
                ) : (
                  ""
                )}

                <div className="emir-selectbox">
                  <div
                    className="emir-selectbox__header"
                    onClick={(e) => {
                      document
                        .querySelectorAll(".emir-dropdown")
                        .forEach((e) =>
                          e.classList.remove("emir-dropdown-acik")
                        );

                      e.currentTarget.parentNode
                        .querySelector(".emir-dropdown")
                        .classList.toggle("emir-dropdown-acik");
                    }}
                  >
                    *Desired Lot<span id="span-lot"></span>
                  </div>
                  <Dropdown
                    onChange={(val) => {}}
                    onSelect={(id, val) => {
                      setDesiretLot(id);
                      document.querySelector("#span-lot").innerText =
                        " : " + val;
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
