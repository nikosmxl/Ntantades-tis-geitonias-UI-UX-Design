import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoggedOutLayout from "./Layouts/LoggedOutLayout";
import ParentLayout from './Layouts/ParentLayout';
import BabysitterLayout from './Layouts/BabysitterLayout';
import LiveChat from './components/Live Chat/LiveChat';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route
              path='/'
              element={
                <LoggedOutLayout/>
              }
            />
            <Route
              path='/parent'
              element={
                <ParentLayout/>
              }
            />
            <Route
              path='/babysitter'
              element={
                <BabysitterLayout/>
              }
            />
          </Routes>
        </div>
        <LiveChat />
      </BrowserRouter>
    </div>
  );
}

export default App;
