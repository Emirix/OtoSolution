import axios from 'axios'
import React,{useState} from 'react'
import CardInfo from '../components/VH/CardInfo'
import Page from './Page'

function AddNewCar({bg,title}) {

    const [stk,setStk] = useState("")
    const [vin, setVin] = useState("")
    const [serialId, setserialId] = useState("")
    const [make, setMake] = useState("")
    const [model, setModel] = useState("")
    const [year, setYear] = useState("")
    const [color, setColor] = useState("")
    const [style, setStyle] = useState("")
    const [madeIn, setMadeIn] = useState("")
    const [streeingType, setStreeingType] = useState("")

    function addCar(){
        axios.post("/api/dealer/vehicles/",{
            
                "stock_no": stk,
                "dealer": localStorage.getItem("dealer_id"),
                "vin": vin.trim(),
                "color": color,
                "year": year,
                "brand": make,
                "model": model,
                "desired_lot": 1
           
        },{    headers:{
            "Authorization" : `Token ${localStorage.getItem("key")}`
        }}).then(res=>{
            console.log(res)
            if(res.statusText == "Created"){
                alert("Araba Eklendi")
            }
        }).catch(err=>{
            alert("Hata. Bilgileri Kontrol Edin")
        })
    }

    return (
        <Page>
        <div className="sayfa">
            <div className="row m-0">
                <input type="file" name="upload" id="upload" className="d-none" />
                <div className="col-lg-6 col-md-12">
                    <div className="add-car-image">
                        <div className="mini-title">Add New Car</div>
                        <label htmlFor="upload" id="upload">
                            <div className="sol">
                                <img src="icons/camera-solid.svg" alt="" />
                            </div>
                            <div className="sag">
                                upload images<br/>or<br/>drag&drop here
                            </div>
                        </label>
                    </div>

                    <div className="as">
                        <div className="mini-title"></div>
                        <CardInfo/>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12">
                <div className="mini-title">Vehicle Information</div>
                <div className="info-form">
                    <input value={stk} onChange={e=>setStk(e.target.value)} type="text" placeholder="STK"  />
                    <input value={vin} onChange={e=>setVin(e.target.value)} type="text" placeholder="VIN" />
                    <input value={serialId} onChange={e=>setserialId(e.target.value)} type="text" placeholder="Serial ID" />
                    <input value={make} onChange={e=>setMake(e.target.value)} type="number" placeholder="Make" />
                    <input value={model} onChange={e=>setModel(e.target.value)} type="number" placeholder="Model" />
                    <input value={year} onChange={e=>setYear(e.target.value)} type="number" placeholder="Year" />
                    <input value={color} onChange={e=>setColor(e.target.value)} type="number" placeholder="Color" />
                    <input value={style} onChange={e=>setStyle(e.target.value)} type="text" placeholder="Style" />
                    <input value={madeIn} onChange={e=>setMadeIn(e.target.value)} type="text" placeholder="Made in" />
                    <input value={streeingType} onChange={e=>setStreeingType(e.target.value)} type="text" placeholder="Steering Type" />
                </div>
                <div className="btn btn-primary" onClick={()=>{addCar()}}>Add Car</div>
                </div>
            </div>
        </div>
        </Page> )
}

export default AddNewCar
