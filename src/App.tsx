import { useState } from 'react';
import './App.css';
import Navbar from './components/navbar';
import Footer from './components/footer';
import PopUp from './components/popup';
import MapContainer from './components/mapContainer';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <MapContainer />
      <Footer />
    </>
  );
}

export default App;
