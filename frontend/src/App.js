import './App.css';
import Home from './controllers/Home';
import Footer from './controllers/layouts/Footer';
import Header from './controllers/layouts/Header';

import {Routes,Route} from 'react-router-dom';
import ProductDetails from './controllers/product/ProductDetails';

function App() {
  return (
        <div className="App">
          <Header />
          <div className="container container-fluid">
            <Routes>
                <Route path="/product/:id" element={<ProductDetails/>} exact />
                <Route path="/search/:keyword" element={<Home />}  />
                <Route path="/" element={<Home />} exact />
            </Routes>
          </div>
          <Footer />
        </div>
  );
}

export default App;
