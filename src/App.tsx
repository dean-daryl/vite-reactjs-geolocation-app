import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="bg-amber-50 font-bold hover:text-red-400">Wassup this is your guy!!</h1>
    </>
  );
}

export default App;
