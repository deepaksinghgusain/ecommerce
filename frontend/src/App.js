import './App.css';
import Home from './controllers/Home';
import Footer from './controllers/layouts/Footer';
import Header from './controllers/layouts/Header';

import { Routes, Route } from 'react-router-dom';
import ProductDetails from './controllers/product/ProductDetails';
import Login from './controllers/user/Login';
import Register from './controllers/user/Register';
import { loadUser } from './actions/userActions';
import store from './store';
import { useEffect } from 'react';
import Profile from './controllers/user/Profile';
import ProtectedRoutes from './controllers/routes/ProtectedRoutes';
import UpdateProfile from './controllers/user/UpdateProfile';
import UpdatePassword from './controllers/user/UpdatePassword';
import ForgotPassword from './controllers/user/ForgotPassword';
import NewPassword from './controllers/user/NewPassword';

function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <div className="App">
      <Header />
      <div className="container container-fluid">
        <Routes>
          <Route path="/product/:id" element={<ProductDetails />} exact />
          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/" element={<Home />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/register" element={<Register />} exact />
          <Route path="/password/forgot" element={<ForgotPassword />} exact />
          <Route path="/password/reset/:token" element={<NewPassword />} exact />
          <Route path="/me" element={<ProtectedRoutes isAdmin="true"><Profile /></ProtectedRoutes>} exact />
          <Route path="/me/update" element={<ProtectedRoutes isAdmin="true"><UpdateProfile /></ProtectedRoutes>} exact />
          <Route path="/password/update" element={<ProtectedRoutes isAdmin="true"><UpdatePassword /></ProtectedRoutes>} exact />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
