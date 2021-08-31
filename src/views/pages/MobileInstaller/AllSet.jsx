import React from 'react'
import {Redirect} from "react-router-dom"

function AllSet() {
    if(!localStorage.getItem("key")){
        return <Redirect to="/login" />
       }else{
    return (
        <div className="p-3">

             <img src="/icons/valid.svg" className="mx-auto my-2  d-block" width="100" height="100" alt="valid svg" />
             <div className="details br-12 p-3">
               <div className="mini-title text-center ">All Set</div>
               <div className="r-a__caption mt-2 text-center">Oto-Link pairing is successful</div>
           
                <ul>
                    <li>
                        <div className="title">SKU Number</div>
                        <div className="data">N2637A76</div>
                    </li>

                    <li>
                        <div className="title">OBD Code</div>
                        <div className="data">76392734029</div>
                    </li>

                    <li>
                        <div className="title">VIN</div>
                        <div className="data">N2637A76</div>
                    </li>

                    <li>
                        <div className="title">STK</div>
                        <div className="data">76392734029</div>
                    </li>

                    <li>
                        <div className="title">Make</div>
                        <div className="data">Ford</div>
                    </li>

                    <li>
                        <div className="title">Model</div>
                        <div className="data">Mustang</div>
                    </li>

                    <li>
                        <div className="title">Year</div>
                        <div className="data">2018</div>
                    </li>

                    <li>
                        <div className="title">Created Date</div>
                        <div className="data">7/28/2021</div>
                    </li>

                  
                </ul>
           </div>

           <div className="pr-btn h-44 mb-2 bg-yesil mw-500 mx-auto">New Device</div>
           <div className="outline-button h-44 bg-mor mw-500 mx-auto     border-none text-white">Recently Added</div>
        </div>
    )
}}

export default AllSet
