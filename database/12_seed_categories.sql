-- Insertar categorías predeterminadas basadas en la estructura del frontend

-- Categorías de Ingresos
INSERT INTO categories (nombre, descripcion, tipo, color) VALUES
('Reparaciones', 'Servicios de reparación de equipos electrónicos', 'ingreso', '#10B981'),
('Venta de Equipos', 'Venta de dispositivos electrónicos nuevos y usados', 'ingreso', '#059669'),
('Accesorios', 'Venta de accesorios y periféricos', 'ingreso', '#0D9488'),
('Mantenimiento', 'Servicios de mantenimiento preventivo y correctivo', 'ingreso', '#14B8A6'),
('Instalaciones', 'Instalación de equipos y sistemas', 'ingreso', '#06B6D4'),
('Consultoría Técnica', 'Servicios de consultoría y asesoría técnica', 'ingreso', '#0EA5E9'),
('Capacitación', 'Cursos y capacitaciones técnicas', 'ingreso', '#3B82F6'),
('Soporte Técnico', 'Servicios de soporte técnico remoto y presencial', 'ingreso', '#6366F1');

-- Categorías de Gastos
INSERT INTO categories (nombre, descripcion, tipo, color) VALUES
('Repuestos', 'Compra de repuestos y componentes electrónicos', 'gasto', '#EF4444'),
('Herramientas', 'Adquisición de herramientas de trabajo', 'gasto', '#DC2626'),
('Servicios', 'Gastos en servicios externos (internet, teléfono, etc.)', 'gasto', '#B91C1C'),
('Transporte', 'Gastos de transporte y combustible', 'gasto', '#F97316'),
('Materiales', 'Materiales de oficina y consumibles', 'gasto', '#EA580C'),
('Marketing', 'Publicidad y promoción del negocio', 'gasto', '#D97706'),
('Capacitación Personal', 'Cursos y certificaciones para el equipo', 'gasto', '#CA8A04'),
('Equipamiento', 'Compra de equipos para el taller', 'gasto', '#65A30D'),
('Seguros', 'Seguros del negocio y equipos', 'gasto', '#16A34A'),
('Impuestos', 'Pagos de impuestos y obligaciones fiscales', 'gasto', '#059669');

-- Verificar que las categorías se insertaron correctamente
DO $$
DECLARE
    categoria_count INTEGER;
    ingreso_count INTEGER;
    gasto_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO categoria_count FROM categories;
    SELECT COUNT(*) INTO ingreso_count FROM categories WHERE tipo = 'ingreso';
    SELECT COUNT(*) INTO gasto_count FROM categories WHERE tipo = 'gasto';
    
    RAISE NOTICE 'Total de categorías insertadas: %', categoria_count;
    RAISE NOTICE 'Categorías de ingreso: %', ingreso_count;
    RAISE NOTICE 'Categorías de gasto: %', gasto_count;
END $$;
