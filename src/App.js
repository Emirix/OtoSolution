import "./assets/css/bootstrap.min.css"
import "./assets/scss/style.css"
import React, { useEffect, useLayoutEffect, useState } from 'react';

import Header from "./views/components/Header"
import MobileHeader from "./views/pages/MobileInstaller/Header"
import Sidebar from "./views/components/Sidebar"
import Index from "./views/pages/Index"
import Login from "./views/pages/Login"
import Out from "./views/pages/Out"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory

} from "react-router-dom";
import VehicleDetails from "./views/pages/VehicleDetails"
import AddNewCar from "./views/pages/AddNewCar"
import CarList from "./views/pages/CarList"
import OtoLink from "./views/pages/OtoLink"
import Add from "./views/pages/MobileInstaller/Add"
import Provider from "./views/components/Provider"
import Details from "./views/pages/MobileInstaller/Details"
import AllSet from "./views/pages/MobileInstaller/AllSet"
import Error from "./views/pages/MobileInstaller/Error"
import DealerList from "./views/pages/DealerList";
import AddDealer from "./views/pages/AddDealer";
import DealerInfo from "./views/pages/DealerInfo";
import ParkingLotList from "./views/pages/ParkingLotList";
import AddLot from "./views/pages/AddLot";
import LotInfo from "./views/pages/LotInfo";




function App() {
  let history = useHistory()

  function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

  //const isMobile = detectMob();
  const isMobile = false;



  return (
    <Router>
      
    <div className="container-fluid p-0">
      <Sidebar/>
      
        <Provider>
        <Header/>
        <MobileHeader/>
        <Switch>
          <Route exact path="/">
            {
              isMobile ? <Redirect to="/mobile/add"/> : <Index />
            }
          </Route>

          <Route exact path="/add-new-car">
            {
              isMobile ? <Redirect to="/mobile/add"/> :  <AddNewCar/>
            }
           
          </Route>


          
          <Route exact path="/dealership-list">      
              <DealerList/>
          </Route>

          <Route exact path="/add-dealer">      
              <AddDealer/>
          </Route>

          <Route exact path="/dealer">      
             <DealerInfo/>
          </Route>

          <Route exact path="/parking-lots">      
            <ParkingLotList/>
          </Route>

          <Route exact path="/add-lot">      
            <AddLot/>
          </Route>


          <Route exact path="/lot/:id">      
            <LotInfo/>
          </Route>


          

          <Route exact path="/vehicle-details/:id">
          {
              isMobile ? <Redirect to="/mobile/add"/> :  <VehicleDetails/>
            }
              
          </Route>

          <Route exact path="/car-list">
           

            {
              isMobile ? <Redirect to="/mobile/add"/> :    <CarList/>
            }
          </Route>

          <Route exact path="/mobile">
            <Redirect to="/mobile/adad"/>
          </Route>

          <Route exact path="/oto-link">
             
            {
              isMobile ? <Redirect to="/mobile/add"/> :    <OtoLink/>
            }
          </Route>

          <Route exact path="/mobile/add">
              <Add/>
          </Route>

          <Route exact path="/mobile/detail">
              <Details/>  
          </Route>

          
          <Route exact path="/mobile/all-set">
              <AllSet/>
          </Route>

          <Route exact path="/mobile/error">
              <Error/>  
          </Route>
        


          <Route exact path="/login">
              <Login/>
          </Route>

          <Route exact path="/logout">
              <Out/>
          </Route>
        
        </Switch>
        </Provider>
    </div>
    </Router>
  );
}

export default App;
