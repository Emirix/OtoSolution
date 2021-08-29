import axios from 'axios'
import React,{useState,useEffect} from 'react'
import CardInfo from '../components/VH/CardInfo'
import Page from './Page'
import {Redirect} from "react-router-dom"

function AddNewCar({bg,title}) {

    const [brand,setBrand] = useState([])
    const [models,setModels] = useState([])
    const [colors,setColors] = useState([])

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

    useEffect(()=>{
        axios.get("/api/catalog/brandnames/",{
            headers:{
                "Authorization" : `Token ${localStorage.getItem("key")}`
            }
        }).then(res=>{
            console.log(res)
            setBrand(res.data)
            axios.get("/api/utils/color/names",{
                headers:{
                    "Authorization" : `Token ${localStorage.getItem("key")}`
                }
            }).then(res=>{
                setColors(res.data)
            })
        })

      
    },[])

    function brandChange(e){
        setMake(e.target.value)
        setModels([])
        axios.get("/api/catalog/brandnames/"+e.target.value+"/models/",{
            headers:{
                "Authorization" : `Token ${localStorage.getItem("key")}`

            }
        }).then(res=>{
            setModels(res.data);
        })
    }

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
    if(!localStorage.getItem("key")){
        return <Redirect to="/login" />
       }else{
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

                    <select value={make} onChange={e=>brandChange(e)}>
                        <option value="">Make</option>
                        {brand.sort((a, b) => a.name.localeCompare(b.name)).map(val=>{
                            return(
                                <option value={val.id} key={val.id}>{val.name}</option>
                            )
                        }) || <option>Loading</option>}
                    </select>




                    

                    <select disabled={brand.length == 0 ? true : false} value={model} onChange={e=>setModel(e.target.value)}>
                        <option value="">Model</option>
                        {models.sort((a, b) => a.name.localeCompare(b.name)).map(val=>{
                            return(
                                <option value={val.id} key={val.id}>{val.name}</option>
                            )
                        }) || <option>Loading</option>}
                    </select>

                    <input value={year} onChange={e=>setYear(e.target.value)} type="number" placeholder="Year" />
                    
                    <select value={color} onChange={e=>setColor(e.target.value)}>
                        <option value="">Color</option>
                        {colors.map(val=>{
                            return(
                                <option value={val.id} key={val.id}>{val.name}</option>
                            )
                        }) || <option>Loading</option>}
                    </select>

                   
                   
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
}
export default AddNewCar
