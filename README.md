# Saal

Saal es un sistema integral de gestión y reserva de billetes de autobús diseñado para optimizar los servicios de transporte. La plataforma permite a los operadores gestionar rutas, estaciones, horarios y ventas, ofreciendo a los clientes una interfaz intuitiva para buscar y comprar billetes.

## Características

- **Gestión de rutas:** Soporte para múltiples paradas y planificación de horarios.
- **Disponibilidad en tiempo real:** Consulta de plazas y reserva inmediata.
- **Rutas destacadas:** Opción para promocionar trayectos específicos.
- **Administración de estaciones:** Control de paradas en diferentes ciudades.
- **Configuración de calendarios:** Gestión de días laborales y frecuencias.
- **Panel de administración:** Control total del sistema para operadores.
- **Arquitectura moderna:** Backend RESTful con Symfony y frontend en React con diseño responsivo.

## Configuración del Entorno y Puertos

El proyecto utiliza Docker para orquestar los servicios. A continuación se detallan los puertos asignados por defecto:

| Servicio | URL / Acceso | Puerto |
|---|---|---|
| Frontend (React) | http://localhost:5173 | 5173 |
| Backend (API Symfony) | http://localhost:8000 | 8000 |
| Base de Datos (PostgreSQL) | localhost | 5432 |

## Instrucciones de Uso

### Requisitos Previos

- Docker y Docker Compose
- Git
- Make *(opcional, para comandos abreviados)*

### Inicio Rápido (Docker)

1. **Clonar el repositorio:**

```bash
git clone https://github.com/tu-usuario/saal.git
cd saal
```

2. **Levantar los servicios:**

   Si utilizas Docker Compose directamente:

   ```bash
   docker compose up --build -d
   ```

   Si utilizas el archivo Makefile incluido:

   ```bash
   make setup
   ```

3. **Ejecutar Migraciones:**

   Es necesario preparar la base de datos tras el primer inicio:

   ```bash
   docker compose exec backend php bin/console doctrine:migrations:migrate --no-interaction
   ```

### Acceso a la Versión Desplegada

*(Si el proyecto cuenta con una versión en la nube, insertar aquí la URL, ej: [https://saal-demo.com](https://saal-demo.com))*

## Credenciales y Datos de Prueba

Para facilitar la evaluación de todas las funcionalidades, se han preconfigurado los siguientes datos de acceso:

### Usuarios de Acceso (Frontend/Admin)

- **Administrador:**
  - Usuario: `admin@saal.com`
  - Contraseña: `admin123`

- **Usuario Estándar:**
  - Usuario: `user@saal.com`
  - Contraseña: `user123`

### Datos de Prueba

El sistema incluye datos precargados (vía fixtures o migraciones) que incluyen:

- **Ciudades:** Madrid, Barcelona, Valencia, Sevilla.
- **Rutas:** Conexiones directas entre las ciudades principales.
- **Horarios:** Salidas diarias configuradas en horario de mañana y tarde.

## Gestión de Servicios

### Backend

Para ejecutar comandos de Symfony o limpiar caché:

```bash
docker compose exec backend php bin/console cache:clear
```

### Frontend

Para reconstruir solo la interfaz de usuario:

```bash
docker compose up --build frontend
```

### Base de Datos

Para resetear el entorno por completo:

```bash
docker compose down -v
docker compose up --build
```

## Notas Adicionales

- **Uso de Makefile:** Si el sistema dispone de un archivo Makefile, puedes usar `make help` para ver todos los comandos disponibles (como `make stop`, `make restart`, o `make logs`).
- **Variables de Entorno:** Las configuraciones sensibles se encuentran en `backend/.env`. Para entornos de producción, asegúrese de cambiar la `APP_SECRET` y las credenciales de la base de datos.
- **Documentación Específica:**
  - API Backend: `backend/README.md`
  - Frontend: `frontend/README.md`

## Soporte

Para reportar errores o solicitar nuevas funcionalidades, por favor abra un *Issue* en el repositorio de GitHub.
