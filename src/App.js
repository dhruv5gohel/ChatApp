import 'rsuite/dist/rsuite.min.css';
import { Routes, Route } from "react-router-dom"
import SignIn from './Pages/SignIn';
import PublicRoute from './Components/PublicRoute';
import PrivateRoute from './Components/PrivateRoute';
import Home from './Pages/Home/Home';
import "./style/utility.css"
import "./style/style.css"
import { ProfileProvider } from './context/ProfileContext';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <ProfileProvider>

        <Routes>
          <Route exact path="/signin" element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          } />

          <Route exact path="*" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />

        </Routes>
        <ToastContainer position="top-center" />
    </ProfileProvider>
  );
}

export default App;
