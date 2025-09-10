-- Crear tabla de municipios de Venezuela
CREATE TABLE IF NOT EXISTS municipios (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(4) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    estado_id INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Llave foránea hacia la tabla estados
    CONSTRAINT fk_municipios_estado FOREIGN KEY (estado_id) REFERENCES estados(id) ON DELETE CASCADE
);

-- Índices para optimizar las consultas
CREATE INDEX IF NOT EXISTS idx_municipios_codigo ON municipios(codigo);
CREATE INDEX IF NOT EXISTS idx_municipios_nombre ON municipios(nombre);
CREATE INDEX IF NOT EXISTS idx_municipios_estado_id ON municipios(estado_id);

-- Comentarios para documentar la tabla
COMMENT ON TABLE municipios IS 'Tabla que contiene los municipios de Venezuela organizados por estado';
COMMENT ON COLUMN municipios.codigo IS 'Código único del municipio';
COMMENT ON COLUMN municipios.nombre IS 'Nombre completo del municipio';
COMMENT ON COLUMN municipios.estado_id IS 'ID del estado al que pertenece el municipio';
