import React from 'react'

function MotionCars({src,marka,model,since}) {
    function changePhoto(e){
        const parent = e.target.parentElement.parentElement
        parent.style.backgroundImage = src[e.target.dataset.index]

        for(var i = 0;i < document.querySelectorAll(".slide").length; i++){
            document.querySelectorAll(".slide")[i].classList.remove("active")
            
        }
        e.target.classList.add("active")
        console.log(e.target)
    }
    return (
        <div className="motion-car">
            <div className="sol">
                <div style={{backgroundImage:src[0]}}  className="motion-car__slider">
                    <div className="slider">
                        
                        {src.map((val,index)=>{
                            return(
                                <div data-index={index} onClick={e=>{changePhoto(e)}} className={index == 0 ? "slide active" : "slide" } key={index}></div>
                            )
                        })}
                        
                       
                    </div>
                </div>
                <div className="car-info">
                    <div className="marka">{marka}</div>
                    <div className="model">{model}</div>
                    <div className="since">Since {since}PM</div>
                </div>
            </div>
            <div className="sag">
                <div className="progress-title ">
                    <div className="title">Gas</div>
                    <div className="progress2 pro-sari">
                        <div className="cubuk"></div>
                    </div>
                </div>

                <div className="progress-title ">
                    <div className="title">Gas</div>
                    <div className="progress2 pro-yesil">
                        <div className="cubuk"></div>
                    </div>
                </div>


                <div className="progress-title ">
                    <div className="title">Gas</div>
                    <div className="progress2 pro-sari">
                        <div className="cubuk"></div>
                    </div>
                </div>

                <div className="progress-title ">
                    <div className="title">Gas</div>
                    <div className="progress2 pro-sari">
                        <div className="cubuk"></div>
                    </div>
                </div>


                <div className="progress-title ">
                    <div className="title">Gas</div>
                    <div className="progress2 pro-sari">
                        <div className="cubuk"></div>
                    </div>
                </div>

                <div className="outline-button w-50 ms-auto mt-2">Details</div>

            </div>
        </div>
    )
}

export default MotionCars
