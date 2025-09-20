# Interactive Map of Points of Interest 🗺️

## 1. Descripción del Proyecto

Este proyecto consiste en una **aplicación web interactiva** que permite a los usuarios explorar diferentes puntos de interés geográficos a través de un mapa. La aplicación tendrá tres pantallas principales:

1. **Login / Registro:** Permite a los usuarios autenticarse para poder interactuar con ciertos elementos del mapa, como calificar los puntos de interés.  
2. **Mapa Interactivo:** Muestra los puntos de interés en un mapa Leaflet utilizando datos almacenados en una base de datos PostgreSQL con extensión PostGIS. Los usuarios podrán ver información como nombre, descripción y calificación de cada punto.  
3. **Administración de Datos:** Página restringida que permite agregar nuevos puntos y, en algunos casos, polígonos, para mantener y actualizar el contenido del mapa. Esta funcionalidad solo estará disponible para usuarios administradores autenticados.

**Flujo del usuario:**

- Los usuarios pueden acceder al mapa sin necesidad de iniciar sesión.  
- Pueden ver información detallada de cada punto (nombre, descripción, rating).  
- Para calificar un punto, deben iniciar sesión.  
- La adición de nuevos puntos y polígonos estará restringida al administrador de la aplicación.

**Tecnologías principales:**

- **Frontend:** React + Leaflet  
- **Backend:** Node.js + Express  
- **Base de datos:** PostgreSQL + PostGIS (gestionada con Sequelize)  
- **Despliegue:** Frontend en Vercel, backend y base de datos en servicios gratuitos externos (Supabase, Railway, Render)

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
- Proveer una interfaz administrativa para agregar y mantener los datos geográficos.  
- Aplicar buenas prácticas de desarrollo full-stack con React, Node.js y PostGIS.