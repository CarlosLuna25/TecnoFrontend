-- Seeder para los municipios de Venezuela
-- Los municipios están organizados por estado y utilizan el ID del estado como referencia

-- Amazonas (ID: 1)
INSERT INTO municipios (codigo, nombre, estado_id) VALUES
('0101', 'Alto Orinoco', (SELECT id FROM estados WHERE codigo = 'AM')),
('0102', 'Atabapo', (SELECT id FROM estados WHERE codigo = 'AM')),
('0103', 'Atures', (SELECT id FROM estados WHERE codigo = 'AM')),
('0104', 'Autana', (SELECT id FROM estados WHERE codigo = 'AM')),
('0105', 'Manapiare', (SELECT id FROM estados WHERE codigo = 'AM')),
('0106', 'Maroa', (SELECT id FROM estados WHERE codigo = 'AM')),
('0107', 'Río Negro', (SELECT id FROM estados WHERE codigo = 'AM'));

-- Anzoátegui (ID: 2)
INSERT INTO municipios (codigo, nombre, estado_id) VALUES
('0201', 'Anaco', (SELECT id FROM estados WHERE codigo = 'AN')),
('0202', 'Aragua', (SELECT id FROM estados WHERE codigo = 'AN')),
('0203', 'Manuel Ezequiel Bruzual', (SELECT id FROM estados WHERE codigo = 'AN')),
('0204', 'Diego Bautista Urbaneja', (SELECT id FROM estados WHERE codigo = 'AN')),
('0205', 'Fernando Peñalver', (SELECT id FROM estados WHERE codigo = 'AN')),
('0206', 'Francisco Del Carmen Carvajal', (SELECT id FROM estados WHERE codigo = 'AN')),
('0207', 'General Sir Arthur McGregor', (SELECT id FROM estados WHERE codigo = 'AN')),
('0208', 'Guanta', (SELECT id FROM estados WHERE codigo = 'AN')),
('0209', 'Independencia', (SELECT id FROM estados WHERE codigo = 'AN')),
('0210', 'José Gregorio Monagas', (SELECT id FROM estados WHERE codigo = 'AN')),
('0211', 'Juan Antonio Sotillo', (SELECT id FROM estados WHERE codigo = 'AN')),
('0212', 'Juan Manuel Cajigal', (SELECT id FROM estados WHERE codigo = 'AN')),
('0213', 'Libertad', (SELECT id FROM estados WHERE codigo = 'AN')),
('0214', 'Francisco de Miranda', (SELECT id FROM estados WHERE codigo = 'AN')),
('0215', 'Pedro María Freites', (SELECT id FROM estados WHERE codigo = 'AN')),
('0216', 'Píritu', (SELECT id FROM estados WHERE codigo = 'AN')),
('0217', 'San José de Guanipa', (SELECT id FROM estados WHERE codigo = 'AN')),
('0218', 'San Juan de Capistrano', (SELECT id FROM estados WHERE codigo = 'AN')),
('0219', 'Santa Ana', (SELECT id FROM estados WHERE codigo = 'AN')),
('0220', 'Simón Bolívar', (SELECT id FROM estados WHERE codigo = 'AN')),
('0221', 'Simón Rodríguez', (SELECT id FROM estados WHERE codigo = 'AN'));

-- Apure (ID: 3)
INSERT INTO municipios (codigo, nombre, estado_id) VALUES
('0301', 'Achaguas', (SELECT id FROM estados WHERE codigo = 'AP')),
('0302', 'Biruaca', (SELECT id FROM estados WHERE codigo = 'AP')),
('0303', 'Muñoz', (SELECT id FROM estados WHERE codigo = 'AP')),
('0304', 'Páez', (SELECT id FROM estados WHERE codigo = 'AP')),
('0305', 'Pedro Camejo', (SELECT id FROM estados WHERE codigo = 'AP')),
('0306', 'Rómulo Gallegos', (SELECT id FROM estados WHERE codigo = 'AP')),
('0307', 'San Fernando', (SELECT id FROM estados WHERE codigo = 'AP'));

-- Aragua (ID: 4)
INSERT INTO municipios (codigo, nombre, estado_id) VALUES
('0401', 'Bolívar', (SELECT id FROM estados WHERE codigo = 'AR')),
('0402', 'Camatagua', (SELECT id FROM estados WHERE codigo = 'AR')),
('0403', 'Francisco Linares Alcántara', (SELECT id FROM estados WHERE codigo = 'AR')),
('0404', 'Girardot', (SELECT id FROM estados WHERE codigo = 'AR')),
('0405', 'José Ángel Lamas', (SELECT id FROM estados WHERE codigo = 'AR')),
('0406', 'José Félix Ribas', (SELECT id FROM estados WHERE codigo = 'AR')),
('0407', 'José Rafael Revenga', (SELECT id FROM estados WHERE codigo = 'AR')),
('0408', 'Libertador', (SELECT id FROM estados WHERE codigo = 'AR')),
('0409', 'Mario Briceño Iragorry', (SELECT id FROM estados WHERE codigo = 'AR')),
('0410', 'Ocumare de la Costa de Oro', (SELECT id FROM estados WHERE codigo = 'AR')),
('0411', 'San Casimiro', (SELECT id FROM estados WHERE codigo = 'AR')),
('0412', 'San Sebastián', (SELECT id FROM estados WHERE codigo = 'AR')),
('0413', 'Santiago Mariño', (SELECT id FROM estados WHERE codigo = 'AR')),
('0414', 'Santos Michelena', (SELECT id FROM estados WHERE codigo = 'AR')),
('0415', 'Sucre', (SELECT id FROM estados WHERE codigo = 'AR')),
('0416', 'Tovar', (SELECT id FROM estados WHERE codigo = 'AR')),
('0417', 'Urdaneta', (SELECT id FROM estados WHERE codigo = 'AR')),
('0418', 'Zamora', (SELECT id FROM estados WHERE codigo = 'AR'));

-- Barinas (ID: 5)
INSERT INTO municipios (codigo, nombre, estado_id) VALUES
('0501', 'Alberto Torrealba', (SELECT id FROM estados WHERE codigo = 'BA')),
('0502', 'Andrés Eloy Blanco', (SELECT id FROM estados WHERE codigo = 'BA')),
('0503', 'Antonio José de Sucre', (SELECT id FROM estados WHERE codigo = 'BA')),
('0504', 'Arismendi', (SELECT id FROM estados WHERE codigo = 'BA')),
('0505', 'Barinas', (SELECT id FROM estados WHERE codigo = 'BA')),
('0506', 'Bolívar', (SELECT id FROM estados WHERE codigo = 'BA')),
('0507', 'Cruz Paredes', (SELECT id FROM estados WHERE codigo = 'BA')),
('0508', 'Ezequiel Zamora', (SELECT id FROM estados WHERE codigo = 'BA')),
('0509', 'Obispos', (SELECT id FROM estados WHERE codigo = 'BA')),
('0510', 'Pedraza', (SELECT id FROM estados WHERE codigo = 'BA')),
('0511', 'Rojas', (SELECT id FROM estados WHERE codigo = 'BA')),
('0512', 'Sosa', (SELECT id FROM estados WHERE codigo = 'BA'));

-- Continúa en el siguiente archivo debido al límite de caracteres...
