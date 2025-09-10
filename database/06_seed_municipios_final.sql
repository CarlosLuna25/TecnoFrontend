-- Finalización del seeder para los municipios de Venezuela

-- Mérida (ID: 14)
INSERT INTO municipios (codigo, nombre, estado_id) VALUES
('1401', 'Alberto Adriani', (SELECT id FROM estados WHERE codigo = 'ME')),
('1402', 'Andrés Bello', (SELECT id FROM estados WHERE codigo = 'ME')),
('1403', 'Antonio Pinto Salinas', (SELECT id FROM estados WHERE codigo = 'ME')),
('1404', 'Aricagua', (SELECT id FROM estados WHERE codigo = 'ME')),
('1405', 'Arzobispo Chacón', (SELECT id FROM estados WHERE codigo = 'ME')),
('1406', 'Campo Elías', (SELECT id FROM estados WHERE codigo = 'ME')),
('1407', 'Caracciolo Parra Olmedo', (SELECT id FROM estados WHERE codigo = 'ME')),
('1408', 'Cardenal Quintero', (SELECT id FROM estados WHERE codigo = 'ME')),
('1409', 'Guaraque', (SELECT id FROM estados WHERE codigo = 'ME')),
('1410', 'Julio César Salas', (SELECT id FROM estados WHERE codigo = 'ME')),
('1411', 'Justo Briceño', (SELECT id FROM estados WHERE codigo = 'ME')),
('1412', 'Libertador', (SELECT id FROM estados WHERE codigo = 'ME')),
('1413', 'Miranda', (SELECT id FROM estados WHERE codigo = 'ME')),
('1414', 'Obispo Ramos de Lora', (SELECT id FROM estados WHERE codigo = 'ME')),
('1415', 'Padre Noguera', (SELECT id FROM estados WHERE codigo = 'ME')),
('1416', 'Pueblo Llano', (SELECT id FROM estados WHERE codigo = 'ME')),
('1417', 'Rangel', (SELECT id FROM estados WHERE codigo = 'ME')),
('1418', 'Rivas Dávila', (SELECT id FROM estados WHERE codigo = 'ME')),
('1419', 'Santos Marquina', (SELECT id FROM estados WHERE codigo = 'ME')),
('1420', 'Sucre', (SELECT id FROM estados WHERE codigo = 'ME')),
('1421', 'Tovar', (SELECT id FROM estados WHERE codigo = 'ME')),
('1422', 'Tulio Febres Cordero', (SELECT id FROM estados WHERE codigo = 'ME')),
('1423', 'Zea', (SELECT id FROM estados WHERE codigo = 'ME'));

-- Miranda (ID: 15)
INSERT INTO municipios (codigo, nombre, estado_id) VALUES
('1501', 'Acevedo', (SELECT id FROM estados WHERE codigo = 'MI')),
('1502', 'Andrés Bello', (SELECT id FROM estados WHERE codigo = 'MI')),
('1503', 'Baruta', (SELECT id FROM estados WHERE codigo = 'MI')),
('1504', 'Brión', (SELECT id FROM estados WHERE codigo = 'MI')),
('1505', 'Buroz', (SELECT id FROM estados WHERE codigo = 'MI')),
('1506', 'Carrizal', (SELECT id FROM estados WHERE codigo = 'MI')),
('1507', 'Chacao', (SELECT id FROM estados WHERE codigo = 'MI')),
('1508', 'Cristóbal Rojas', (SELECT id FROM estados WHERE codigo = 'MI')),
('1509', 'El Hatillo', (SELECT id FROM estados WHERE codigo = 'MI')),
('1510', 'Guaicaipuro', (SELECT id FROM estados WHERE codigo = 'MI')),
('1511', 'Independencia', (SELECT id FROM estados WHERE codigo = 'MI')),
('1512', 'Lander', (SELECT id FROM estados WHERE codigo = 'MI')),
('1513', 'Los Salias', (SELECT id FROM estados WHERE codigo = 'MI')),
('1514', 'Páez', (SELECT id FROM estados WHERE codigo = 'MI')),
('1515', 'Paz Castillo', (SELECT id FROM estados WHERE codigo = 'MI')),
('1516', 'Pedro Gual', (SELECT id FROM estados WHERE codigo = 'MI')),
('1517', 'Plaza', (SELECT id FROM estados WHERE codigo = 'MI')),
('1518', 'Simón Bolívar', (SELECT id FROM estados WHERE codigo = 'MI')),
('1519', 'Sucre', (SELECT id FROM estados WHERE codigo = 'MI')),
('1520', 'Urdaneta', (SELECT id FROM estados WHERE codigo = 'MI')),
('1521', 'Zamora', (SELECT id FROM estados WHERE codigo = 'MI'));

