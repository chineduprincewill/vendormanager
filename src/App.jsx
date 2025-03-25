import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import DefaultLayout from './protected/layout/DefaultLayout'
import PrivateRoute from './protected/layout/PrivateRoute'
import Dashboard from './protected/dashboard/Dashboard'
import AppContextProvider from "./context/AppContext";
import 'leaflet/dist/leaflet.css';
import Login from "./public/login/Login";
import Registrations from "./protected/registrations/Registrations";
import Vendors from "./protected/vendors/Vendors";
import Reviews from "./protected/reviews/Reviews";

function App() {

  const url = window.location.href;
  const tokenval = url.split('#')[1];
  tokenval && localStorage.setItem('token', tokenval);
  
  return (
    <div className={`w-full `}>
      <AppContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<PrivateRoute><DefaultLayout /></PrivateRoute>}>
              <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/registrations" element={<PrivateRoute><Registrations /></PrivateRoute>} />
              <Route path="/vendors" element={<PrivateRoute><Vendors /></PrivateRoute>} />
              <Route path="/reviews" element={<PrivateRoute><Reviews /></PrivateRoute>} />
            </Route>
          </Routes>
        </Router>
      </AppContextProvider>
    </div>
  )
}

export default App
