import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addItem = (item, quantity) => {
    const exists = cart.find(p => p.id === item.id)
    if (exists) {
      setCart(cart.map(p =>
        p.id === item.id ? { ...p, quantity: p.quantity + quantity } : p
      ))
    } else {
      setCart([...cart, { ...item, quantity }])
    }
  }

  const removeItem = (itemId) => {
    setCart(cart.filter(p => p.id !== itemId))
  }

  const clearCart = () => {
    setCart([])
  }

  const isInCart = (itemId) => {
    return cart.some(p => p.id === itemId)
  }

  const getTotalQuantity = () => {
    return cart.reduce((acc, p) => acc + p.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((acc, p) => acc + p.price * p.quantity, 0)
  }

  const updateQuantity = (itemId, quantity) => {
  if (quantity <= 0) {
    removeItem(itemId)
    return
  }
  setCart(cart.map(p =>
    p.id === itemId ? { ...p, quantity } : p
  ))
}

  return (
    <CartContext.Provider value={{
      cart,
      addItem,
      removeItem,
      clearCart,
      isInCart,
      updateQuantity,
      getTotalQuantity,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)