-- Monagas (ID: 16)
INSERT INTO municipios (codigo, nombre, estado_id) VALUES
('1601', 'Acosta', (SELECT id FROM estados WHERE codigo = 'MO')),
('1602', 'Aguasay', (SELECT id FROM estados WHERE codigo = 'MO')),
('1603', 'Bolívar', (SELECT id FROM estados WHERE codigo = 'MO')),
('1604', 'Caripe', (SELECT id FROM estados WHERE codigo = 'MO')),
('1605', 'Cedeño', (SELECT id FROM estados WHERE codigo = 'MO')),
('1606', 'Ezequiel Zamora', (SELECT id FROM estados WHERE codigo = 'MO')),
('1607', 'Libertador', (SELECT id FROM estados WHERE codigo = 'MO')),
('1608', 'Maturín', (SELECT id FROM estados WHERE codigo = 'MO')),
('1609', 'Piar', (SELECT id FROM estados WHERE codigo = 'MO')),
('1610', 'Punceres', (SELECT id FROM estados WHERE codigo = 'MO')),
('1611', 'Santa Bárbara', (SELECT id FROM estados WHERE codigo = 'MO')),
('1612', 'Sotillo', (SELECT id FROM estados WHERE codigo = 'MO')),
('1613', 'Uracoa', (SELECT id FROM estados WHERE codigo = 'MO'));

-- Nueva Esparta (ID: 17)
INSERT INTO municipios (codigo, nombre, estado_id) VALUES
('1701', 'Antolín del Campo', (SELECT id FROM estados WHERE codigo = 'NE')),
('1702', 'Arismendi', (SELECT id FROM estados WHERE codigo = 'NE')),
('1703', 'García', (SELECT id FROM estados WHERE codigo = 'NE')),
('1704', 'Gómez', (SELECT id FROM estados WHERE codigo = 'NE')),
('1705', 'Maneiro', (SELECT id FROM estados WHERE codigo = 'NE')),
('1706', 'Marcano', (SELECT id FROM estados WHERE codigo = 'NE')),
('1707', 'Mariño', (SELECT id FROM estados WHERE codigo = 'NE')),
('1708', 'Península de Macanao', (SELECT id FROM estados WHERE codigo = 'NE')),
('1709', 'Tubores', (SELECT id FROM estados WHERE codigo = 'NE')),
('1710', 'Villalba', (SELECT id FROM estados WHERE codigo = 'NE')),
('1711', 'Díaz', (SELECT id FROM estados WHERE codigo = 'NE'));

