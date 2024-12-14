import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LiveChat from './Components/Live Chat/LiveChat';
import WelcomeNavBar from './Components/WelcomeNavBar/WelcomeNavBar';
import NavBar from './Components/NavBar/NavBar';
import Home from './Pages/Common Pages/Home/Home';
import routes from './routes';

function App() {

  const getRoutes = (context) => {
    return routes.filter((route) => route.context === context).map((route) => {
      return <Route
        key={`${context}/${route.path}/route`}    // monadiko key
        path={route.path}
        element={route.page}
      />
    });
  };

  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <WelcomeNavBar />
                  <Outlet />
                </>
              }
            >
              <Route index element={<Home />} /> {/* Default sub-route */}
              { getRoutes('loggedOut') }
              <Route path='*' element={<Navigate to='/' replace />} /> {/* Return to home page if invalid route */}
            </Route>
            <Route
              path='/parent'
              element={
                <>
                  <NavBar />
                  <Outlet />
                </>
              }
              exact
            >
              <Route index element={<Home />} /> {/* Default sub-route */}
              { getRoutes('parent') }
              <Route path='*' element={<Navigate to='/' replace />} /> {/* Return to home page if invalid route */}
            </Route>
            <Route
              path='/babysitter'
              element={
                <>
                  <NavBar />
                  <Outlet />
                </>
              }
            >
              <Route index element={<Home />} /> {/* Default sub-route */}
              { getRoutes('babysitter') }
              <Route path='*' element={<Navigate to='/' replace />} /> {/* Return to home page if invalid route */}
            </Route>
          </Routes>
        </div>
        <LiveChat />
      </BrowserRouter>
    </div>
  );
}

export default App;
