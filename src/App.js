import 'rsuite/dist/rsuite.min.css';
import { Routes, Route } from "react-router-dom"
import SignIn from './Pages/SignIn';
import PublicRoute from './Components/PublicRoute';
import PrivateRoute from './Components/PrivateRoute';
import Home from './Pages/Home';
import "./style/utility.css"
import { ProfileProvider } from './context/ProfileContext';

function App() {
  return (
    <ProfileProvider>

      <Routes>
        <Route path="/signin" element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        } />

        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
      </Routes>
    </ProfileProvider>
  );
}

export default App;
