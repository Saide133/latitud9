import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './Cart.css'

const Cart = () => {
  const { cart, removeItem, clearCart, getTotalPrice, updateQuantity } = useCart()

  if (cart.length === 0) {
    return (
      <div className='cart'>
        <div className='cart__header'>
          <h1 className='cart__title'>Tu selección</h1>
        </div>
        <div className='cart__empty'>
          <p className='cart__empty-text'>Tu carrito está vacío</p>
          <Link to='/' className='cart__empty-link'>Ver productos</Link>
        </div>
      </div>
    )
  }

  return (
    <div className='cart'>
      <div className='cart__header'>
        <h1 className='cart__title'>Tu selección</h1>
      </div>

      <div className='cart__content'>
        <div className='cart__items'>
          {cart.map(item => (
            <div key={item.id} className='cart__item'>
              <img
                className='cart__item-image'
                src={item.image}
                alt={item.name}
              />
              <div className='cart__item-info'>
                <p className='cart__item-origin'>{item.origin || item.category}</p>
                <p className='cart__item-name'>{item.name}</p>
                <div className='cart__item-controls'>
                  <button
                    className='cart__item-btn'
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span className='cart__item-quantity'>{item.quantity}</span>
                  <button
                    className='cart__item-btn'
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className='cart__item-right'>
                <span className='cart__item-subtotal'>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  className='cart__item-remove'
                  onClick={() => removeItem(item.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className='cart__summary'>
          <p className='cart__summary-title'>Resumen</p>

          {cart.map(item => (
            <div key={item.id} className='cart__summary-row'>
              <span>{item.name} x{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <div className='cart__summary-divider'></div>

          <div className='cart__summary-total'>
            <span>Total</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>

          <Link to='/checkout' className='cart__summary-checkout'>
            Finalizar compra
          </Link>

          <button className='cart__summary-clear' onClick={clearCart}>
            Vaciar carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart