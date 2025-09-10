-- Script maestro para ejecutar todas las migraciones y seeders
-- Ejecutar en Supabase SQL Editor o mediante herramienta de migración

-- 1. Crear tabla de estados
\i 01_create_states_table.sql

-- 2. Crear tabla de municipios
\i 02_create_municipalities_table.sql

-- 3. Insertar datos de estados
\i 03_seed_estados.sql

-- 4. Insertar datos de municipios (parte 1)
\i 04_seed_municipios.sql

-- 5. Insertar datos de municipios (parte 2)
\i 05_seed_municipios_continuation.sql

-- 6. Insertar datos de municipios (parte 3)
\i 06_seed_municipios_final.sql

-- 7. Crear tabla de clientes
\i 07_create_clients_table.sql

-- 8. Agregar campo de imagen a clientes
\i 08_add_image_to_clients.sql

-- 9. Configurar políticas de Supabase Storage
\i 09_setup_storage_policies.sql

-- Verificar que todo se insertó correctamente
SELECT 'Estados insertados: ' || COUNT(*) FROM estados;
SELECT 'Municipios insertados: ' || COUNT(*) FROM municipios;
SELECT 'Tabla clientes creada exitosamente' as status;

-- Verificar relaciones
SELECT 
    e.nombre as estado,
    COUNT(m.id) as total_municipios
FROM estados e
LEFT JOIN municipios m ON e.id = m.estado_id
GROUP BY e.id, e.nombre
ORDER BY e.nombre;
