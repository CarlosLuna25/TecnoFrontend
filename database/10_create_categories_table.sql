-- Tabla de categorías para gastos e ingresos
CREATE TABLE IF NOT EXISTS categories (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('gasto', 'ingreso')),
    color VARCHAR(7) DEFAULT '#3B82F6', -- Color en formato hexadecimal
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_categories_tipo ON categories(tipo);
CREATE INDEX IF NOT EXISTS idx_categories_nombre ON categories(nombre);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_categories_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
DROP TRIGGER IF EXISTS trigger_update_categories_updated_at ON categories;
CREATE TRIGGER trigger_update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_categories_updated_at();

-- Comentarios en la tabla
COMMENT ON TABLE categories IS 'Tabla para almacenar categorías de gastos e ingresos';
COMMENT ON COLUMN categories.nombre IS 'Nombre de la categoría';
COMMENT ON COLUMN categories.descripcion IS 'Descripción detallada de la categoría';
COMMENT ON COLUMN categories.tipo IS 'Tipo de categoría: gasto o ingreso';
COMMENT ON COLUMN categories.color IS 'Color en formato hexadecimal para la interfaz';
