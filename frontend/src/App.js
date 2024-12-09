import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./Pages/Common Pages/Home/Home"
import WelcomeNavBar from './Components/WelcomeNavBar/WelcomeNavBar';
import NavBar from './Components/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <WelcomeNavBar /> */}
        <NavBar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
