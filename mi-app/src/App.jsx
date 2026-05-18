import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { CartProvider } from './context/CartContext'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout'
import Confirmation from './components/Confirmation/Confirmation'

const App = () => {
  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
        <ScrollToTop />
         <NavBar />
         <main style={{ flex: '1' }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/category/:categoryId' element={<ItemListContainer />} />
            <Route path='/item/:itemId' element={<ItemDetailContainer />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/confirmation/:orderId' element={<Confirmation />} />
          </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App