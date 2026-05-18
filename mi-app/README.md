# Latitud 9 ☕

E-commerce de café de especialidad desarrollado como proyecto final del curso de React JS en [Coderhouse](https://www.coderhouse.com/).

## Demo

[latitud9.netlify.app](https://latitud9.netlify.app)

## Sobre el proyecto

Latitud 9 es una tienda online de café de especialidad de origen único. Ofrece granos de origen, blends, equipamiento barista y kits de regalo. El proyecto implementa un flujo de compra completo desde el catálogo hasta la confirmación de orden.

## Tecnologías utilizadas

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/) — navegación SPA
- [Context API](https://react.dev/reference/react/useContext) — estado global del carrito y tema
- [Firebase Firestore](https://firebase.google.com/docs/firestore) — base de datos de productos y órdenes
- [React Icons](https://react-icons.github.io/react-icons/) — iconografía

## Funcionalidades

- Catálogo de productos con filtro por categoría y ordenamiento por precio
- Vista de detalle de producto
- Carrito de compras con manejo de cantidades
- Checkout con validación de formulario
- Confirmación de orden con ID generado en Firestore
- Modo claro / oscuro con persistencia en sesión
- Hero con carrusel automático de imágenes
- Diseño responsive

## Instalación

1. Cloná el repositorio:
```bash
git clone https://github.com/Saide133/latitud9.git
cd latitud9
```

2. Instalá las dependencias:
```bash
npm install
```

3. Creá un archivo `.env` en la raíz del proyecto con tus credenciales de Firebase:
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

4. Corré el proyecto:
```bash
npm run dev
```

## Variables de entorno

El proyecto usa variables de entorno para proteger las credenciales de Firebase. El archivo `.env` no se incluye en el repositorio. Para obtener las credenciales, creá un proyecto en [Firebase Console](https://console.firebase.google.com/) y registrá una app web.

## Estructura del proyecto
src/
├── components/
│   ├── NavBar/
│   ├── CartWidget/
│   ├── Home/
│   ├── ItemListContainer/
│   ├── ItemList/
│   ├── Item/
│   ├── ItemDetailContainer/
│   ├── ItemDetail/
│   ├── ItemCount/
│   ├── Cart/
│   ├── Checkout/
│   ├── Confirmation/
│   └── Footer/
├── context/
│   ├── CartContext.jsx
│   └── ThemeContext.jsx
├── firebase/
│   └── config.js
├── App.jsx
└── main.jsx

## Autor

Desarrollado por **Lucía Nuñez** — Coderhouse React JS 2026