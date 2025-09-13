-- Ejemplos de consultas para transacciones, categorías, gastos e ingresos

-- ==========================================
-- CONSULTAS BÁSICAS DE CATEGORÍAS
-- ==========================================

-- Obtener todas las categorías
SELECT * FROM categories ORDER BY tipo, nombre;

-- Obtener solo categorías de ingresos
SELECT * FROM categories WHERE tipo = 'ingreso' ORDER BY nombre;

-- Obtener solo categorías de gastos
SELECT * FROM categories WHERE tipo = 'gasto' ORDER BY nombre;

-- ==========================================
-- INSERTAR TRANSACCIONES DE EJEMPLO
-- ==========================================

-- Insertar una reparación (ingreso)
INSERT INTO transactions (descripcion, monto, tipo, fecha, categoria_id, metodo_pago, cliente_id, notas)
VALUES (
    'Reparación de pantalla iPhone 13',
    1500.00,
    'ingreso',
    '2024-12-01',
    (SELECT id FROM categories WHERE nombre = 'Reparaciones' LIMIT 1),
    'efectivo',
    1, -- Asumiendo que existe un cliente con ID 1
    'Reparación exitosa, pantalla original'
);

-- Insertar una venta de equipo (ingreso)
INSERT INTO transactions (descripcion, monto, tipo, fecha, categoria_id, metodo_pago, cliente_id, notas)
VALUES (
    'Venta de laptop ASUS VivoBook',
    12000.00,
    'ingreso',
    '2024-12-01',
    (SELECT id FROM categories WHERE nombre = 'Venta de Equipos' LIMIT 1),
    'transferencia',
    2, -- Asumiendo que existe un cliente con ID 2
    'Laptop nueva con garantía de 1 año'
);

-- Insertar un gasto de repuestos
INSERT INTO transactions (descripcion, monto, tipo, fecha, categoria_id, metodo_pago, cliente_id, notas)
VALUES (
    'Compra de pantallas LCD para reparaciones',
    3500.00,
    'gasto',
    '2024-12-01',
    (SELECT id FROM categories WHERE nombre = 'Repuestos' LIMIT 1),
    'tarjeta',
    NULL, -- Gasto no relacionado con cliente específico
    'Stock para reparaciones del mes'
);

-- ==========================================
-- CONSULTAS DE TRANSACCIONES
-- ==========================================

-- Ver todos los gastos con información completa
SELECT * FROM gastos_view ORDER BY fecha DESC;

-- Ver todos los ingresos con información completa  
SELECT * FROM ingresos_view ORDER BY fecha DESC;

-- Transacciones de un cliente específico
SELECT 
    t.*,
    c.nombre as categoria_nombre,
    c.color as categoria_color
FROM transactions t
LEFT JOIN categories c ON t.categoria_id = c.id
WHERE t.cliente_id = 1
ORDER BY t.fecha DESC;

-- Transacciones por rango de fechas
SELECT 
    t.*,
    c.nombre as categoria_nombre,
    c.tipo as categoria_tipo
FROM transactions t
LEFT JOIN categories c ON t.categoria_id = c.id
WHERE t.fecha BETWEEN '2024-12-01' AND '2024-12-31'
ORDER BY t.fecha DESC;

-- ==========================================
-- CONSULTAS DE RESÚMENES Y ANÁLISIS
-- ==========================================

-- Resumen de categorías con totales
SELECT * FROM resumen_categorias_view;

-- Resumen mensual de transacciones
SELECT * FROM resumen_mensual_view 
WHERE periodo = '2024-12'
ORDER BY tipo;

-- Balance del mes actual
SELECT * FROM get_balance_mensual(2024, 12);

-- Balance de un cliente específico
SELECT * FROM get_balance_cliente(1);

-- Top 5 categorías de ingresos
SELECT * FROM get_top_categorias('ingreso', 5);

-- Top 5 categorías de gastos
SELECT * FROM get_top_categorias('gasto', 5);

-- ==========================================
-- ANÁLISIS AVANZADOS
-- ==========================================

