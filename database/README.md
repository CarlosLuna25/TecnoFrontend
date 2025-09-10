# Base de Datos de Estados y Municipios de Venezuela

Este conjunto de scripts SQL crea las tablas necesarias para almacenar los estados y municipios de Venezuela en Supabase.

## Estructura de Archivos

- `00_run_all_migrations.sql` - Script maestro que ejecuta todos los archivos en orden
- `01_create_states_table.sql` - Crea la tabla de estados
- `02_create_municipalities_table.sql` - Crea la tabla de municipios
- `03_seed_estados.sql` - Inserta todos los estados de Venezuela
- `04_seed_municipios.sql` - Inserta municipios (parte 1)
- `05_seed_municipios_continuation.sql` - Inserta municipios (parte 2)
- `06_seed_municipios_final.sql` - Inserta municipios (parte 3)

## Estructura de las Tablas

### Tabla `clientes`

```sql
- id (SERIAL PRIMARY KEY)
- nombre (VARCHAR(255)) - Nombre del cliente
- tipo (VARCHAR(50)) - Tipo: 'empresa' o 'persona'
- estado (VARCHAR(50)) - Estado del proyecto: 'sin_iniciar', 'pausado', 'en_progreso'
- presupuesto (DECIMAL(15,2)) - Presupuesto asignado
- estado_id (INTEGER) - FK hacia tabla estados
- municipio_id (INTEGER) - FK hacia tabla municipios
- direccion (TEXT) - Dirección completa
- detalles_adicionales (TEXT) - Información adicional opcional
- imagen_url (TEXT) - URL de la imagen del cliente (opcional)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Tabla `estados`

```sql
- id (SERIAL PRIMARY KEY)
- codigo (VARCHAR(2)) - Código de 2 letras del estado
- nombre (VARCHAR(100)) - Nombre completo del estado
- capital (VARCHAR(100)) - Capital del estado
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Tabla `municipios`

```sql
- id (SERIAL PRIMARY KEY)
- codigo (VARCHAR(4)) - Código único del municipio
- nombre (VARCHAR(100)) - Nombre completo del municipio
- estado_id (INTEGER) - FK hacia tabla estados
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## Instrucciones de Instalación

### Opción 1: Ejecutar todo de una vez

```sql
-- En el SQL Editor de Supabase, ejecuta:
\i 00_run_all_migrations.sql
```

### Opción 2: Ejecutar archivo por archivo

1. Ejecuta `01_create_states_table.sql`
2. Ejecuta `02_create_municipalities_table.sql`
3. Ejecuta `03_seed_estados.sql`
4. Ejecuta `04_seed_municipios.sql`
5. Ejecuta `05_seed_municipios_continuation.sql`
6. Ejecuta `06_seed_municipios_final.sql`
7. Ejecuta `07_create_clients_table.sql`
8. Ejecuta `08_add_image_to_clients.sql`
9. Ejecuta `09_setup_storage_policies.sql`

### Opción 3: Copiar y pegar en Supabase Dashboard

1. Ve al SQL Editor en tu dashboard de Supabase
2. Copia y pega el contenido de cada archivo en orden
3. Ejecuta cada uno

## Consultas de Ejemplo

```sql
-- Obtener todos los estados
SELECT * FROM estados ORDER BY nombre;

-- Obtener municipios de un estado específico
SELECT m.nombre as municipio, e.nombre as estado
FROM municipios m
JOIN estados e ON m.estado_id = e.id
WHERE e.codigo = 'CA'  -- Carabobo
ORDER BY m.nombre;

-- Contar municipios por estado
SELECT
    e.nombre as estado,
    COUNT(m.id) as total_municipios
FROM estados e
LEFT JOIN municipios m ON e.id = m.estado_id
GROUP BY e.id, e.nombre
ORDER BY total_municipios DESC;

-- Buscar municipio por nombre
SELECT m.nombre as municipio, e.nombre as estado
FROM municipios m
JOIN estados e ON m.estado_id = e.id
WHERE m.nombre ILIKE '%valencia%';
```

## Datos Incluidos

- **24 Estados** de Venezuela con sus códigos y capitales
- **Más de 335 Municipios** distribuidos por todos los estados
- Relaciones correctas entre estados y municipios
- Índices optimizados para consultas eficientes

## Características

- ✅ Manejo de conflictos con `ON CONFLICT DO NOTHING`
- ✅ Índices para optimización de consultas
- ✅ Llaves foráneas con integridad referencial
- ✅ Timestamps automáticos
- ✅ Comentarios en las tablas para documentación
- ✅ Códigos estándar para estados y municipios

## Notas Importantes

- Los scripts están diseñados para ser idempotentes (se pueden ejecutar múltiples veces sin problemas)
- Se usa `ON CONFLICT DO NOTHING` para evitar duplicados
- Los municipios están relacionados con los estados mediante llave foránea
- Los códigos de estados siguen el estándar de 2 letras
- Los códigos de municipios siguen un formato de 4 dígitos

## Configuración de Storage para Imágenes

⚠️ **IMPORTANTE**: Para que la subida de imágenes funcione correctamente, debes configurar Supabase Storage.

### Error común: "403 Unauthorized - new row violates row-level security policy"

Si ves este error al subir imágenes, necesitas ejecutar el script de configuración de Storage:

```sql
-- Ejecuta este archivo en el SQL Editor de Supabase
\i 09_setup_storage_policies.sql
```

**O consulta la guía detallada**: `STORAGE_SETUP.md`

### Configuración automática

El script `09_setup_storage_policies.sql` configura automáticamente:

- ✅ Bucket "TecnoCarlos" público
- ✅ Políticas RLS para usuarios autenticados
- ✅ Permisos para subir, ver, actualizar y eliminar archivos

## Soporte

Si encuentras algún problema o necesitas agregar más municipios, puedes modificar los archivos de seeder correspondientes.

Para problemas con la subida de imágenes, consulta `STORAGE_SETUP.md`.
