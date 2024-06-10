
# Vopper Take Home Frontend

Este proyecto es el frontend para la gestión de entrenadores de Pokemon y la creación de una Pokedex, implementado utilizando React y Tailwind CSS. Proporciona una interfaz para listar y buscar Pokemons, así como para la gestión de entrenadores de Pokemon.

## Requisitos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

## Instalación

1. **Clona el repositorio:**
   ```sh
   git clone https://github.com/jesus-her/vopper-take-home-frontend.git
   cd vopper-take-home-frontend
   ```

2. **Instala las dependencias:**
   ```sh
   npm install
   ```

3. **Configura las variables de entorno:**

   Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:
   ```
   NEXT_PUBLIC_BASE_URL=<url-del-backend>
   ```

4. **Ejemplo de archivo `.env.local`:**

   Este es un ejemplo con una URL real de mi backend en Railway. El backend está configurado en el plan gratuito (FREE), por lo que funciona para fines prácticos y de prueba.

   ```text
   NEXT_PUBLIC_BASE_URL=https://vopper-take-home-backend-production.up.railway.app/api
   ```

## Scripts

- **Iniciar el servidor en desarrollo:**
  ```sh
  npm run dev
  ```

- **Construir el proyecto:**
  ```sh
  npm run build
  ```

- **Iniciar el servidor en producción:**
  ```sh
  npm start
  ```

## Estructura del Proyecto

- **components/**: Contiene los componentes reutilizables del proyecto.
  - `pokedex-header.tsx`: Encabezado de la Pokedex.
  - `pokemon-card.tsx`: Tarjeta de presentación de un Pokemon.
  - `pokemon-list-pagination.tsx`: Paginación de la lista de Pokemons.
  - `pokemon-list.tsx`: Lista de Pokemons.
  - `search-bar.tsx`: Barra de búsqueda de Pokemons.
  - `trainer-dialog.tsx`: Diálogo para la creación/edición de entrenadores.
  - `trainers-list.tsx`: Lista de entrenadores.
  - `trainers-table.tsx`: Tabla de entrenadores.
- **interfaces/**: Define las interfaces TypeScript para los datos.
  - `trainer.ts`: Interfaz para los datos de los entrenadores.
- **lib/**: Contiene acciones y utilidades.
  - `actions/`: Acciones de Redux.
  - `utils.ts`: Funciones auxiliares.
- **public/**: Contiene los archivos estáticos del proyecto.
  - `pokeball-min.png`: Imagen de una Pokebola.
  - `vercel.svg`: Imagen de Vercel.
- **styles/**: Contiene los estilos globales.
  - `globals.css`: Estilos globales del proyecto.
- **pages/**: Define las páginas del proyecto.
  - `index.tsx`: Página principal de la Pokedex.
  - `trainers.tsx`: Página principal de la gestión de entrenadores.

## Endpoints

### Pokémon

- **GET /api/pokemons**: Lista todos los Pokémon, soporta paginación y búsqueda.
  - Parámetros:
    - `limit`: Número de Pokémon por página.
    - `page`: Número de página.
    - `search`: Búsqueda por nombre.

- **GET /api/pokemons/:name/pdf**: Genera un PDF con la información del Pokémon.

### Entrenadores

- **GET /api/trainers**: Lista todos los entrenadores.
- **POST /api/trainers**: Crea un nuevo entrenador.
- **PUT /api/trainers/:trainerId**: Actualiza un entrenador existente.
- **DELETE /api/trainers/:trainerId**: Elimina un entrenador.
- **GET /api/trainers/:trainerId**: Obtiene un entrenador por su ID.

## Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para cualquier mejora o corrección.
