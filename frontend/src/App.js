import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Home from './screens/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './screens/About';
import Tickets from './screens/Tickets';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Account from './screens/Account';
import TrainScreen from './screens/TrainScreen';
import PaymentMethod from './screens/PaymentMethod';
import { useContext } from 'react';
import { Store } from './Store';
import Station from './screens/Station';
import PlaceOrder from './screens/PlaceOrder';
import Order from './screens/Order';
import OrderHistory from './screens/OrderHistory';

function App() {
  const { state } = useContext(Store);

  const { userInfo } = state;
  console.log(userInfo);

  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="bottom-center" limit={1} />
        <Navbar item={userInfo} />

        <main>
          <Routes>
            <Route path="/orderhistory" element={<OrderHistory />} />
            <Route path="/orders/:id" element={<Order />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/payment" element={<PaymentMethod />} />
            <Route path="/station" element={<Station />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/account" element={<Account />} />
            <Route path="/trains/:slug" element={<TrainScreen />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/about" element={<About />} />
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