-- Portuguesa (ID: 18)
INSERT INTO municipios (codigo, nombre, estado_id) VALUES
('1801', 'Agua Blanca', (SELECT id FROM estados WHERE codigo = 'PO')),
('1802', 'Araure', (SELECT id FROM estados WHERE codigo = 'PO')),
('1803', 'Esteller', (SELECT id FROM estados WHERE codigo = 'PO')),
('1804', 'Guanare', (SELECT id FROM estados WHERE codigo = 'PO')),
('1805', 'Guanarito', (SELECT id FROM estados WHERE codigo = 'PO')),
('1806', 'Monseñor José Vicente de Unda', (SELECT id FROM estados WHERE codigo = 'PO')),
('1807', 'Ospino', (SELECT id FROM estados WHERE codigo = 'PO')),
('1808', 'Páez', (SELECT id FROM estados WHERE codigo = 'PO')),
('1809', 'Papelón', (SELECT id FROM estados WHERE codigo = 'PO')),
('1810', 'San Genaro de Boconoíto', (SELECT id FROM estados WHERE codigo = 'PO')),
('1811', 'San Rafael de Onoto', (SELECT id FROM estados WHERE codigo = 'PO')),
('1812', 'Santa Rosalía', (SELECT id FROM estados WHERE codigo = 'PO')),
('1813', 'Sucre', (SELECT id FROM estados WHERE codigo = 'PO')),
('1814', 'Turén', (SELECT id FROM estados WHERE codigo = 'PO'));

-- Sucre (ID: 19)
INSERT INTO municipios (codigo, nombre, estado_id) VALUES
('1901', 'Andrés Eloy Blanco', (SELECT id FROM estados WHERE codigo = 'SU')),
('1902', 'Andrés Mata', (SELECT id FROM estados WHERE codigo = 'SU')),
('1903', 'Arismendi', (SELECT id FROM estados WHERE codigo = 'SU')),
('1904', 'Benítez', (SELECT id FROM estados WHERE codigo = 'SU')),
('1905', 'Bermúdez', (SELECT id FROM estados WHERE codigo = 'SU')),
('1906', 'Bolívar', (SELECT id FROM estados WHERE codigo = 'SU')),
('1907', 'Cajigal', (SELECT id FROM estados WHERE codigo = 'SU')),
('1908', 'Cruz Salmerón Acosta', (SELECT id FROM estados WHERE codigo = 'SU')),
('1909', 'Libertador', (SELECT id FROM estados WHERE codigo = 'SU')),
('1910', 'Mariño', (SELECT id FROM estados WHERE codigo = 'SU')),
('1911', 'Mejía', (SELECT id FROM estados WHERE codigo = 'SU')),
('1912', 'Montes', (SELECT id FROM estados WHERE codigo = 'SU')),
('1913', 'Ribero', (SELECT id FROM estados WHERE codigo = 'SU')),
('1914', 'Sucre', (SELECT id FROM estados WHERE codigo = 'SU')),
('1915', 'Valdez', (SELECT id FROM estados WHERE codigo = 'SU'));

