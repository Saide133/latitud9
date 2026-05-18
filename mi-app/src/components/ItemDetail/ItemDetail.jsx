import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import ItemCount from '../ItemCount/ItemCount'
import './ItemDetail.css'

const ItemDetail = ({ item }) => {
  const [added, setAdded] = useState(false)
  const { addItem, isInCart } = useCart()

  const { name, category, origin, roast, notes, price, stock, description, image } = item

  const handleAdd = (quantity) => {
    addItem(item, quantity)
    setAdded(true)
  }

  return (
    <div className='item-detail'>
      <img
        className='item-detail__image'
        src={image}
        alt={name}
      />

      <div className='item-detail__info'>
        <p className='item-detail__eyebrow'>{origin || category}</p>
        <h1 className='item-detail__name'>{name}</h1>
        <p className='item-detail__price'>${price.toFixed(2)}</p>

        <div className='item-detail__divider'></div>

        <p className='item-detail__description'>{description}</p>

        <div className='item-detail__tags'>
          {roast && (
            <span className='item-detail__tag'>
              <span>Tueste</span>{roast}
            </span>
          )}
          {notes && (
            <span className='item-detail__tag'>
              <span>Notas</span>{notes}
            </span>
          )}
          {origin && (
            <span className='item-detail__tag'>
              <span>Origen</span>{origin}
            </span>
          )}
        </div>

        <div className='item-detail__divider'></div>

        <p className='item-detail__stock'>
          {stock > 0 ? `${stock} unidades disponibles` : 'Sin stock'}
        </p>

        {!added && !isInCart(item.id) ? (
          <ItemCount stock={stock} onAdd={handleAdd} />
        ) : (
          <div className='item-detail__added'>
            <p className='item-detail__added-msg'>✓ Producto agregado al carrito</p>
            <Link to='/cart' className='item-detail__btn-cart'>
              Ver carrito
            </Link>
            <Link to='/' className='item-detail__btn-continue'>
              Seguir comprando
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default ItemDetail