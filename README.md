# Wompi Payment App

## Description

Aplicación de pagos con Wompi que permite a los clientes comprar productos usando tarjetas de crédito.

## Tech Stack

- React 19 + Vite
- Redux Toolkit
- React Router DOM
- Axios
- SweetAlert2
- Card Validator
- CSS Modules

## Installation

\`\`\`bash
npm install
\`\`\`

## Environment Variables

\`\`\`
VITE_API_URL=http://localhost:3000/api
VITE_WOMPI_PUBLIC_KEY=your_public_key
\`\`\`

## Run Development

\`\`\`bash
npm run dev
\`\`\`

## Run Tests

\`\`\`bash
npm run test:coverage
\`\`\`

## Test Coverage

- Frontend: 85% coverage
- [Screenshot de coverage]

## Architecture

- **State Management**: Redux Toolkit con persistencia en localStorage
- **Routing**: React Router v7
- **Styling**: CSS Modules
- **API Integration**: Axios con interceptores

## Features

- ✅ Listado de productos con stock
- ✅ Validación de tarjetas (Visa/Mastercard)
- ✅ Proceso de checkout en 4 pasos
- ✅ Integración con Wompi API
- ✅ Recuperación de estado tras refresh
- ✅ Diseño responsive (mobile-first)
- ✅ Manejo de errores con SweetAlert2

## Deployment

- **Frontend**: [URL de producción]
- **Backend**: [URL API]

## API Endpoints

Ver backend README.md