-- Táchira (ID: 20)
INSERT INTO municipios (codigo, nombre, estado_id) VALUES
('2001', 'Andrés Bello', (SELECT id FROM estados WHERE codigo = 'TA')),
('2002', 'Antonio Rómulo Costa', (SELECT id FROM estados WHERE codigo = 'TA')),
('2003', 'Ayacucho', (SELECT id FROM estados WHERE codigo = 'TA')),
('2004', 'Bolívar', (SELECT id FROM estados WHERE codigo = 'TA')),
('2005', 'Cárdenas', (SELECT id FROM estados WHERE codigo = 'TA')),
('2006', 'Córdoba', (SELECT id FROM estados WHERE codigo = 'TA')),
('2007', 'Fernández Feo', (SELECT id FROM estados WHERE codigo = 'TA')),
('2008', 'Francisco de Miranda', (SELECT id FROM estados WHERE codigo = 'TA')),
('2009', 'García de Hevia', (SELECT id FROM estados WHERE codigo = 'TA')),
('2010', 'Guásimos', (SELECT id FROM estados WHERE codigo = 'TA')),
('2011', 'Independencia', (SELECT id FROM estados WHERE codigo = 'TA')),
('2012', 'Jáuregui', (SELECT id FROM estados WHERE codigo = 'TA')),
('2013', 'José María Vargas', (SELECT id FROM estados WHERE codigo = 'TA')),
('2014', 'Junín', (SELECT id FROM estados WHERE codigo = 'TA')),
('2015', 'Libertad', (SELECT id FROM estados WHERE codigo = 'TA')),
('2016', 'Libertador', (SELECT id FROM estados WHERE codigo = 'TA')),
('2017', 'Lobatera', (SELECT id FROM estados WHERE codigo = 'TA')),
('2018', 'Michelena', (SELECT id FROM estados WHERE codigo = 'TA')),
('2019', 'Panamericano', (SELECT id FROM estados WHERE codigo = 'TA')),
('2020', 'Pedro María Ureña', (SELECT id FROM estados WHERE codigo = 'TA')),
('2021', 'Rafael Urdaneta', (SELECT id FROM estados WHERE codigo = 'TA')),
('2022', 'Samuel Darío Maldonado', (SELECT id FROM estados WHERE codigo = 'TA')),
('2023', 'San Cristóbal', (SELECT id FROM estados WHERE codigo = 'TA')),
('2024', 'Seboruco', (SELECT id FROM estados WHERE codigo = 'TA')),
('2025', 'Simón Rodríguez', (SELECT id FROM estados WHERE codigo = 'TA')),
('2026', 'Sucre', (SELECT id FROM estados WHERE codigo = 'TA')),
('2027', 'Torbes', (SELECT id FROM estados WHERE codigo = 'TA')),
('2028', 'Uribante', (SELECT id FROM estados WHERE codigo = 'TA')),
('2029', 'San Judas Tadeo', (SELECT id FROM estados WHERE codigo = 'TA'));

-- Trujillo (ID: 21)
INSERT INTO municipios (codigo, nombre, estado_id) VALUES
('2101', 'Andrés Bello', (SELECT id FROM estados WHERE codigo = 'TR')),
('2102', 'Boconó', (SELECT id FROM estados WHERE codigo = 'TR')),
('2103', 'Bolívar', (SELECT id FROM estados WHERE codigo = 'TR')),
('2104', 'Candelaria', (SELECT id FROM estados WHERE codigo = 'TR')),
('2105', 'Carache', (SELECT id FROM estados WHERE codigo = 'TR')),
('2106', 'Escuque', (SELECT id FROM estados WHERE codigo = 'TR')),
('2107', 'José Felipe Márquez Cañizalez', (SELECT id FROM estados WHERE codigo = 'TR')),
('2108', 'Juan Vicente Campos Elías', (SELECT id FROM estados WHERE codigo = 'TR')),
('2109', 'La Ceiba', (SELECT id FROM estados WHERE codigo = 'TR')),
('2110', 'Miranda', (SELECT id FROM estados WHERE codigo = 'TR')),
('2111', 'Monte Carmelo', (SELECT id FROM estados WHERE codigo = 'TR')),
('2112', 'Motatán', (SELECT id FROM estados WHERE codigo = 'TR')),
('2113', 'Pampán', (SELECT id FROM estados WHERE codigo = 'TR')),
('2114', 'Pampanito', (SELECT id FROM estados WHERE codigo = 'TR')),
('2115', 'Rafael Rangel', (SELECT id FROM estados WHERE codigo = 'TR')),
('2116', 'San Rafael de Carvajal', (SELECT id FROM estados WHERE codigo = 'TR')),
('2117', 'Sucre', (SELECT id FROM estados WHERE codigo = 'TR')),
('2118', 'Trujillo', (SELECT id FROM estados WHERE codigo = 'TR')),
('2119', 'Urdaneta', (SELECT id FROM estados WHERE codigo = 'TR')),
('2120', 'Valera', (SELECT id FROM estados WHERE codigo = 'TR'));

-- Vargas (ID: 22)
INSERT INTO municipios (codigo, nombre, estado_id) VALUES
('2201', 'Vargas', (SELECT id FROM estados WHERE codigo = 'VA'));

