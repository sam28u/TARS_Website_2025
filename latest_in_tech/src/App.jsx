import Tars_logo from './blogs/Tars_logo.jsx'
import Nav_bar from './blogs/nav_bar.jsx'
import Carousel from './blogs/crousel.jsx'


function App() {
  
  return (
    <>
   #<div style= {{ display: 'flex',justifyContent:'space-evenly'   }}> 
   <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        gap: '1rem',
        padding: '1rem',
        minHeight: '100vh',
        boxSizing: 'border-box'
      }}
    ></div>
   
       <Tars_logo/> 
         <Carousel/>
       <Nav_bar/> 
      
       </div> 
    </>
  );
}

export default App