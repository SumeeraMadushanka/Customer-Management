import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AdminDashboard from "./components/Admin/AdminDashboard";
import UserDashboard from "./components/User/UserDashboard";
import PrivateRoute from "./components/Routes/PrivateRoute";
import UserProfile from "./components/User/UserProfile";
import ResetPassword from "./components/Register/ResetPassword";


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={[<NavBar />, <Home />]} />
          <Route path="/login" element={[<NavBar />, <Login />]} />
          <Route path="/register" element={[<NavBar />, <Register />]} />
          <Route path="/passwordreset/:resetToken" element={[<NavBar />,<ResetPassword/>]} />

          <Route
            path="/user-dashboard/:username"
            element={
              <PrivateRoute>
                <NavBar />
                <UserDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin-dashboard/:username"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin-dashboard/:username/profile/:id"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
