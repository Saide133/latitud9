import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useCart } from '../../context/CartContext'
import './Checkout.css'

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useCart()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    emailConfirm: '',
    phone: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.email !== formData.emailConfirm) {
      setError('Los emails no coinciden')
      return
    }

    setLoading(true)

    const order = {
      buyer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone
      },
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total: getTotalPrice(),
      date: serverTimestamp()
    }

    try {
      const ordersCollection = collection(db, 'orders')
      const orderDoc = await addDoc(ordersCollection, order)
      clearCart()
      navigate(`/confirmation/${orderDoc.id}`)
    } catch (err) {
      setError('Hubo un error al procesar tu orden. Intentá de nuevo.')
      setLoading(false)
    }
  }

  return (
    <div className='checkout'>
      <div className='checkout__header'>
        <h1 className='checkout__title'>Finalizar compra</h1>
      </div>

      <div className='checkout__content'>
        <form className='checkout__form' onSubmit={handleSubmit}>
          <div>
            <p className='checkout__section-title'>Datos personales</p>
            <div className='checkout__row'>
              <div className='checkout__field'>
                <label className='checkout__label'>Nombre</label>
                <input
                  className='checkout__input'
                  type='text'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder='Nombre'
                  required
                />
              </div>
              <div className='checkout__field'>
                <label className='checkout__label'>Apellido</label>
                <input
                  className='checkout__input'
                  type='text'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder='Apellido'
                  required
                />
              </div>
            </div>
          </div>

          <div className='checkout__divider'></div>

          <div>
            <p className='checkout__section-title'>Contacto</p>
            <div className='checkout__field'>
              <label className='checkout__label'>Email</label>
              <input
                className='checkout__input'
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='email@email.com'
                required
              />
            </div>
            <br />
            <div className='checkout__field'>
              <label className='checkout__label'>Confirmar email</label>
              <input
                className='checkout__input'
                type='email'
                name='emailConfirm'
                value={formData.emailConfirm}
                onChange={handleChange}
                placeholder='email@email.com'
                required
              />
            </div>
            <br />
            <div className='checkout__field'>
              <label className='checkout__label'>Teléfono</label>
              <input
                className='checkout__input'
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                placeholder='+598 99 000 000'
                required
              />
            </div>
          </div>

          {error && <p className='checkout__error'>{error}</p>}

          <button
            className='checkout__submit'
            type='submit'
            disabled={loading}
          >
            {loading ? 'Procesando...' : 'Confirmar compra'}
          </button>
        </form>

        <div className='checkout__summary'>
          <p className='checkout__summary-title'>Tu orden</p>
          {cart.map(item => (
            <div key={item.id} className='checkout__summary-row'>
              <span>{item.name} x{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className='checkout__summary-divider'></div>
          <div className='checkout__summary-total'>
            <span>Total</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout