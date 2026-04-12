import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import { Toaster } from "react-hot-toast";
import Login from "./components/accounts/Login";
import Profile from "./components/accounts/Profile";
import Register from "./components/accounts/Register";
import ChatLayout from "./components/layouts/ChatLayout";
import ErrorMessage from "./components/layouts/ErrorMessage";
import Header from "./components/layouts/Header";
import AuthProvider from "./contexts/AuthContext";
import WithPrivateRoute from "./utils/WithPrivateRoute";
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <ErrorMessage />
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/profile"
            element={
              <WithPrivateRoute>
                <Profile />
              </WithPrivateRoute>
            }
          />
          <Route
            exact
            path="/"
            element={
              <WithPrivateRoute>
                <ChatLayout />
              </WithPrivateRoute>
            }
          />
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
};

export default App;