-- Ingresos vs Gastos por mes (último año)
SELECT 
    TO_CHAR(fecha, 'YYYY-MM') as mes,
    SUM(CASE WHEN tipo = 'ingreso' THEN monto ELSE 0 END) as ingresos,
    SUM(CASE WHEN tipo = 'gasto' THEN monto ELSE 0 END) as gastos,
    SUM(CASE WHEN tipo = 'ingreso' THEN monto ELSE -monto END) as balance
FROM transactions
WHERE fecha >= CURRENT_DATE - INTERVAL '12 months'
GROUP BY TO_CHAR(fecha, 'YYYY-MM')
ORDER BY mes DESC;

-- Promedio de transacciones por categoría
SELECT 
    c.nombre as categoria,
    c.tipo,
    COUNT(t.id) as total_transacciones,
    ROUND(AVG(t.monto), 2) as promedio_monto,
    ROUND(SUM(t.monto), 2) as total_monto
FROM categories c
LEFT JOIN transactions t ON c.id = t.categoria_id
GROUP BY c.id, c.nombre, c.tipo
HAVING COUNT(t.id) > 0
ORDER BY total_monto DESC;

-- Métodos de pago más utilizados
SELECT 
    metodo_pago,
    COUNT(*) as total_transacciones,
    SUM(monto) as total_monto,
    ROUND(AVG(monto), 2) as promedio_monto
FROM transactions
GROUP BY metodo_pago
ORDER BY total_monto DESC;

-- Clientes con más actividad (ingresos)
SELECT 
    cl.name as cliente_nombre,
    cl.email,
    COUNT(t.id) as total_transacciones,
    SUM(t.monto) as total_ingresos,
    ROUND(AVG(t.monto), 2) as promedio_transaccion,
    MAX(t.fecha) as ultima_transaccion
FROM clients cl
INNER JOIN transactions t ON cl.id = t.cliente_id
WHERE t.tipo = 'ingreso'
GROUP BY cl.id, cl.name, cl.email
ORDER BY total_ingresos DESC
LIMIT 10;

-- ==========================================
-- CONSULTAS PARA DASHBOARD
-- ==========================================

-- Métricas del mes actual
SELECT 
    (SELECT COUNT(*) FROM transactions WHERE EXTRACT(MONTH FROM fecha) = EXTRACT(MONTH FROM CURRENT_DATE) AND EXTRACT(YEAR FROM fecha) = EXTRACT(YEAR FROM CURRENT_DATE)) as transacciones_mes,
    (SELECT COALESCE(SUM(monto), 0) FROM transactions WHERE tipo = 'ingreso' AND EXTRACT(MONTH FROM fecha) = EXTRACT(MONTH FROM CURRENT_DATE) AND EXTRACT(YEAR FROM fecha) = EXTRACT(YEAR FROM CURRENT_DATE)) as ingresos_mes,
    (SELECT COALESCE(SUM(monto), 0) FROM transactions WHERE tipo = 'gasto' AND EXTRACT(MONTH FROM fecha) = EXTRACT(MONTH FROM CURRENT_DATE) AND EXTRACT(YEAR FROM fecha) = EXTRACT(YEAR FROM CURRENT_DATE)) as gastos_mes,
    (SELECT COUNT(DISTINCT cliente_id) FROM transactions WHERE cliente_id IS NOT NULL AND EXTRACT(MONTH FROM fecha) = EXTRACT(MONTH FROM CURRENT_DATE) AND EXTRACT(YEAR FROM fecha) = EXTRACT(YEAR FROM CURRENT_DATE)) as clientes_activos_mes;

-- Últimas 10 transacciones
SELECT 
    t.id,
    t.descripcion,
    t.monto,
    t.tipo,
    t.fecha,
    c.nombre as categoria,
    cl.name as cliente,
    t.metodo_pago
FROM transactions t
LEFT JOIN categories c ON t.categoria_id = c.id
LEFT JOIN clients cl ON t.cliente_id = cl.id
ORDER BY t.created_at DESC
LIMIT 10;
