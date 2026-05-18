import { useState } from 'react'
import './ItemCount.css'

const ItemCount = ({ stock, onAdd }) => {
  const [quantity, setQuantity] = useState(1)

  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const increment = () => {
    if (quantity < stock) setQuantity(quantity + 1)
  }

  return (
    <div className='item-count'>
      <div className='item-count__controls'>
        <button
          className='item-count__btn'
          onClick={decrement}
          disabled={quantity <= 1}
        >
          −
        </button>
        <span className='item-count__value'>{quantity}</span>
        <button
          className='item-count__btn'
          onClick={increment}
          disabled={quantity >= stock}
        >
          +
        </button>
      </div>

      <button
        className='item-count__add'
        onClick={() => onAdd(quantity)}
        disabled={stock === 0}
      >
        {stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
      </button>
    </div>
  )
}

export default ItemCount