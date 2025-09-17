# Backend - Sistema de Preguntas en Tiempo Real

## Configuración de PostgreSQL

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
Copia el archivo `env copy` a `.env` y actualiza la URL de PostgreSQL:

```env
PORT=3000
FRONTEND_URL=http://localhost:4321
DATABASE_URL="postgresql://username:password@localhost:5432/realtime_rc?schema=public"
```

### 3. Configurar la base de datos
```bash
# Generar el cliente de Prisma
npm run db:generate

# Aplicar el esquema a la base de datos
npm run db:push

# O crear y aplicar migraciones
npm run db:migrate
```

### 4. Ejecutar el servidor
```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

## Scripts disponibles
- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Compilar TypeScript
- `npm start` - Ejecutar en producción
- `npm run db:generate` - Generar cliente Prisma
- `npm run db:push` - Aplicar esquema sin migraciones
- `npm run db:migrate` - Crear y aplicar migraciones
- `npm run db:studio` - Abrir Prisma Studio
### 5. 
Poblar la base de datos (opcional)
Para crear ejes temáticos iniciales:
```bash
npm run db:seed
```

## Migración desde MongoDB

Este proyecto ha sido migrado de MongoDB a PostgreSQL usando Prisma ORM. Los cambios principales incluyen:

- **ORM**: Mongoose → Prisma
- **Base de datos**: MongoDB → PostgreSQL  
- **Modelos**: Esquemas Mongoose → Esquema Prisma
- **IDs**: ObjectId → String (cuid)
- **Estados**: strings → enum QuestionState

### Estructura de la base de datos

#### Tabla `ejes`
- `id`: String (cuid) - Primary Key
- `nombre`: String
- `createdAt`: DateTime
- `updatedAt`: DateTime

#### Tabla `preguntas`
- `id`: String (cuid) - Primary Key
- `texto`: String
- `estado`: QuestionState (REGISTRADA, ACEPTADA, RECHAZADA, RESPONDIDA)
- `ejeId`: String - Foreign Key
- `createdAt`: DateTime
- `updatedAt`: DateTime

## Requisitos del sistema

- Node.js 18+
- PostgreSQL 12+
- npm o yarn