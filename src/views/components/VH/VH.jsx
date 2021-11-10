import React from 'react'
function VH({src,marka,model,fiyat}) {
    function changePhoto(e){
        const parent = e.target.parentElement.parentElement.parentElement.querySelector("img")
        parent.src = src[e.target.dataset.index]

        for(var i = 0;i < document.querySelectorAll(".slide").length; i++){
            document.querySelectorAll(".slide")[i].classList.remove("active")
            
        }
        e.target.classList.add("active")
    }

    return (
        <div className="vehicle-details">
            <div className="vd-top">
                <div className="marka">{marka}</div>
                <div className="model">{model}</div>

                <div className="slider">
                {src.map((val,index)=>{
                            return(
                                <div data-index={index} onClick={e=>{changePhoto(e)}} className={index == 0 ? "slide active" : "slide" } key={index}></div>
                            )
                        })}
                </div>
            </div>
            <img src={src[0]} alt="" className="br-12" />
            <div className="vd-status br-12">Available</div>
            <div className="vd-fiyat d-none">{fiyat}</div>
        </div>
    )
}

export default VH
