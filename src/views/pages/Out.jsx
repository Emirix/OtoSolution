import axios from 'axios'
import React,{useEffect,useState} from 'react'

function Login() {
   const [statusLogin,setSL] = useState("Çıkış yapılıyor")
    useEffect(()=>{

      axios.post("/api/account/logout/",{headers:{
        "Authorization" : `Token ${localStorage.getItem("key")}`
      }}).then(res=>{
        console.log(res)
        localStorage.removeItem("key")
        setSL("Çıkış Yapıldı")
        window.location="/"
      }).catch(err=>{
          setSL("Hata.")
      })
   
       
    },[])
    return (
        <div className="">
            <h5>{statusLogin}</h5>
        </div>
    )
}

export default Login
