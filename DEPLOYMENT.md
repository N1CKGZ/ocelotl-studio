# 🚀 Guía de Despliegue: Cómo levantar ocelotl.studio

Esta guía te explica cómo publicar tu sitio web para que cualquier persona en el mundo pueda entrar a **`https://ocelotl.studio`** desde su teléfono, computadora o tablet, y cómo conectar el dominio que compraste en **Name.com**.

---

## ⚡ Método Recomendado: Despliegue Gratuito en Vercel (2 minutos)

Vercel es la mejor opción para este tipo de sitios: ofrece hosting global de alta velocidad (CDN), certificados SSL HTTPS automáticos y gratuitos, y se conecta directamente con tu dominio `ocelotl.studio`.

### Paso 1: Subir tu código a GitHub
1. Si aún no lo has hecho, crea un repositorio en GitHub (puede ser público o privado), por ejemplo: `ocelotl-studio`.
2. En tu terminal, dentro de la carpeta del proyecto, ejecuta:
   ```bash
   git init
   git add .
   git commit -m "Initial release Ocelotl Studio"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/ocelotl-studio.git
   git push -u origin main
   ```

### Paso 2: Importar en Vercel
1. Entra a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **"Add New..."** ➔ **"Project"**.
3. Selecciona tu repositorio `ocelotl-studio` y presiona **"Deploy"**.
4. En cuestión de 30 segundos, Vercel te dará un enlace temporal como `ocelotl-studio.vercel.app` que ya funciona en cualquier dispositivo.

---

## 🌐 Paso 3: Conectar tu dominio `ocelotl.studio` en Name.com

En tu panel de Name.com (el que mostraste en tu captura de pantalla):

1. **En Vercel**:
   - Ve a tu proyecto ➔ **Settings** ➔ **Domains**.
   - Escribe `ocelotl.studio` y haz clic en **Add**.
   - Vercel te mostrará los registros DNS que necesitas configurar. Generalmente son:
     - **Registro A**: Nombre `@` que apunta a `76.76.21.21`
     - **Registro CNAME**: Nombre `www` que apunta a `cname.vercel-dns.com`

2. **En Name.com**:
   - En la pantalla de tu dominio `ocelotl.studio`, haz clic en el botón verde: **"Manage DNS Records"** (como se ve en la captura).
   - Agrega los siguientes registros:
     - **Tipo:** `A`  
       **Host:** `@` (o déjalo en blanco si Name.com lo pide así)  
       **Answer / IP:** `76.76.21.21`  
       **TTL:** `300`  
       ➔ Presiona **Add Record**.
     - **Tipo:** `CNAME`  
       **Host:** `www`  
       **Answer:** `cname.vercel-dns.com`  
       **TTL:** `300`  
       ➔ Presiona **Add Record**.

3. **¡Listo!**:
   - La propagación de DNS tarda entre 5 minutos y un par de horas.
   - Una vez propagado, entrar a `ocelotl.studio` o `www.ocelotl.studio` abrirá de inmediato tu página con candado verde SSL (HTTPS).

---

## 📲 Opción Inmediata: Probar en tu celular ahora mismo (Red Local)

Si quieres verla ya mismo en tu teléfono sin subirla aún a internet:

1. Asegúrate de que tu computadora y tu celular estén conectados a la misma red Wi-Fi.
2. En tu terminal en la Mac:
   ```bash
   cd /Users/eduardo_gdz/Documents/NICK/Ocelotl
   npx serve . -p 3000
   ```
3. El comando te mostrará una dirección de red local parecida a:
   `http://192.168.1.XX:3000`
4. Abre Safari o Chrome en tu celular y escribe esa dirección IP. ¡Verás tu página funcionando con animaciones, el teléfono interactivo de Kronex y la terminal!
