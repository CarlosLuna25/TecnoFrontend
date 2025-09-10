# Configuración de Supabase Storage

## Problema: Error 403 "new row violates row-level security policy"

Este error ocurre porque Supabase Storage tiene políticas de seguridad (RLS) habilitadas por defecto y necesitamos configurar las políticas correctas para permitir la subida de archivos.

## Solución: Configurar políticas de Storage

### Opción 1: Ejecutar el script SQL (Recomendado)

1. **Ve al SQL Editor** en tu dashboard de Supabase
2. **Ejecuta el archivo** `09_setup_storage_policies.sql`
3. **Verifica** que las políticas se crearon correctamente

### Opción 2: Configuración manual en el Dashboard

#### Paso 1: Crear el Bucket

1. Ve a **Storage** en el sidebar de Supabase
2. Haz clic en **"Create bucket"**
3. Nombre del bucket: `TecnoCarlos`
4. Marca **"Public bucket"** ✅
5. Haz clic en **"Create bucket"**

#### Paso 2: Configurar Políticas RLS

1. En Storage, haz clic en el bucket **"TecnoCarlos"**
2. Ve a la pestaña **"Policies"**
3. Haz clic en **"New policy"**

#### Crear las siguientes políticas:

**1. Política de INSERT (Subir archivos):**

```sql
CREATE POLICY "Usuarios autenticados pueden subir archivos" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'TecnoCarlos');
```

**2. Política de SELECT (Ver archivos):**

```sql
CREATE POLICY "Usuarios autenticados pueden ver archivos" ON storage.objects
FOR SELECT TO authenticated
USING (bucket_id = 'TecnoCarlos');
```

**3. Política de UPDATE (Actualizar archivos):**

```sql
CREATE POLICY "Usuarios autenticados pueden actualizar archivos" ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'TecnoCarlos')
WITH CHECK (bucket_id = 'TecnoCarlos');
```

**4. Política de DELETE (Eliminar archivos):**

```sql
CREATE POLICY "Usuarios autenticados pueden eliminar archivos" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'TecnoCarlos');
```

## Verificación

Después de configurar las políticas, deberías ver:

1. **En Storage > TecnoCarlos > Policies:**

   - 4 políticas activas para usuarios autenticados
   - Permisos para INSERT, SELECT, UPDATE, DELETE

2. **Al subir una imagen:**
   - La subida debería funcionar sin errores 403
   - La imagen debería aparecer en el bucket
   - La URL pública debería generarse correctamente

## Estructura de archivos en Storage

Los archivos se organizan de la siguiente manera:

```
TecnoCarlos/
└── client-images/
    ├── 1703123456789-abc123.jpg
    ├── 1703123457890-def456.png
    └── ...
```

- **Carpeta:** `client-images/`
- **Nombres únicos:** `timestamp-random.extension`
- **Acceso público:** URLs directas a las imágenes

## Solución de problemas

### Si sigues viendo el error 403:

1. **Verifica autenticación:**

   - Asegúrate de que el usuario esté logueado
   - Verifica el token de sesión en las DevTools

2. **Revisa las políticas:**

   - Ve a Storage > Policies
   - Asegúrate de que las políticas estén activas
   - Verifica que el bucket_id sea correcto

3. **Verifica el bucket:**

   - Confirma que el bucket "TecnoCarlos" existe
   - Asegúrate de que sea público si quieres URLs públicas

4. **Revisa la consola:**
   - Abre las DevTools (F12)
   - Ve a la pestaña Console
   - Busca errores adicionales de Supabase

### Comandos útiles para debugging:

```sql
-- Ver todas las políticas de storage
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'objects' AND schemaname = 'storage';

-- Ver buckets existentes
SELECT * FROM storage.buckets;

-- Ver archivos en el bucket
SELECT * FROM storage.objects WHERE bucket_id = 'TecnoCarlos';
```

## Consideraciones de seguridad

- **Usuarios autenticados:** Solo usuarios logueados pueden subir/modificar archivos
- **Bucket público:** Las URLs son accesibles públicamente (recomendado para imágenes de perfil)
- **Límites de tamaño:** El componente limita a 5MB por archivo
- **Tipos de archivo:** Solo se permiten imágenes (JPG, PNG, GIF)

## Próximos pasos

Una vez configurado Storage, las imágenes de clientes se guardarán automáticamente y podrás:

1. ✅ Subir imágenes desde el formulario de cliente
2. ✅ Ver las imágenes en la lista de clientes
3. ✅ Hacer clic para ampliar las imágenes
4. ✅ Eliminar imágenes (se borra del storage automáticamente)
