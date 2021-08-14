import "./assets/css/bootstrap.min.css"
import "./assets/scss/style.css"
import Header from "./views/components/Header"
import Sidebar from "./views/components/Sidebar"
import Index from "./views/pages/Index"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import VehicleDetails from "./views/pages/VehicleDetails"
import AddNewCar from "./views/pages/AddNewCar"
import CarList from "./views/pages/CarList"
import OtoLink from "./views/pages/OtoLink"

function App() {
  return (
    <Router>
    <div className="container-fluid p-0">
      <Sidebar/>
      <div className="page">
        <Header/>
        <Switch>
          <Route exact path="/">
            <Index />
          </Route>

          <Route exact path="/add-new-car">
            <AddNewCar/>
          </Route>

          <Route exact path="/vehicle-details">
              <VehicleDetails/>
          </Route>

          <Route exact path="/car-list">
              <CarList/>
          </Route>

          <Route exact path="/oto-link">
              <OtoLink/>
          </Route>
        
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
