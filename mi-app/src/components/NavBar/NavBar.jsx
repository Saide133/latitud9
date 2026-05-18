import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BsSun, BsMoon, BsList, BsX } from 'react-icons/bs'
import { useTheme } from '../../context/ThemeContext'
import CartWidget from '../CartWidget/CartWidget'
import './NavBar.css'

const NavBar = () => {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className='navbar'>
      <Link to='/' className='navbar__logo' onClick={closeMenu}>
        Latitud 9
      </Link>

      <ul className='navbar__links'>
        <li><NavLink to='/category/origen'>Origen</NavLink></li>
        <li><NavLink to='/category/blends'>Blends</NavLink></li>
        <li><NavLink to='/category/equipamiento'>Equipamiento</NavLink></li>
        <li><NavLink to='/category/kits'>Kits</NavLink></li>
      </ul>

      <div className='navbar__right'>
        <CartWidget />
        <button className='navbar__theme-toggle' onClick={toggleTheme}>
          {theme === 'dark' ? <BsSun /> : <BsMoon />}
        </button>
        <button className='navbar__hamburger' onClick={toggleMenu}>
          {menuOpen ? <BsX /> : <BsList />}
        </button>
      </div>

      {menuOpen && (
        <div className='navbar__mobile-menu'>
          <ul className='navbar__mobile-links'>
            <li><NavLink to='/category/origen' onClick={closeMenu}>Origen</NavLink></li>
            <li><NavLink to='/category/blends' onClick={closeMenu}>Blends</NavLink></li>
            <li><NavLink to='/category/equipamiento' onClick={closeMenu}>Equipamiento</NavLink></li>
            <li><NavLink to='/category/kits' onClick={closeMenu}>Kits</NavLink></li>
            <li><Link to='/cart' onClick={closeMenu}>Tu carrito</Link></li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default NavBar