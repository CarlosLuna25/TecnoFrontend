-- Configuración de Supabase Storage para imágenes de clientes

-- 1. Crear el bucket "TecnoCarlos" si no existe
INSERT INTO storage.buckets (id, name, public)
VALUES ('TecnoCarlos', 'TecnoCarlos', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Permitir que usuarios autenticados puedan subir archivos
CREATE POLICY "Usuarios autenticados pueden subir archivos" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'TecnoCarlos');

-- 3. Permitir que usuarios autenticados puedan ver archivos
CREATE POLICY "Usuarios autenticados pueden ver archivos" ON storage.objects
FOR SELECT TO authenticated
USING (bucket_id = 'TecnoCarlos');

-- 4. Permitir que usuarios autenticados puedan actualizar archivos
CREATE POLICY "Usuarios autenticados pueden actualizar archivos" ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'TecnoCarlos')
WITH CHECK (bucket_id = 'TecnoCarlos');

-- 5. Permitir que usuarios autenticados puedan eliminar archivos
CREATE POLICY "Usuarios autenticados pueden eliminar archivos" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'TecnoCarlos');

-- 6. Permitir acceso público para ver archivos (opcional, solo si quieres que las imágenes sean públicas)
-- CREATE POLICY "Acceso público para ver archivos" ON storage.objects
-- FOR SELECT TO public
-- USING (bucket_id = 'TecnoCarlos');

-- Verificar que las políticas se crearon correctamente
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage';
