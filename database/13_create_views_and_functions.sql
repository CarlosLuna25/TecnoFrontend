-- Vistas para facilitar consultas de gastos e ingresos

-- Vista para gastos con información de categoría y cliente
CREATE OR REPLACE VIEW gastos_view AS
SELECT 
    t.id,
    t.descripcion,
    t.monto,
    t.fecha,
    t.metodo_pago,
    t.notas,
    t.created_at,
    t.updated_at,
    c.nombre as categoria_nombre,
    c.descripcion as categoria_descripcion,
    c.color as categoria_color,
    cl.name as cliente_nombre,
    cl.email as cliente_email,
    cl.phone as cliente_telefono
FROM transactions t
LEFT JOIN categories c ON t.categoria_id = c.id
LEFT JOIN clients cl ON t.cliente_id = cl.id
WHERE t.tipo = 'gasto'
ORDER BY t.fecha DESC, t.created_at DESC;

-- Vista para ingresos con información de categoría y cliente
CREATE OR REPLACE VIEW ingresos_view AS
SELECT 
    t.id,
    t.descripcion,
    t.monto,
    t.fecha,
    t.metodo_pago,
    t.notas,
    t.created_at,
    t.updated_at,
    c.nombre as categoria_nombre,
    c.descripcion as categoria_descripcion,
    c.color as categoria_color,
    cl.name as cliente_nombre,
    cl.email as cliente_email,
    cl.phone as cliente_telefono
FROM transactions t
LEFT JOIN categories c ON t.categoria_id = c.id
LEFT JOIN clients cl ON t.cliente_id = cl.id
WHERE t.tipo = 'ingreso'
ORDER BY t.fecha DESC, t.created_at DESC;

-- Vista resumen de transacciones por categoría
CREATE OR REPLACE VIEW resumen_categorias_view AS
SELECT 
    c.id as categoria_id,
    c.nombre as categoria_nombre,
    c.tipo as categoria_tipo,
    c.color as categoria_color,
    COUNT(t.id) as total_transacciones,
    COALESCE(SUM(t.monto), 0) as total_monto,
    COALESCE(AVG(t.monto), 0) as promedio_monto,
    MAX(t.fecha) as ultima_transaccion
FROM categories c
LEFT JOIN transactions t ON c.id = t.categoria_id
GROUP BY c.id, c.nombre, c.tipo, c.color
ORDER BY c.tipo, total_monto DESC;

-- Vista resumen mensual de transacciones
CREATE OR REPLACE VIEW resumen_mensual_view AS
SELECT 
    EXTRACT(YEAR FROM fecha) as año,
    EXTRACT(MONTH FROM fecha) as mes,
    TO_CHAR(fecha, 'YYYY-MM') as periodo,
    tipo,
    COUNT(*) as total_transacciones,
    SUM(monto) as total_monto
FROM transactions
GROUP BY EXTRACT(YEAR FROM fecha), EXTRACT(MONTH FROM fecha), TO_CHAR(fecha, 'YYYY-MM'), tipo
ORDER BY año DESC, mes DESC, tipo;

-- Función para obtener balance mensual
CREATE OR REPLACE FUNCTION get_balance_mensual(año_param INTEGER, mes_param INTEGER)
RETURNS TABLE (
    ingresos DECIMAL(12,2),
    gastos DECIMAL(12,2),
    balance DECIMAL(12,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COALESCE(SUM(CASE WHEN tipo = 'ingreso' THEN monto ELSE 0 END), 0) as ingresos,
        COALESCE(SUM(CASE WHEN tipo = 'gasto' THEN monto ELSE 0 END), 0) as gastos,
        COALESCE(SUM(CASE WHEN tipo = 'ingreso' THEN monto ELSE -monto END), 0) as balance
    FROM transactions
    WHERE EXTRACT(YEAR FROM fecha) = año_param 
    AND EXTRACT(MONTH FROM fecha) = mes_param;
END;
$$ LANGUAGE plpgsql;

-- Función para obtener balance por cliente
CREATE OR REPLACE FUNCTION get_balance_cliente(cliente_id_param BIGINT)
RETURNS TABLE (
    ingresos DECIMAL(12,2),
    gastos DECIMAL(12,2),
    balance DECIMAL(12,2),
    total_transacciones BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COALESCE(SUM(CASE WHEN tipo = 'ingreso' THEN monto ELSE 0 END), 0) as ingresos,
        COALESCE(SUM(CASE WHEN tipo = 'gasto' THEN monto ELSE 0 END), 0) as gastos,
        COALESCE(SUM(CASE WHEN tipo = 'ingreso' THEN monto ELSE -monto END), 0) as balance,
        COUNT(*) as total_transacciones
    FROM transactions
    WHERE cliente_id = cliente_id_param;
END;
$$ LANGUAGE plpgsql;

-- Función para obtener top categorías por tipo
CREATE OR REPLACE FUNCTION get_top_categorias(tipo_param VARCHAR(10), limite INTEGER DEFAULT 5)
RETURNS TABLE (
    categoria_id BIGINT,
    categoria_nombre VARCHAR(100),
    total_monto DECIMAL(12,2),
    total_transacciones BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id,
        c.nombre,
        COALESCE(SUM(t.monto), 0),
        COUNT(t.id)
    FROM categories c
    LEFT JOIN transactions t ON c.id = t.categoria_id AND t.tipo = tipo_param
    WHERE c.tipo = tipo_param
    GROUP BY c.id, c.nombre
    ORDER BY COALESCE(SUM(t.monto), 0) DESC
    LIMIT limite;
END;
$$ LANGUAGE plpgsql;

-- Comentarios en las vistas y funciones
COMMENT ON VIEW gastos_view IS 'Vista que une gastos con información de categorías y clientes';
COMMENT ON VIEW ingresos_view IS 'Vista que une ingresos con información de categorías y clientes';
COMMENT ON VIEW resumen_categorias_view IS 'Vista resumen de transacciones agrupadas por categoría';
COMMENT ON VIEW resumen_mensual_view IS 'Vista resumen de transacciones agrupadas por mes y tipo';
COMMENT ON FUNCTION get_balance_mensual IS 'Función para obtener el balance de ingresos y gastos de un mes específico';
COMMENT ON FUNCTION get_balance_cliente IS 'Función para obtener el balance de un cliente específico';
COMMENT ON FUNCTION get_top_categorias IS 'Función para obtener las categorías con mayor movimiento';
