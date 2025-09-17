# Configuración del Sistema de Preguntas en Tiempo Real

## Pasos para configurar el proyecto completo:

### 1. Backend (PostgreSQL)

```bash
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
# Edita el archivo .env con tu configuración de PostgreSQL
# DATABASE_URL="postgresql://username:password@localhost:5432/realtime_rc?schema=public"

# Generar cliente Prisma
npm run db:generate

# Aplicar esquema a la base de datos
npm run db:push

# Poblar con datos iniciales (opcional)
npm run db:seed

# Ejecutar backend
npm run dev
```

### 2. Frontend (Astro + React)

```bash
cd frontend

# Instalar dependencias
npm install

# El archivo .env ya está configurado con:
# PUBLIC_API_URL=http://localhost:3000

# Ejecutar frontend
npm run dev
```

### 3. Verificar conexión

1. Backend corriendo en: http://localhost:3000
2. Frontend corriendo en: http://localhost:4321
3. Verificar API: http://localhost:3000/api/status
4. Verificar ejes: http://localhost:3000/api/ejes

## Cambios realizados en la migración:

### Backend:
- ✅ MongoDB → PostgreSQL con Prisma
- ✅ Modelos actualizados para compatibilidad
- ✅ Estados en minúsculas para frontend
- ✅ Transformadores para IDs (_id/id)
- ✅ Repositorios y servicios actualizados

### Frontend:
- ✅ Archivo .env creado
- ✅ Tipos compatibles mantenidos
- ✅ Conexión WebSocket configurada

## Estructura de la base de datos:

### Tabla `ejes`:
- id (String/cuid)
- nombre (String)
- createdAt, updatedAt

### Tabla `preguntas`:
- id (String/cuid)
- texto (String)
- estado (registrada|aceptada|rechazada|respondida)
- ejeId (String, FK)
- createdAt, updatedAt

## URLs importantes:

- **Frontend**: http://localhost:4321
- **Backend API**: http://localhost:3000
- **Panel Moderador**: http://localhost:4321/moderator
- **API Status**: http://localhost:3000/api/status
- **API Ejes**: http://localhost:3000/api/ejes