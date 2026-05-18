import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import './NavBar.css'
import CartWidget from '../CartWidget/CartWidget'
import { BsSun, BsMoon } from 'react-icons/bs'

const NavBar = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className='navbar'>

      <Link to='/' className='navbar__logo'>
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
      </div>

    </nav>
  )
}

export default NavBar