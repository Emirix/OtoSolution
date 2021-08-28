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
                    <div className="title">STK</div>     
                    <div className="data">{val ? val.stock_no : "" }</div>    
                </li>

                <li>
                    <div className="title">VIN</div>    
                    <div className="data">{val ? val.vin.vin : "" }</div>    
                </li>

                <li>
                    <div className="title">Serial ID</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">Make</div>    
                    <div className="data">{val ? val.vin.brand_name : "" }</div>    
                </li>

                <li>
                    <div className="title">Model</div>    
                    <div className="data">{val ? val.vin.model_name : "" }</div>    
                </li>

                <li>
                    <div className="title">Year</div>    
                    <div className="data">{val ? val.year : "" }</div>    
                </li>

                <li>
                    <div className="title">Color</div>    
                    <div className="data">{val && colors ? colors[2].name : "" }</div>    
                </li>

                <li>
                    <div className="title">Inventory Type</div>    
                    <div className="data">{val ? val.inventory_type || "Null"  : "" }</div>    
                </li>

                <li>
                    <div className="title">Created Date</div>    
                    <div className="data">{val ? val.created_at.substring(0,10).replaceAll("-","/") : ""}</div>    
                </li>

                <li>
                    <div className="title">Created By</div>    
                    <div className="data">Null</div>    
                </li>

                <li>
                    <div className="title">Last Update</div>    
                    <div className="data">Null</div>    
                </li>

                <li>
                    <div className="title">STK</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">STK</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">STK</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">STK</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">STK</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">STK</div>    
                    <div className="data">123123</div>    
                </li>

            

                <li>
                    <div className="title">STK</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">STK</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">STK</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">STK</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">STK</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">STK</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">STK</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">STK</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">STK</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">STK</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">STK</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">STK</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">STK</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">STK</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">STK</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">STK</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">STK</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">STK</div>    
                    <div className="data">123123</div>    
                </li>
            </ul>
        </div>
    )
}

export default List
