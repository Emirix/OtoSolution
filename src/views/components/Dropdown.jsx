import React,{useState,useEffect} from 'react'
import Buyutec from "../../assets/svg/buyutec.svg"
function Dropdown({title,data,object,index,onChange,onSelect}) {
    const [payload,setPayload] = useState(data)
    return (
        <div className="emir-dropdown">
            <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="title">Select {title}</div>
            <div className="dp-search">
                <img src={Buyutec} width="20" height="20" />
                <input onChange={e=>{
                    onChange(e)
                    
                }}
                
                onKeyUp={e=>{
                    var filter, li, a, i, txtValue;
                    filter = e.target.value.toUpperCase();
                    li = document.querySelectorAll(".emir-dropdown__select");

                    for (i = 0; i < li.length; i++) {
                        a = li[i]
                        txtValue = a.textContent || a.innerText;
                        if (txtValue.toUpperCase().indexOf(filter) > -1) {
                            li[i].style.display = "";
                        } else {
                            li[i].style.display = "none";
                        }
                    }
                }}
                
                type="text" placeholder={"Search "+ title} />
            </div>
            </div>
            <div className="emir-dropdown__selectbox">
                {data.length == 0 ? "There is no "+title:""}
                {data.map((val,i)=>{
                    return(
                        <div onClick={(e,r)=>{
                            onSelect(e.currentTarget.dataset.val,val[object])
                            e.currentTarget.parentNode.parentNode.classList.remove("emir-dropdown-acik")
                        }} key={i} data-val={val[index]} className="emir-dropdown__select">{val[object]}</div>
                    )
                })}
               
            </div>
        </div>
    )
}

export default Dropdown
