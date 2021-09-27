import React,{useState,useEffect,useRef} from 'react'

function SolBildirim({img,title,caption,show,onKapat}) {

    const [width,setWidth] = useState(100)
    const [kapat,setKapat] = useState(false)
    const [gizle,setGizle] = useState(show)
    const bil = useRef(null);
    
    
    useEffect(()=>{
       
        
            setTimeout(()=>{
                
                bil.current.style.display = "none"
            },4000)
       
      
       return ()=>{
           bil.current.style.display = "block"
       }
    },[])

  

   
        return(
            <div ref={bil} className="sol-bildirim" style={kapat  ? {animation:"bildirim-kapat .5s"} : {}}>
            <div className="sol-bildirim__flex">
                <div className="close-en" onClick={(e)=>{
                    onKapat(e)
                }}></div>
            <img src={"/icons/"+img+".svg"} alt="" />
            <div className="right-en">
                <div className="title">{title}</div>
                <div className="caption">{caption}</div>
            </div>
            </div>
           
        </div>
        )
   
}

export default SolBildirim
