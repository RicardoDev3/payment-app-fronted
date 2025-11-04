# Wompi Payment App

## Description

Aplicación de comercio electrónico con integración de pagos a través de Wompi. Permite a los usuarios comprar productos usando tarjetas de crédito con validación en tiempo real.

## 🚀 Características

✅ **Catálogo de productos** con stock en tiempo real
✅ **Proceso de checkout** en 4 pasos intuitivos
✅ **Validación de tarjetas** (Visa, Mastercard) con algoritmo de Luhn
✅ **Integración con Wompi API** para procesamiento de pagos
✅ **Recuperación de estado** tras refresco del navegador
✅ **Diseño responsive** (mobile-first)
✅ **Manejo de errores** con notificaciones visuales
✅ **Persistencia de datos** en localStorage

## 🛠️ Tech Stack

- **React 19** - Biblioteca UI
- **Redux Toolkit** - Estado global
- **React Router v7** - Enrutamiento
- **Axios** - Cliente HTTP
- **Material-UI Icons** - Iconografía
- **SweetAlert2** - Notificaciones
- **Card Validator** - Validación de tarjetas
- **Vite** - Build tool
- **Vitest** - Testing
- **CSS Modules** - Estilos modulares

## 📦 Instalación

Clonar repositorio
git clone https://github.com/RicardoDev3/payment-app-fronted.git
cd payment-app-fronted

Instalar dependencias
npm install


## ⚙️ Variables de Entorno

Crear archivo `.env` en la raíz:

## 🚀 Ejecutar en Desarrollo

npm run dev

La aplicación estará disponible en `http://localhost:5173`

## 🧪 Ejecutar Tests
Ejecutar tests
npm run test

Tests con UI
npm run test:ui

Cobertura de tests
npm run test:coverage

## 📁 Estructura del Proyecto

payment-app-fronted/
├── src/
│ ├── components/
│ │ ├── Backdrop/
│ │ ├── Layout/
│ │ ├── Modal/
│ │ └── ProductCard/
│ ├── pages/
│ │ ├── CheckoutPage/
│ │ │ ├── components/
│ │ │ │ ├── CustomerForm.jsx
│ │ │ │ ├── DeliveryForm.jsx
│ │ │ │ ├── CreditCardForm.jsx
│ │ │ │ ├── OrderSummary.jsx
│ │ │ │ ├── ProgressSteps.jsx
│ │ │ │ └── ProductSidebar.jsx
│ │ │ └── CheckoutPage.jsx
│ │ ├── ProductsPage/
│ │ └── ResultPage/
│ ├── store/
│ │ ├── slices/
│ │ │ ├── cartSlice.js
│ │ │ ├── productsSlice.js
│ │ │ └── transactionSlice.js
│ │ └── store.js
│ ├── services/
│ │ └── api.js
│ ├── utils/
│ │ ├── cardValidator.js
│ │ ├── alerts.js
│ │ └── alertsCard.js
│ ├── App.jsx
│ └── main.jsx
├── tests/
├── .env
├── package.json
├── vite.config.js
└── README.md


## 🎯 Flujo de la Aplicación

### 1. Catálogo de Productos
- Visualización de productos con stock disponible
- Imágenes desde Unsplash
- Información de precio y disponibilidad

### 2. Proceso de Checkout (4 pasos)

**Paso 1: Información Personal**
- Nombre completo
- Email
- Teléfono

**Paso 2: Dirección de Entrega**
- Dirección completa
- Ciudad, estado, código postal
- Notas de entrega (opcional)

**Paso 3: Método de Pago**
- Número de tarjeta (validación con Luhn)
- Nombre del titular
- Fecha de vencimiento
- CVV

**Paso 4: Resumen**
- Revisión de toda la información
- Desglose de precios
- Confirmación de pago

### 3. Procesamiento
- Creación de transacción en backend
- Envío de datos a Wompi API
- Procesamiento del pago

### 4. Resultado
- Página de confirmación
- Estado de la transacción (Aprobado/Rechazado/Pendiente)
- Detalles completos del pedido

## 🔒 Seguridad

- ✅ Validación de tarjetas en cliente
- ✅ Datos sensibles NO se guardan en localStorage
- ✅ Comunicación HTTPS con backend
- ✅ Tokens de Wompi en variables de entorno
- ✅ Sanitización de inputs

## 🌐 Recuperación de Estado (Resilience)

La aplicación recupera automáticamente el estado en caso de refresco:

- ✅ Producto seleccionado
- ✅ Datos del cliente
- ✅ Dirección de entrega
- ✅ Transacción en curso

**Nota:** Los datos de tarjeta NO se persisten por seguridad.

## 🎨 Diseño

- Diseño **mobile-first** responsive
- CSS Modules para estilos aislados
- Material-UI Icons para iconografía
- Animaciones suaves con CSS
- Compatible con iPhone SE (375x667px) y superiores

## 📱 Responsive Breakpoints

- Mobile: 320px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px+


### Convenciones de Código

- **Componentes**: PascalCase (`ProductCard.jsx`)
- **Utilidades**: camelCase (`cardValidator.js`)
- **CSS Modules**: ComponentName.module.css
- **Props**: PropTypes para validación
- **Redux**: Redux Toolkit con slices

## 📝 Testing

Tests implementados:

✅ **Validación de tarjetas**
- Detección de tipo de tarjeta
- Algoritmo de Luhn
- Formato de número
- Validación de CVV
- Validación de fecha de expiración

✅ **Componentes**
- ProductCard rendering
- Eventos de click
- Estados disabled
- Badges condicionales


## 👤 Autor

**Ricardo Dev**
- GitHub: [@RicardoDev3](https://github.com/RicardoDev3)
- Proyecto: [payment-app-fronted](https://github.com/RicardoDev3/payment-app-fronted)

---
