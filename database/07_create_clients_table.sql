-- Crear tabla de clientes
CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('empresa', 'persona')),
    estado VARCHAR(50) NOT NULL CHECK (estado IN ('sin_iniciar', 'pausado', 'en_progreso', 'finalizado')),
    presupuesto DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    estado_id INTEGER NOT NULL,
    municipio_id INTEGER NOT NULL,
    direccion TEXT NOT NULL,
    detalles_adicionales TEXT,
    imagen_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Llaves foráneas
    CONSTRAINT fk_clientes_estado FOREIGN KEY (estado_id) REFERENCES estados(id) ON DELETE RESTRICT,
    CONSTRAINT fk_clientes_municipio FOREIGN KEY (municipio_id) REFERENCES municipios(id) ON DELETE RESTRICT
);

-- Índices para optimizar las consultas
CREATE INDEX IF NOT EXISTS idx_clientes_nombre ON clientes(nombre);
CREATE INDEX IF NOT EXISTS idx_clientes_tipo ON clientes(tipo);
CREATE INDEX IF NOT EXISTS idx_clientes_estado ON clientes(estado);
CREATE INDEX IF NOT EXISTS idx_clientes_estado_id ON clientes(estado_id);
CREATE INDEX IF NOT EXISTS idx_clientes_municipio_id ON clientes(municipio_id);
CREATE INDEX IF NOT EXISTS idx_clientes_created_at ON clientes(created_at);
CREATE INDEX IF NOT EXISTS idx_clientes_imagen_url ON clientes(imagen_url);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_clientes_updated_at 
    BEFORE UPDATE ON clientes 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Comentarios para documentar la tabla
COMMENT ON TABLE clientes IS 'Tabla que contiene los clientes del sistema';
COMMENT ON COLUMN clientes.nombre IS 'Nombre del cliente (persona o empresa)';
COMMENT ON COLUMN clientes.tipo IS 'Tipo de cliente: empresa o persona';
COMMENT ON COLUMN clientes.estado IS 'Estado del proyecto: sin_iniciar, pausado, en_progreso';
COMMENT ON COLUMN clientes.presupuesto IS 'Presupuesto asignado al cliente';
COMMENT ON COLUMN clientes.estado_id IS 'ID del estado donde se encuentra el cliente';
COMMENT ON COLUMN clientes.municipio_id IS 'ID del municipio donde se encuentra el cliente';
COMMENT ON COLUMN clientes.direccion IS 'Dirección completa del cliente';
COMMENT ON COLUMN clientes.detalles_adicionales IS 'Información adicional opcional del cliente';
COMMENT ON COLUMN clientes.imagen_url IS 'URL de la imagen del cliente';
