import "./assets/css/bootstrap.min.css"
import "./assets/scss/style.css"
import Header from "./views/components/Header"
import Sidebar from "./views/components/Sidebar"
import Index from "./views/pages/Index"

function App() {
  return (
    <div className="container-fluid p-0">
      <Sidebar/>
      <div className="page">
        <Header/>
        <Index/>
      </div>
    </div>
  );
}

export default App;
