import { useState, useEffect} from 'react'
import './App.css'


function App() {
  const [contador, setContador] = useState(0)
  const [nombre, setNombre] = useState("")

  useEffect(() => {
    console.log("👋 solo al aparecer")
  }, [])

  useEffect(() => {
    console.log("🔢 contador cambió a:", contador)
  }, [contador])

  useEffect(() => {
    console.log("📝 nombre cambió a:", nombre)
  }, [nombre])

  return (
    <div>
      <button onClick={() => setContador(contador + 1)}>
        Contador: {contador}
      </button>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Escribí tu nombre"
      />
    </div>
  )
}

export default App