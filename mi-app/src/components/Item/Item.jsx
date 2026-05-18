import { Link } from 'react-router-dom'
import './Item.css'

const Item = ({ item }) => {
  const { id, name, category, origin, notes, price, stock, image } = item

  return (
    <div className='item-card'>
      <img
        className='item-card__image'
        src={image}
        alt={name}
        onError={e => e.target.style.background = 'var(--bg3)'}
      />
      <div className='item-card__body'>
        <p className='item-card__origin'>
          {origin || category}
        </p>
        <h3 className='item-card__name'>{name}</h3>
        {notes && (
          <p className='item-card__notes'>{notes}</p>
        )}
        {stock <= 5 && (
          <p className='item-card__stock-low'>⚡ Últimas {stock} unidades</p>
        )}
        <div className='item-card__footer'>
          <span className='item-card__price'>${price.toFixed(2)}</span>
          <Link to={`/item/${id}`} className='item-card__link'>
            Ver detalle
          </Link>
        </div>
        
      </div>
    </div>
  )
}

export default Item