import './index.css';       
import Gallery from './components/Gallery';
import Nav_bar from './components/Nav_bar';
import Tars_logo from './components/Tars_logo';

function App() {
  return (
    <div style={{ 
      display: 'flex',
      minHeight: '100vh',
      width: '100%',
      position: 'relative'
    }}> 
      {/* Left side - Logo and TARS text - Fixed */}
      <div style={{ 
        width: '200px',
        flexShrink: 0,
        position: 'fixed',
        left: 0,
        top: -50,
        height: '100vh',
        zIndex: 1000
      }}>
        <Tars_logo/> 
      </div>
      
      {/* Center - Carousel - Scrollable */}
      <div style={{ 
        flex: 1,
        // marginLeft: '210px',
        // marginTop: '210px',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}>
        <Gallery/>
      </div>
      
      {/* Right side - Navigation - Fixed */}
      <div style={{ 
        width: '200px',
        flexShrink: 0,
        position: 'fixed',
        right: 0,
        top: -50,
        height: '100vh',
        zIndex: 1000
      }}>
        <Nav_bar/> 
      </div>
    </div>
  );
}

export default App