import React,{useState,useEffect} from 'react'
import Buyutec from "../../assets/svg/buyutec.svg"
function Dropdown({title,data,object,index,onChange,onSelect,addNull,hideSearch}) {
    const [payload,setPayload] = useState(data)
    return (
        <div className="emir-dropdown">
            <div className="d-flex j align-items-center mb-3">
            <div className="title">Select {title}</div>
            {!hideSearch ? 
            <div className=" ms-auto dp-search">
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
            : ""} <div onClick={e=>{                            e.currentTarget.parentNode.parentNode.classList.remove("emir-dropdown-acik")
}} className={hideSearch ? "ms-auto dropdown-kapat br-8" : "ms-2 dropdown-kapat br-8"}><svg  viewBox="0 0 262 262" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M253 9L9 253M9 9L253 253" stroke="#ffffff" strokeWidth="40"/>
</svg>
</div>
            </div>
            
            <div className="emir-dropdown__selectbox">
                {addNull ?  <div onClick={(e,r)=>{
                            onSelect(null,null)
                            e.currentTarget.parentNode.parentNode.classList.remove("emir-dropdown-acik")
                        }} data-val={null} className="emir-dropdown__select">Nothing</div>
                 : ""}
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
