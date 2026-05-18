import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__content'>

        <div className='footer__brand'>
          <p className='footer__brand-name'>Latitud 9</p>
          <p className='footer__brand-desc'>
            Café de especialidad de origen único. Tostado en pequeños lotes para preservar cada matiz.
          </p>
        </div>

        <div>
          <p className='footer__col-title'>Tienda</p>
          <ul className='footer__links'>
            <li><Link to='/category/origen'>Granos de origen</Link></li>
            <li><Link to='/category/blends'>Blends</Link></li>
            <li><Link to='/category/equipamiento'>Equipamiento</Link></li>
            <li><Link to='/category/kits'>Kits & Regalos</Link></li>
          </ul>
        </div>

        <div>
          <p className='footer__col-title'>Tu cuenta</p>
          <ul className='footer__links'>
            <li><Link to='/cart'>Tu carrito</Link></li>
          </ul>
        </div>

      </div>

      <div className='footer__divider'></div>

      <div className='footer__bottom'>
        <p className='footer__copy'>
          © 2025 <span className='footer__accent'>Latitud 9</span>. Todos los derechos reservados.
        </p>
        <p className='footer__copy'>
          Hecho con ☕ y React
        </p>
      </div>
    </footer>
  )
}

export default Footer