import Tars_logo from './blogs/Tars_logo.jsx'
import Nav_bar from './blogs/nav_bar.jsx'
import Carousel from './blogs/crousel.jsx'


function App() {
  
  return (
    <>
   <div style= {{ display: 'flex',justifyContent:'space-evenly'   }}> 
       <Tars_logo/> 
         <Carousel/>
       <Nav_bar/> 
      
       </div> 
    </>
  );
}

export default App



