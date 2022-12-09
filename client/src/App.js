import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      <Navbar/>
      <div className="container-fluid bg-light" style={{height: "100vh"}}>
        <div className="container">
          <div className="row pt-5">
            <div className="col-md-6">
              <div className="card">
                <Signup/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <Login/>
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
    </>
    
  );
}

export default App;
