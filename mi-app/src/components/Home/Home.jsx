import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import ItemList from '../ItemList/ItemList'
import './Home.css'

const categories = [
  {
    id: 'origen',
    label: 'Origen único',
    name: 'Granos de Origen',
    image: 'https://plus.unsplash.com/premium_photo-1724820188104-0e7ac7edeffd?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'blends',
    label: 'Mezclas',
    name: 'Café Molido & Blends',
    image: 'https://images.unsplash.com/photo-1606791405792-1004f1718d0c?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'equipamiento',
    label: 'Barista',
    name: 'Equipamiento',
    image: 'https://images.unsplash.com/photo-1653925874711-94c0ecdce979?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'kits',
    label: 'Para regalar',
    name: 'Kits & Regalos',
    image: 'https://images.unsplash.com/photo-1513521773210-0cc22dfee8db?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
]

const heroImages = [
  'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600',
  'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=1600',
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1600',
  'https://plus.unsplash.com/premium_photo-1663050893505-590767094e6e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1724820188131-571b8552a5aa?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
]

const Home = () => {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentHero, setCurrentHero] = useState(0)

  useEffect(() => {
    const q = query(
      collection(db, 'products'),
      where('category', '==', 'origen')
    )

    getDocs(q)
      .then(snapshot => {
        const products = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setFeatured(products.slice(0, 4))
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero(prev => (prev + 1) % heroImages.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='home'>

      <div className='home__hero'>
        {heroImages.map((img, index) => (
          <img
            key={index}
            className={`home__hero-bg ${index === currentHero ? 'home__hero-bg--active' : ''}`}
            src={img}
            alt={`Latitud 9 hero ${index + 1}`}
          />
        ))}
        <div className='home__hero-content'>
          <p className='home__hero-eyebrow'>Especialidad · Origen · Precisión</p>
          <h1 className='home__hero-title'>El arte del café<br />de altura.</h1>
          <p className='home__hero-sub'>
            Granos seleccionados a mano desde los 1.800 metros de las montañas de Latinoamérica. Tostado en pequeños lotes para preservar cada matiz.
          </p>
          <div className='home__hero-actions'>
            <Link to='/category/origen' className='home__btn-primary'>
              Ver colección
            </Link>
            <Link to='/category/kits' className='home__btn-secondary'>
              Kits & Regalos
            </Link>
          </div>
        </div>

        <div className='home__hero-dots'>
          {heroImages.map((_, index) => (
            <span
              key={index}
              className={`home__hero-dot ${index === currentHero ? 'home__hero-dot--active' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className='home__section'>
        <div className='home__section-header'>
          <h2 className='home__section-title'>Explorá por categoría</h2>
        </div>
        <div className='home__categories'>
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className='home__category-card'
            >
              <img
                className='home__category-img'
                src={cat.image}
                alt={cat.name}
              />
              <div className='home__category-info'>
                <p className='home__category-label'>{cat.label}</p>
                <p className='home__category-name'>{cat.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className='home__divider'></div>

      <div className='home__section'>
        <div className='home__section-header'>
          <h2 className='home__section-title'>Orígenes destacados</h2>
          <Link to='/category/origen' className='home__section-link'>
            Ver todos →
          </Link>
        </div>
        {!loading && <ItemList items={featured} />}
      </div>

    </div>
  )
}

export default Home