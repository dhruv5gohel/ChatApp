import 'rsuite/dist/rsuite.min.css';
import { Routes, Route } from "react-router-dom"
import SignIn from './Pages/SignIn';
import PublicRoute from './Components/PublicRoute';
import PrivateRoute from './Components/PrivateRoute';
import Home from './Pages/Home';

function App() {
  return (
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
  );
}

export default App;
