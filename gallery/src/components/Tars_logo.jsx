
import logo from "./logo.svg";
import './gallery.css'
function Tars_logo() {
  return (
    <>
      <div> 
        <div className="logo">
             <img  className="logo-svg" src={logo} alt="Logo" width="100" height="100" />
        </div>
        <div className="text-container">
          <div className="text">
            <p className="text-font">T</p>
          </div>
          <div className="text">
            <p className="text-font">A</p>
          </div>
          <div className="text">
            <p className="text-font">R</p>
          </div>
          <div className="text">
            <p className="text-font">S</p>
          </div>
        </div>  
      </div>
    </>
  );
}

export default Tars_logo;
