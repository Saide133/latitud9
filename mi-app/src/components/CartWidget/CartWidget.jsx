import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './CartWidget.css'

const CartWidget = () => {
  const { getTotalQuantity } = useCart()
  const totalQuantity = getTotalQuantity()

  return (
    <Link to='/cart' className='cart-widget'>
      🛒
      {totalQuantity > 0 && (
        <span className='cart-widget__count'>{totalQuantity}</span>
      )}
    </Link>
  )
}

export default CartWidget