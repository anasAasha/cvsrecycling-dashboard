// Routers.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Items from '../pages/Items';
import Mechanics from '../pages/Mechanics';
import Drivers from '../pages/Drivers';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';

import Order from '../pages/Order'; 
import SettingPage from '../components/setting/SettingPage'; 
import Invoices from '../pages/Invoices'; 
import InvoiceDetails from '../components/utils/InvoiceDetails'; 
import { useAuth } from '../context/AuthContext';
import NotFound from '../components/utils/NotFound';
// import Chart from '../components/utils/DailyPriceChart';
import MechanicsDetails from '../components/mechanics/MechanicsDetails'
import Store from '../pages/Store';
import DriverDetails from '../components/drivers/DriverDetails';
import ItemDetails from '../components/items/ItemDetails';
import ContactUsMessages from '../components/utils/ContactUsMessages';
import StoreDetails from '../components/store/storeDetails';
import OrderDetails from '../components/orders/OrderDetails';

function Routers() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Dashboard /> : <Navigate to="/signin" />}
      />
      <Route
        path="/items"
        element={token ? <Items /> : <Navigate to="/signin" />}
      />
      <Route
        path="/mechanics"
        element={token ? <Mechanics /> : <Navigate to="/signin" />}
      />
      <Route
        path="/drivers"
        element={token ? <Drivers /> : <Navigate to="/signin" />}
      />
      <Route
        path="/drivers/:id"
        element={token ? <DriverDetails /> : <Navigate to="/signin" />}
      />
         <Route
        path="/mechanics/:id"
        element={token ? <MechanicsDetails /> : <Navigate to="/signin" />}
      />
         <Route
        path="/items/:id"
        element={token ? <ItemDetails /> : <Navigate to="/signin" />}
      />
         <Route
        path="/order/:id"
        element={token ? <OrderDetails /> : <Navigate to="/signin" />}
      />
         <Route
        path="/store/:id"
        element={token ? <StoreDetails /> : <Navigate to="/signin" />}
      />
      <Route
        path="/order"
        element={token ? <Order /> : <Navigate to="/signin" />}
      />
      <Route
        path="/setting"
        element={token ? <SettingPage /> : <Navigate to="/signin" />}
      />
      <Route
        path="/invoices"
        element={token ? <Invoices /> : <Navigate to="/signin" />}
      />
      <Route
        path="/store"
        element={token ? <Store /> : <Navigate to="/signin" />}
      />
      <Route
        path="/invoices/:id"
        element={token ? <InvoiceDetails /> : <Navigate to="/signin" />}
      />
      <Route
        path="/contact"
        element={token ? <ContactUsMessages /> : <Navigate to="/signin" />}
      />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/notfound" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/notfound" />} />
    </Routes>
  );
}

export default Routers;
