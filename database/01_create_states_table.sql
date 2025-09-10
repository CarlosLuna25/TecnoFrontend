-- Crear tabla de estados de Venezuela
CREATE TABLE IF NOT EXISTS estados (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(2) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    capital VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para optimizar las consultas
CREATE INDEX IF NOT EXISTS idx_estados_codigo ON estados(codigo);
CREATE INDEX IF NOT EXISTS idx_estados_nombre ON estados(nombre);

-- Comentarios para documentar la tabla
COMMENT ON TABLE estados IS 'Tabla que contiene los estados de Venezuela';
COMMENT ON COLUMN estados.codigo IS 'Código de 2 letras del estado';
COMMENT ON COLUMN estados.nombre IS 'Nombre completo del estado';
COMMENT ON COLUMN estados.capital IS 'Capital del estado';