-- Yaracuy (ID: 23)
INSERT INTO municipios (codigo, nombre, estado_id) VALUES
('2301', 'Arístides Bastidas', (SELECT id FROM estados WHERE codigo = 'YA')),
('2302', 'Bolívar', (SELECT id FROM estados WHERE codigo = 'YA')),
('2303', 'Bruzual', (SELECT id FROM estados WHERE codigo = 'YA')),
('2304', 'Cocorote', (SELECT id FROM estados WHERE codigo = 'YA')),
('2305', 'Independencia', (SELECT id FROM estados WHERE codigo = 'YA')),
('2306', 'José Antonio Páez', (SELECT id FROM estados WHERE codigo = 'YA')),
('2307', 'La Trinidad', (SELECT id FROM estados WHERE codigo = 'YA')),
('2308', 'Manuel Monge', (SELECT id FROM estados WHERE codigo = 'YA')),
('2309', 'Nirgua', (SELECT id FROM estados WHERE codigo = 'YA')),
('2310', 'Peña', (SELECT id FROM estados WHERE codigo = 'YA')),
('2311', 'San Felipe', (SELECT id FROM estados WHERE codigo = 'YA')),
('2312', 'Sucre', (SELECT id FROM estados WHERE codigo = 'YA')),
('2313', 'Urachiche', (SELECT id FROM estados WHERE codigo = 'YA')),
('2314', 'Veroes', (SELECT id FROM estados WHERE codigo = 'YA'));

-- Zulia (ID: 24)
INSERT INTO municipios (codigo, nombre, estado_id) VALUES
('2401', 'Almirante Padilla', (SELECT id FROM estados WHERE codigo = 'ZU')),
('2402', 'Baralt', (SELECT id FROM estados WHERE codigo = 'ZU')),
('2403', 'Cabimas', (SELECT id FROM estados WHERE codigo = 'ZU')),
('2404', 'Catatumbo', (SELECT id FROM estados WHERE codigo = 'ZU')),
('2405', 'Colón', (SELECT id FROM estados WHERE codigo = 'ZU')),
('2406', 'Francisco Javier Pulgar', (SELECT id FROM estados WHERE codigo = 'ZU')),
('2407', 'Jesús Enrique Lossada', (SELECT id FROM estados WHERE codigo = 'ZU')),
('2408', 'Jesús María Semprún', (SELECT id FROM estados WHERE codigo = 'ZU')),
('2409', 'La Cañada de Urdaneta', (SELECT id FROM estados WHERE codigo = 'ZU')),
('2410', 'Lagunillas', (SELECT id FROM estados WHERE codigo = 'ZU')),
('2411', 'Machiques de Perijá', (SELECT id FROM estados WHERE codigo = 'ZU')),
('2412', 'Mara', (SELECT id FROM estados WHERE codigo = 'ZU')),
('2413', 'Maracaibo', (SELECT id FROM estados WHERE codigo = 'ZU')),
('2414', 'Miranda', (SELECT id FROM estados WHERE codigo = 'ZU')),
('2415', 'Rosario de Perijá', (SELECT id FROM estados WHERE codigo = 'ZU')),
('2416', 'San Francisco', (SELECT id FROM estados WHERE codigo = 'ZU')),
('2417', 'Santa Rita', (SELECT id FROM estados WHERE codigo = 'ZU')),
('2418', 'Simón Bolívar', (SELECT id FROM estados WHERE codigo = 'ZU')),
('2419', 'Sucre', (SELECT id FROM estados WHERE codigo = 'ZU')),
('2420', 'Valmore Rodríguez', (SELECT id FROM estados WHERE codigo = 'ZU')),
('2421', 'Guajira', (SELECT id FROM estados WHERE codigo = 'ZU'));

-- Manejo de conflictos
ON CONFLICT (codigo) DO NOTHING;
