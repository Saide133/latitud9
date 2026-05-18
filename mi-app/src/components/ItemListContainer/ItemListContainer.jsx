import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import ItemList from '../ItemList/ItemList'
import './ItemListContainer.css'

const categoryTitles = {
  origen: 'Granos de Origen',
  blends: 'Café Molido & Blends',
  equipamiento: 'Equipamiento Barista',
  kits: 'Kits & Regalos'
}

const ItemListContainer = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState('default')
  const { categoryId } = useParams()

  useEffect(() => {
    setLoading(true)

    const productsCollection = collection(db, 'products')

    const productsQuery = categoryId
      ? query(productsCollection, where('category', '==', categoryId))
      : productsCollection

    getDocs(productsQuery)
      .then(snapshot => {
        const products = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setItems(products)
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
  }, [categoryId])

  const getSortedItems = () => {
    switch (sortOrder) {
      case 'price-asc':
        return [...items].sort((a, b) => a.price - b.price)
      case 'price-desc':
        return [...items].sort((a, b) => b.price - a.price)
      case 'name-asc':
        return [...items].sort((a, b) => a.name.localeCompare(b.name))
      default:
        return items
    }
  }

  if (loading) {
    return (
      <div className='item-list-container__loading'>
        <div className='item-list-container__spinner'></div>
        <span>Cargando productos...</span>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className='item-list-container__empty'>
        No hay productos en esta categoría
      </div>
    )
  }

  return (
    <div className='item-list-container'>
      <div className='item-list-container__header'>
        <div className='item-list-container__header-top'>
          <div>
            <p className='item-list-container__eyebrow'>
              {categoryId ? categoryTitles[categoryId] : 'Todos los productos'}
            </p>
            <h2 className='item-list-container__title'>
              {categoryId ? categoryTitles[categoryId] : 'The Roast Gallery'}
            </h2>
          </div>
          <div className='item-list-container__sort'>
            <select
              className='item-list-container__select'
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
            >
              <option value='default'>Ordenar por</option>
              <option value='price-asc'>Precio: menor a mayor</option>
              <option value='price-desc'>Precio: mayor a menor</option>
              <option value='name-asc'>Nombre: A-Z</option>
            </select>
          </div>
        </div>
      </div>
      <ItemList items={getSortedItems()} />
    </div>
  )
}

export default ItemListContainer