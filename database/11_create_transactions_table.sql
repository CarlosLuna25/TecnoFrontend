-- Tabla principal de transacciones (tanto gastos como ingresos)
CREATE TABLE IF NOT EXISTS transactions (
    id BIGSERIAL PRIMARY KEY,
    descripcion TEXT NOT NULL,
    monto DECIMAL(12,2) NOT NULL CHECK (monto > 0),
    tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('gasto', 'ingreso')),
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    categoria_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
    metodo_pago VARCHAR(50) NOT NULL,
    cliente_id BIGINT REFERENCES clientes(id) ON DELETE CASCADE,
    notas TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_transactions_tipo ON transactions(tipo);
CREATE INDEX IF NOT EXISTS idx_transactions_fecha ON transactions(fecha);
CREATE INDEX IF NOT EXISTS idx_transactions_categoria_id ON transactions(categoria_id);
CREATE INDEX IF NOT EXISTS idx_transactions_cliente_id ON transactions(cliente_id);
CREATE INDEX IF NOT EXISTS idx_transactions_metodo_pago ON transactions(metodo_pago);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at);

-- Índice compuesto para consultas frecuentes
CREATE INDEX IF NOT EXISTS idx_transactions_tipo_fecha ON transactions(tipo, fecha);
CREATE INDEX IF NOT EXISTS idx_transactions_cliente_tipo ON transactions(cliente_id, tipo);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_transactions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
DROP TRIGGER IF EXISTS trigger_update_transactions_updated_at ON transactions;
CREATE TRIGGER trigger_update_transactions_updated_at
    BEFORE UPDATE ON transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_transactions_updated_at();

-- Función para validar que el tipo de transacción coincida con el tipo de categoría
CREATE OR REPLACE FUNCTION validate_categoria_tipo()
RETURNS TRIGGER AS $$
DECLARE
    categoria_tipo VARCHAR(10);
BEGIN
    -- Si no hay categoria_id, permitir la inserción/actualización
    IF NEW.categoria_id IS NULL THEN
        RETURN NEW;
    END IF;
    
    -- Obtener el tipo de la categoría
    SELECT tipo INTO categoria_tipo 
    FROM categories 
    WHERE id = NEW.categoria_id;
    
    -- Si la categoría no existe, lanzar error
    IF categoria_tipo IS NULL THEN
        RAISE EXCEPTION 'La categoría con ID % no existe', NEW.categoria_id;
    END IF;
    
    -- Validar que los tipos coincidan
    IF categoria_tipo != NEW.tipo THEN
        RAISE EXCEPTION 'El tipo de transacción (%) no coincide con el tipo de categoría (%)', NEW.tipo, categoria_tipo;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para validar consistencia de tipos
DROP TRIGGER IF EXISTS trigger_validate_categoria_tipo ON transactions;
CREATE TRIGGER trigger_validate_categoria_tipo
    BEFORE INSERT OR UPDATE ON transactions
    FOR EACH ROW
    EXECUTE FUNCTION validate_categoria_tipo();

-- Comentarios en la tabla
COMMENT ON TABLE transactions IS 'Tabla para almacenar todas las transacciones (gastos e ingresos)';
COMMENT ON COLUMN transactions.descripcion IS 'Descripción de la transacción';
COMMENT ON COLUMN transactions.monto IS 'Monto de la transacción en pesos mexicanos';
COMMENT ON COLUMN transactions.tipo IS 'Tipo de transacción: gasto o ingreso';
COMMENT ON COLUMN transactions.fecha IS 'Fecha de la transacción';
COMMENT ON COLUMN transactions.categoria_id IS 'Referencia a la categoría de la transacción';
COMMENT ON COLUMN transactions.metodo_pago IS 'Método de pago utilizado (efectivo, tarjeta, transferencia, etc.)';
COMMENT ON COLUMN transactions.cliente_id IS 'Referencia al cliente relacionado con la transacción';
COMMENT ON COLUMN transactions.notas IS 'Notas adicionales sobre la transacción';
