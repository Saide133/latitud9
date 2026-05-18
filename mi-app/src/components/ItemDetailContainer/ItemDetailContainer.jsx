import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import ItemDetail from '../ItemDetail/ItemDetail'
import './ItemDetailContainer.css'

const ItemDetailContainer = () => {
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const { itemId } = useParams()

  useEffect(() => {
    setLoading(true)

    const productsCollection = collection(db, 'products')
    const q = query(productsCollection, where('id', '==', itemId))

    getDocs(q)
      .then(snapshot => {
        if (!snapshot.empty) {
          const doc = snapshot.docs[0]
          setItem({ id: doc.id, ...doc.data() })
        }
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
  }, [itemId])

  if (loading) {
    return (
      <div className='item-detail-container__loading'>
        <div className='item-detail-container__spinner'></div>
        <span>Cargando producto...</span>
      </div>
    )
  }

  if (!item) {
    return (
      <div className='item-detail-container__not-found'>
        Producto no encontrado
      </div>
    )
  }

  return (
    <div className='item-detail-container'>
      <ItemDetail item={item} />
    </div>
  )
}

export default ItemDetailContainer