import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./Pages/Common Pages/Home/Home"
import WelcomeNavBar from './Components/WelcomeNavBar/WelcomeNavBar';
import NavBar from './Components/NavBar/NavBar';
import LiveChat from './Components/Live Chat/LiveChat';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Οταν ο χρηστης ειναι συνδεδεμενος τοτε θα εμφανιζεται το NavBar Αλλιως θα εμφανιζεται το WelcomeNavBar θα το φτιαξουμε οταν ερθει η ωρα */}
        {/* <WelcomeNavBar /> */}
        <NavBar />  
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home/>} />
          </Routes>
        </div>
        <LiveChat />
      </BrowserRouter>
    </div>
  );
}

export default App;
