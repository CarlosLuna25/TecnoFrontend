-- Continuación del seeder para los municipios de Venezuela

-- Bolívar (ID: 6)
INSERT INTO municipios (codigo, nombre, estado_id) VALUES
('0601', 'Caroní', (SELECT id FROM estados WHERE codigo = 'BO')),
('0602', 'Cedeño', (SELECT id FROM estados WHERE codigo = 'BO')),
('0603', 'El Callao', (SELECT id FROM estados WHERE codigo = 'BO')),
('0604', 'Gran Sabana', (SELECT id FROM estados WHERE codigo = 'BO')),
('0605', 'Heres', (SELECT id FROM estados WHERE codigo = 'BO')),
('0606', 'Piar', (SELECT id FROM estados WHERE codigo = 'BO')),
('0607', 'Angostura (Raúl Leoni)', (SELECT id FROM estados WHERE codigo = 'BO')),
('0608', 'Roscio', (SELECT id FROM estados WHERE codigo = 'BO')),
('0609', 'Sifontes', (SELECT id FROM estados WHERE codigo = 'BO')),
('0610', 'Sucre', (SELECT id FROM estados WHERE codigo = 'BO')),
('0611', 'Padre Pedro Chien', (SELECT id FROM estados WHERE codigo = 'BO'));

-- Carabobo (ID: 7)
INSERT INTO municipios (codigo, nombre, estado_id) VALUES
('0701', 'Bejuma', (SELECT id FROM estados WHERE codigo = 'CA')),
('0702', 'Carlos Arvelo', (SELECT id FROM estados WHERE codigo = 'CA')),
('0703', 'Diego Ibarra', (SELECT id FROM estados WHERE codigo = 'CA')),
('0704', 'Guacara', (SELECT id FROM estados WHERE codigo = 'CA')),
('0705', 'Juan José Mora', (SELECT id FROM estados WHERE codigo = 'CA')),
('0706', 'Libertador', (SELECT id FROM estados WHERE codigo = 'CA')),
('0707', 'Los Guayos', (SELECT id FROM estados WHERE codigo = 'CA')),
('0708', 'Miranda', (SELECT id FROM estados WHERE codigo = 'CA')),
('0709', 'Montalbán', (SELECT id FROM estados WHERE codigo = 'CA')),
('0710', 'Naguanagua', (SELECT id FROM estados WHERE codigo = 'CA')),
('0711', 'Puerto Cabello', (SELECT id FROM estados WHERE codigo = 'CA')),
('0712', 'San Diego', (SELECT id FROM estados WHERE codigo = 'CA')),
('0713', 'San Joaquín', (SELECT id FROM estados WHERE codigo = 'CA')),
('0714', 'Valencia', (SELECT id FROM estados WHERE codigo = 'CA'));

-- Cojedes (ID: 8)
INSERT INTO municipios (codigo, nombre, estado_id) VALUES
('0801', 'Anzoátegui', (SELECT id FROM estados WHERE codigo = 'CO')),
('0802', 'Tinaquillo', (SELECT id FROM estados WHERE codigo = 'CO')),
('0803', 'Girardot', (SELECT id FROM estados WHERE codigo = 'CO')),
('0804', 'Lima Blanco', (SELECT id FROM estados WHERE codigo = 'CO')),
('0805', 'Pao de San Juan Bautista', (SELECT id FROM estados WHERE codigo = 'CO')),
('0806', 'Ricaurte', (SELECT id FROM estados WHERE codigo = 'CO')),
('0807', 'Rómulo Gallegos', (SELECT id FROM estados WHERE codigo = 'CO')),
('0808', 'San Carlos', (SELECT id FROM estados WHERE codigo = 'CO')),
('0809', 'Tinaco', (SELECT id FROM estados WHERE codigo = 'CO'));

-- Delta Amacuro (ID: 9)
INSERT INTO municipios (codigo, nombre, estado_id) VALUES
('0901', 'Antonio Díaz', (SELECT id FROM estados WHERE codigo = 'DA')),
('0902', 'Casacoima', (SELECT id FROM estados WHERE codigo = 'DA')),
('0903', 'Pedernales', (SELECT id FROM estados WHERE codigo = 'DA')),
('0904', 'Tucupita', (SELECT id FROM estados WHERE codigo = 'DA'));

-- Distrito Capital (ID: 10)
INSERT INTO municipios (codigo, nombre, estado_id) VALUES
('1001', 'Libertador', (SELECT id FROM estados WHERE codigo = 'DC'));

