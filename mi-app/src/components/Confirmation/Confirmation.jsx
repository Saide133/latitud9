import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import './Confirmation.css'

const Confirmation = () => {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const { orderId } = useParams()

  useEffect(() => {
    const orderDoc = doc(db, 'orders', orderId)

    getDoc(orderDoc)
      .then(snapshot => {
        if (snapshot.exists()) {
          setOrder(snapshot.data())
        }
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
  }, [orderId])

  if (loading) {
    return (
      <div className='confirmation'>
        <div className='confirmation__icon'>⏳</div>
        <h1 className='confirmation__title'>Procesando tu orden...</h1>
      </div>
    )
  }

  return (
    <div className='confirmation'>
      <div className='confirmation__icon'>✓</div>
      <h1 className='confirmation__title'>¡Gracias por tu compra!</h1>
      <p className='confirmation__subtitle'>
        Tu orden fue confirmada. Guardá tu número de orden para hacer seguimiento.
      </p>

      <div className='confirmation__order-id'>
        <p className='confirmation__order-label'>Número de orden</p>
        <p className='confirmation__order-code'>{orderId}</p>
      </div>

      {order && (
        <div className='confirmation__details'>
          <p className='confirmation__details-title'>Detalle de tu compra</p>
          {order.items.map((item, index) => (
            <div key={index} className='confirmation__detail-row'>
              <span>{item.name} x{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className='confirmation__total'>
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
      )}

      <Link to='/' className='confirmation__link'>
        Volver a la tienda
      </Link>
    </div>
  )
}

export default Confirmation