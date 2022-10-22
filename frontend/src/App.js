import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />

        <main>
          <Routes>
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
