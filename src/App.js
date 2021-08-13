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
          <Route exact path="/vehicle-details">
              
          </Route>
        
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
