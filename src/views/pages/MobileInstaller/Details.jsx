import React from 'react'

function Details() {
    return (
        <div className="p-3">
           <div className="details br-12 p-3">
               <div className="mini-title text-center ">Check Details Below</div>
               <div className="r-a__caption mt-2 text-center">If details are not matched, please scan again</div>
           
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

           <div className="pr-btn h-44 mb-3 bg-yesil mw-500 mx-auto">Approve</div>
           <div className="outline-button h-44 mw-500 mx-auto">Scan Again</div>
        </div>
    )
}

export default Details
