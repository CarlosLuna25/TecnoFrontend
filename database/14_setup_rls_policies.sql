-- Configuración de Row Level Security (RLS) para las tablas de transacciones y categorías

-- Habilitar RLS en las tablas
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Políticas para la tabla categories
-- Permitir lectura a usuarios autenticados
CREATE POLICY "categories_select_policy" ON categories
    FOR SELECT
    TO authenticated
    USING (true);

-- Permitir inserción a usuarios autenticados
CREATE POLICY "categories_insert_policy" ON categories
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Permitir actualización a usuarios autenticados
CREATE POLICY "categories_update_policy" ON categories
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Permitir eliminación a usuarios autenticados
CREATE POLICY "categories_delete_policy" ON categories
    FOR DELETE
    TO authenticated
    USING (true);

-- Políticas para la tabla transactions
-- Permitir lectura a usuarios autenticados
CREATE POLICY "transactions_select_policy" ON transactions
    FOR SELECT
    TO authenticated
    USING (true);

-- Permitir inserción a usuarios autenticados
CREATE POLICY "transactions_insert_policy" ON transactions
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Permitir actualización a usuarios autenticados
CREATE POLICY "transactions_update_policy" ON transactions
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Permitir eliminación a usuarios autenticados
CREATE POLICY "transactions_delete_policy" ON transactions
    FOR DELETE
    TO authenticated
    USING (true);

-- Políticas para las vistas (heredan las políticas de las tablas base)
-- Las vistas gastos_view e ingresos_view automáticamente respetan las políticas de transactions

-- Grants para usuarios autenticados
GRANT ALL ON categories TO authenticated;
GRANT ALL ON transactions TO authenticated;
GRANT SELECT ON gastos_view TO authenticated;
GRANT SELECT ON ingresos_view TO authenticated;
GRANT SELECT ON resumen_categorias_view TO authenticated;
GRANT SELECT ON resumen_mensual_view TO authenticated;

-- Grants para las secuencias
GRANT USAGE, SELECT ON SEQUENCE categories_id_seq TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE transactions_id_seq TO authenticated;

-- Grants para las funciones
GRANT EXECUTE ON FUNCTION get_balance_mensual(INTEGER, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION get_balance_cliente(BIGINT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_top_categorias(VARCHAR(10), INTEGER) TO authenticated;

-- Comentarios sobre las políticas
COMMENT ON POLICY "categories_select_policy" ON categories IS 'Permite a usuarios autenticados leer todas las categorías';
COMMENT ON POLICY "categories_insert_policy" ON categories IS 'Permite a usuarios autenticados crear nuevas categorías';
COMMENT ON POLICY "categories_update_policy" ON categories IS 'Permite a usuarios autenticados actualizar categorías';
COMMENT ON POLICY "categories_delete_policy" ON categories IS 'Permite a usuarios autenticados eliminar categorías';

COMMENT ON POLICY "transactions_select_policy" ON transactions IS 'Permite a usuarios autenticados leer todas las transacciones';
COMMENT ON POLICY "transactions_insert_policy" ON transactions IS 'Permite a usuarios autenticados crear nuevas transacciones';
COMMENT ON POLICY "transactions_update_policy" ON transactions IS 'Permite a usuarios autenticados actualizar transacciones';
COMMENT ON POLICY "transactions_delete_policy" ON transactions IS 'Permite a usuarios autenticados eliminar transacciones';