-- Falcón (ID: 11)
INSERT INTO municipios (codigo, nombre, estado_id) VALUES
('1101', 'Acosta', (SELECT id FROM estados WHERE codigo = 'FA')),
('1102', 'Bolívar', (SELECT id FROM estados WHERE codigo = 'FA')),
('1103', 'Buchivacoa', (SELECT id FROM estados WHERE codigo = 'FA')),
('1104', 'Cacique Manaure', (SELECT id FROM estados WHERE codigo = 'FA')),
('1105', 'Carirubana', (SELECT id FROM estados WHERE codigo = 'FA')),
('1106', 'Colina', (SELECT id FROM estados WHERE codigo = 'FA')),
('1107', 'Dabajuro', (SELECT id FROM estados WHERE codigo = 'FA')),
('1108', 'Democracia', (SELECT id FROM estados WHERE codigo = 'FA')),
('1109', 'Falcón', (SELECT id FROM estados WHERE codigo = 'FA')),
('1110', 'Federación', (SELECT id FROM estados WHERE codigo = 'FA')),
('1111', 'Jacura', (SELECT id FROM estados WHERE codigo = 'FA')),
('1112', 'José Laurencio Silva', (SELECT id FROM estados WHERE codigo = 'FA')),
('1113', 'Los Taques', (SELECT id FROM estados WHERE codigo = 'FA')),
('1114', 'Mauroa', (SELECT id FROM estados WHERE codigo = 'FA')),
('1115', 'Miranda', (SELECT id FROM estados WHERE codigo = 'FA')),
('1116', 'Monseñor Iturriza', (SELECT id FROM estados WHERE codigo = 'FA')),
('1117', 'Palmasola', (SELECT id FROM estados WHERE codigo = 'FA')),
('1118', 'Petit', (SELECT id FROM estados WHERE codigo = 'FA')),
('1119', 'Píritu', (SELECT id FROM estados WHERE codigo = 'FA')),
('1120', 'San Francisco', (SELECT id FROM estados WHERE codigo = 'FA')),
('1121', 'Sucre', (SELECT id FROM estados WHERE codigo = 'FA')),
('1122', 'Tocópero', (SELECT id FROM estados WHERE codigo = 'FA')),
('1123', 'Unión', (SELECT id FROM estados WHERE codigo = 'FA')),
('1124', 'Urumaco', (SELECT id FROM estados WHERE codigo = 'FA')),
('1125', 'Zamora', (SELECT id FROM estados WHERE codigo = 'FA'));

-- Guárico (ID: 12)
INSERT INTO municipios (codigo, nombre, estado_id) VALUES
('1201', 'Camaguán', (SELECT id FROM estados WHERE codigo = 'GU')),
('1202', 'Chaguaramas', (SELECT id FROM estados WHERE codigo = 'GU')),
('1203', 'El Socorro', (SELECT id FROM estados WHERE codigo = 'GU')),
('1204', 'José Félix Ribas', (SELECT id FROM estados WHERE codigo = 'GU')),
('1205', 'José Tadeo Monagas', (SELECT id FROM estados WHERE codigo = 'GU')),
('1206', 'Juan Germán Roscio', (SELECT id FROM estados WHERE codigo = 'GU')),
('1207', 'Julián Mellado', (SELECT id FROM estados WHERE codigo = 'GU')),
('1208', 'Las Mercedes', (SELECT id FROM estados WHERE codigo = 'GU')),
('1209', 'Leonardo Infante', (SELECT id FROM estados WHERE codigo = 'GU')),
('1210', 'Pedro Zaraza', (SELECT id FROM estados WHERE codigo = 'GU')),
('1211', 'Ortiz', (SELECT id FROM estados WHERE codigo = 'GU')),
('1212', 'San Gerónimo de Guayabal', (SELECT id FROM estados WHERE codigo = 'GU')),
('1213', 'San José de Guaribe', (SELECT id FROM estados WHERE codigo = 'GU')),
('1214', 'Santa María de Ipire', (SELECT id FROM estados WHERE codigo = 'GU')),
('1215', 'Sebastián Francisco de Miranda', (SELECT id FROM estados WHERE codigo = 'GU'));

-- Lara (ID: 13)
INSERT INTO municipios (codigo, nombre, estado_id) VALUES
('1301', 'Andrés Eloy Blanco', (SELECT id FROM estados WHERE codigo = 'LA')),
('1302', 'Crespo', (SELECT id FROM estados WHERE codigo = 'LA')),
('1303', 'Iribarren', (SELECT id FROM estados WHERE codigo = 'LA')),
('1304', 'Jiménez', (SELECT id FROM estados WHERE codigo = 'LA')),
('1305', 'Morán', (SELECT id FROM estados WHERE codigo = 'LA')),
('1306', 'Palavecino', (SELECT id FROM estados WHERE codigo = 'LA')),
('1307', 'Simón Planas', (SELECT id FROM estados WHERE codigo = 'LA')),
('1308', 'Torres', (SELECT id FROM estados WHERE codigo = 'LA')),
('1309', 'Urdaneta', (SELECT id FROM estados WHERE codigo = 'LA'));

-- Continúa en el siguiente archivo...
