# Interactive Map of Points of Interest 🗺️

## 1. Descripción del Proyecto

Este proyecto consiste en una **aplicación web interactiva** que permite a los usuarios explorar diferentes puntos de interés geográficos a través de un mapa. La aplicación tendrá tres pantallas principales:

1. **Login / Registro:** Permite a los usuarios autenticarse para poder interactuar con ciertos elementos del mapa, como calificar los puntos de interés.  
2. **Mapa Interactivo:** Muestra los puntos de interés en un mapa Leaflet utilizando datos almacenados en una base de datos PostgreSQL con extensión PostGIS. Los usuarios podrán ver información como nombre, descripción y calificación de cada punto.  
3. **Registro de puntos:** Página que permite agregar nuevos puntos, para mantener y actualizar el contenido del mapa. Esta funcionalidad solo estará disponible para usuarios autenticados.

**Flujo del usuario:**

- Los usuarios pueden acceder al mapa sin necesidad de iniciar sesión.  
- Pueden ver información detallada de cada punto (nombre, descripción, rating).  
- Para calificar un punto, deben iniciar sesión.  
- La adición de nuevos puntos y polígonos requerirá inicio de session.

**Tecnologías principales:**

- **Frontend:** React + Leaflet  
- **Backend:** Node.js + Express  
- **Base de datos:** PostgreSQL + PostGIS (gestionada con Sequelize)  
- **Despliegue:** Frontend en Vercel, backend y base de datos en servicios gratuitos externos (Supabase, Railway, Render, self-host)

---

## 2. Dinámica de Trabajo

Este proyecto será desarrollado de forma **individual**, siguiendo buenas prácticas de desarrollo de software, incluyendo:

- Gestión de control de versiones con Git y GitHub.  
- Desarrollo modular y estructurado (frontend y backend separados).  
- Documentación de decisiones técnicas y avances en el repositorio.  
- Uso de metodologías ágiles a nivel personal, planificando tareas y objetivos diarios/semana para mantener un flujo constante de desarrollo.

---

## 3. Acuerdos y Registro de Trabajo

- El proyecto se desarrollará de manera individual.  
- Cada funcionalidad será desarrollada, probada y documentada antes de pasar a la siguiente.  
- Las decisiones sobre tecnología y arquitectura serán documentadas en el repositorio.  
- Se mantendrá un registro de avances en commits y en un archivo de seguimiento de tareas (`TASKS.md`) para reflejar la planificación y ejecución del proyecto.

---

## 4. Objetivos del Proyecto

- Crear un mapa interactivo que visualice puntos de interés geográficos.  
- Permitir a los usuarios calificar los puntos después de autenticarse.  
- Proveer una interfaz para agregar y mantener los datos geográficos.  
- Aplicar buenas prácticas de desarrollo full-stack con React, Node.js y PostGIS.

## ⚙️ Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```
- Instala paquetes y dependencias para el cliente
```bash
cd client
npm install
```
- Instala paquetes y dependencias para el servidor
```bash
cd server
npm install
```

### 2. Crea las variables de ambiente
Variables del backend
```bash
PORT=4000 #esta variable esta implícita en servicios como render
IM_API_PORT=4090 #omitir si se despliega en servicios que generen su propio puerto
IM_DB_HOST=your-db-host
IM_DB_PORT=5432
IM_DB_USER=your-db-user
IM_DB_PASSWORD=your-db-password
IM_DB_DATABASE=your-db-name
IM_DB_DIALECT=postgres
IM_DB_TIMEZONE=-06:00
IM_CLIENT_URL=https://your-vercel-app.vercel.app
JWT_SECRET=super-secret-key
```
Variables del frontend
```bash
VITE_API_URL=https://your-api.onrender.com
```
### 3. Correr Localmente
Previamente se debió haber configurado una base de datos PostgresSQL con PostGIS disponible.

Desde la raíz del repositorio puedes correr los comandos
```bash
npm run server

npm run client
```
La API en servicios como render se tiene que usar el comando
```bash
npm run start
```
Y se debe configurar como carpeta base server y el comando
```bash
npm install
```
en la casilla de build

### 4. Rutas de la API
| Método | Endpoint                | Descripción              |
| ------ | ----------------------- | ------------------------ |
| `POST` | `/auth/signup`          | Registrar nuevo usuario  |
| `POST` | `/auth/signin`          | Iniciar sesión           |
| `POST` | `/auth/signout`         | Cerrar sesión            |
| `GET`  | `/auth/check`           | Verificar sesión activa  |
| `GET`  | `/points/all`           | Obtener todos los puntos |
| `PUT`  | `/points/rate/:pointID` | Calificar un punto       |
| `POST` | `/points/register`      | Registrar nuevo punto    |

### 5. Rutas de la APP
| Endpoint          | Descripción                            |
| ------------------| -------------------------------------- |
| `/`               | Default, dirige al mapa                |
| `/map`            | Pantalla del mapa interactivo          |
| `/login`          | Pantalla de inicio de session          |
| `/register`       | Pantalla pra registrase                |
| `/register-point` | Pantalla para registrar un punto nuevo |