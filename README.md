# Ocelotl Studio — Sitio Web Oficial

> Estudio de desarrollo de aplicaciones, ingeniería de software y tecnología con sede en el **Estado de Guerrero, México**.  
> Dominio oficial: [ocelotl.studio](https://ocelotl.studio)

---

## Identidad & Filosofía

**Ocelotl Studio** fusiona la fuerza, perseverancia y agilidad del *Ocelotl* (símbolo ancestral guerrerense) con la vanguardia del desarrollo tecnológico internacional.

- **Proyecto Insignia:** [Kronex Academic OS](https://kronexacademic.com) — Sistema operativo académico personal para estudiantes.
- **Origen:** Guerrero, México.
- **Enfoque:** Apps móviles (iOS/Android), aplicaciones web escalables, arquitecturas cloud e investigación y desarrollo (I+D).

---

## 🛠️ Estructura del Proyecto

```text
Ocelotl/
├── index.html        # Página principal accesible, moderna y responsiva
├── styles.css        # Sistema de diseño (paleta obsidiana + oro azteca + jade guerrerense)
├── script.js         # Interactividad (navbar, tab de Kronex, consola interactiva)
├── vercel.json       # Configuración para despliegue automático en Vercel
├── package.json      # Scripts de desarrollo y previsualización
├── assets/           # Logotipos vectorizados, favicons e imágenes
│   ├── logo-gold.png
│   ├── logo-white.png
│   ├── favicon.png
│   ├── jaguar-icon-gold.png
│   └── kronex/       # Capturas reales de Kronex Academic OS
└── DEPLOYMENT.md     # Guía paso a paso para enlazar con Name.com
```

---

## 🚀 Cómo probarlo localmente

Puedes probar la página en cualquier navegador o dispositivo de tu red local:

```bash
# Opción 1: Con Python (sin instalar nada extra)
python3 -m http.server 3000

# Opción 2: Con Node / npx
npx serve . -p 3000
```

Luego abre en tu navegador:
`http://localhost:3000`

Para verlo desde tu celular en la misma red Wi-Fi:
`http://TU_IP_LOCAL:3000` (Ej. `http://192.168.1.15:3000`)

---

## 🌐 Cómo publicarlo con tu dominio ocelotl.studio (Name.com)

Consulta la guía completa en [DEPLOYMENT.md](DEPLOYMENT.md).
