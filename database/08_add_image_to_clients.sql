-- Agregar campo de imagen a la tabla de clientes
ALTER TABLE clientes 
ADD COLUMN imagen_url TEXT;

-- Agregar índice para búsquedas por imagen
CREATE INDEX IF NOT EXISTS idx_clientes_imagen_url ON clientes(imagen_url);

-- Comentario para documentar el nuevo campo
COMMENT ON COLUMN clientes.imagen_url IS 'URL de la imagen del cliente (opcional)';
