import React from 'react'
import DataTable from "../components/DataTable"
import Page from './Page'
import { Redirect,Link} from "react-router-dom";
import axios from "axios"
class CarList extends React.Component {
  constructor(){
    super()
    this.state = {
      dealers:[],
      parkingLots:[],
      lotFiltre:null,
      dealerFiltre:null
    }
  }
  componentDidMount(){
    axios.all([
      axios.get(`/api/dealer/vehicles`), 
      axios.get(`/api/dealer/lots`),
      axios.get("/admin/api/dealers",{
        headers:{
          "Authorization" : `Token ${localStorage.getItem("key")}`
        }
      })
    ])
    .then(axios.spread((car, lot,dealer) => {
      this.setState({
        carList:car.data,
        parkingLots:lot.data,
        dealers:dealer.data
      })
     
      console.log(dealer.data)
      
      
    }));
  }
  render() {
    return (
      <Page>
        <div className="page-wrapper">
        <div className="row mt-3 m-0">
          <div className="d-flex align-items-center mb-3 mobile-car-list flex-wrap">
            <div className="mini-title">Car List</div>
            <div className="ms-auto">
              <Link to="/add-new-car">
              <img src="icons/add-car.svg" alt="" className="add-car-button me-3" />

              </Link>
              <img src="icons/Import-csv.svg" alt="" className="add-car-button me-3" />
              <img src="icons/print.svg" alt="" onClick={()=>{
                var content = document.querySelector(".tb-container");
                var pri = document.querySelector("iframe").contentWindow;
                document.querySelector(".datatable-pagination").style.display = "none"
                for(var i=0;i < document.querySelectorAll(".row-search").length; i++){
                  document.querySelectorAll(".row-search")[i].style.display="none"
                }

                pri.document.open();
                pri.document.write(content.innerHTML);
                pri.document.close();
                pri.focus();
                pri.print();
                document.querySelector(".datatable-pagination").style.display = "flex"
                for(var i=0;i < document.querySelectorAll(".row-search").length; i++){
                  document.querySelectorAll(".row-search")[i].style.display="block"
                }

              }} className="me-3 add-car-button" />
            </div>
          </div>

          <div className="table-header-buttons">
            <button>All</button>
            <button className="active">Dealers</button>
          </div>

          <div className="table-header-border"></div>

          <div className="table-header-buttons dealer-buttons">
            <button className="active" onClick={e=>{
                    document.querySelectorAll(".dealer-buttons button").forEach(e=>e.classList.remove("active"))
                    e.currentTarget.classList.add("active")
                    this.setState({dealerFiltre:null})
                  }}>All</button>
            {
              this.state.dealers.length != 0 ?
              this.state.dealers.results.map((val,i)=>{
                return(
                  <button onClick={e=>{
                    document.querySelectorAll(".dealer-buttons button").forEach(e=>e.classList.remove("active"))
                    e.currentTarget.classList.add("active")

                    console.log(document.querySelector("#root > div > div.page > div:nth-child(3) > div > div:nth-child(2) > div > table > thead > tr > th:nth-child(9) > div > div > input"))
                    document.querySelector("#root > div > div.page > div:nth-child(3) > div > div:nth-child(2) > div > table > thead > tr > th:nth-child(9) > div > div > input").value= e.currentTarget.innerText
                    var event = new Event('input', { bubbles: true });
                    document.querySelector("#root > div > div.page > div:nth-child(3) > div > div:nth-child(2) > div > table > thead > tr > th:nth-child(9) > div > div > input").dispatchEvent(event);
                    document.querySelector("#root > div > div.page > div:nth-child(3) > div > div:nth-child(2) > div > table > thead > tr > th:nth-child(9) > div > div > input").focus()
                    document.querySelector("#root > div > div.page > div:nth-child(3) > div > div:nth-child(2) > div > table > thead > tr > th:nth-child(9) > div > div > input").blur()
                
                    
                  }} data-id={val.id} title={val.address} key={i}>{val.name}</button>
                )
              }) : <div className="d-flex">
              <div className="skeleton-text-yuksek w-50px"></div>
              <div className="skeleton-text-yuksek ms-3 w-50px"></div>
              <div className="skeleton-text-yuksek ms-3 w-50px"></div>
              <div className="skeleton-text-yuksek ms-3 w-50px"></div>
              <div className="skeleton-text-yuksek ms-3 w-50px"></div>
              <div className="skeleton-text-yuksek ms-3 w-50px"></div>
              <div className="skeleton-text-yuksek ms-3 w-50px"></div>
              <div className="skeleton-text-yuksek ms-3 w-50px"></div>
              <div className="skeleton-text-yuksek ms-3 w-50px"></div>
                            </div>
            }
          </div>

          <div className="table-header-border"></div>
          <div className="table-header-buttons lot-buttons">
           
            <button className="active" onClick={e=>{
                    document.querySelectorAll(".lot-buttons button").forEach(e=>e.classList.remove("active"))
                    e.currentTarget.classList.add("active")
                              
                    document.querySelector("#root > div > div.page > div:nth-child(3) > div > div:nth-child(2) > div > table > thead > tr > th:nth-child(13) > div > div > input").value= ""
                    var event = new Event('input', { bubbles: true });
                    document.querySelector("#root > div > div.page > div:nth-child(3) > div > div:nth-child(2) > div > table > thead > tr > th:nth-child(13) > div > div > input").dispatchEvent(event);
                    document.querySelector("#root > div > div.page > div:nth-child(3) > div > div:nth-child(2) > div > table > thead > tr > th:nth-child(13) > div > div > input").focus()
                    document.querySelector("#root > div > div.page > div:nth-child(3) > div > div:nth-child(2) > div > table > thead > tr > th:nth-child(13) > div > div > input").blur()
                  }}>All</button>
            {
              this.state.parkingLots.length != 0 ?
              this.state.parkingLots.results.map((val,i)=>{
                return(
                  <button onClick={e=>{
                    document.querySelectorAll(".lot-buttons button").forEach(e=>e.classList.remove("active"))
                    e.currentTarget.classList.add("active")
                    console.log(document.querySelector("#root > div > div.page > div:nth-child(3) > div > div:nth-child(2) > div > table > thead > tr > th:nth-child(13) > div > div > input"))
                    document.querySelector("#root > div > div.page > div:nth-child(3) > div > div:nth-child(2) > div > table > thead > tr > th:nth-child(13) > div > div > input").value= e.currentTarget.innerText
                    var event = new Event('input', { bubbles: true });
                    document.querySelector("#root > div > div.page > div:nth-child(3) > div > div:nth-child(2) > div > table > thead > tr > th:nth-child(13) > div > div > input").dispatchEvent(event);
                    document.querySelector("#root > div > div.page > div:nth-child(3) > div > div:nth-child(2) > div > table > thead > tr > th:nth-child(13) > div > div > input").focus()
                    document.querySelector("#root > div > div.page > div:nth-child(3) > div > div:nth-child(2) > div > table > thead > tr > th:nth-child(13) > div > div > input").blur()
                  }} data-id={val.id} title={val.address} key={i}>{val.name}</button>
                )
              }) : <div className="d-flex">
<div className="skeleton-text-yuksek w-50px"></div>
<div className="skeleton-text-yuksek ms-3 w-50px"></div>
<div className="skeleton-text-yuksek ms-3 w-50px"></div>
<div className="skeleton-text-yuksek ms-3 w-50px"></div>
<div className="skeleton-text-yuksek ms-3 w-50px"></div>
<div className="skeleton-text-yuksek ms-3 w-50px"></div>
<div className="skeleton-text-yuksek ms-3 w-50px"></div>
<div className="skeleton-text-yuksek ms-3 w-50px"></div>
<div className="skeleton-text-yuksek ms-3 w-50px"></div>
              </div>
            }
              
          </div>

          
        </div>

        <div className="row  mt-3 m-0">
          <div className="tb-container">
          <DataTable key={0} lotFiltre={this.state.lotFiltre} dealerFiltre={this.state.dealerFiltre} />
          </div>
        </div>
        </div>
        </Page> 
    )
  }
}

export default CarList
