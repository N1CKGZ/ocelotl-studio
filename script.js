/**
 * Ocelotl Studio Interactive Engine
 * Handles navigation, interactive device showcase, and terminal emulator
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initKronexShowcase();
  initInteractiveTerminal();
  initYear();
});

/* --------------------------------------------------------------------------
   Navbar & Mobile Menu
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  // Sticky blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   Kronex Phone Mockup Tab Switcher
   -------------------------------------------------------------------------- */
function initKronexShowcase() {
  const tabs = document.querySelectorAll('.phone-tab');
  const imgToday = document.getElementById('kronexImgToday');
  const imgSchedule = document.getElementById('kronexImgSchedule');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const screen = tab.dataset.screen;
      if (screen === 'today') {
        imgToday.classList.add('active');
        imgSchedule.classList.remove('active');
      } else {
        imgSchedule.classList.add('active');
        imgToday.classList.remove('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Interactive Studio Terminal Console
   -------------------------------------------------------------------------- */
function initInteractiveTerminal() {
  const input = document.getElementById('terminalInput');
  const log = document.getElementById('terminalLog');
  const screen = document.getElementById('terminalScreen');
  const shortcutButtons = document.querySelectorAll('.cmd-pill');

  if (!input || !log) return;

  const commands = {
    help: `
Comandos disponibles:
  <span class="t-cmd-highlight">kronex</span>     - Conocer detalles de Kronex Academic OS
  <span class="t-cmd-highlight">origen</span>     - Historia y raíces guerrerenses del estudio
  <span class="t-cmd-highlight">servicios</span>  - Nuestras capacidades de desarrollo
  <span class="t-cmd-highlight">stack</span>      - Tecnologías y herramientas que dominamos
  <span class="t-cmd-highlight">contacto</span>   - Formas de comunicarte con los fundadores
  <span class="t-cmd-highlight">clear</span>      - Limpiar la pantalla de la consola
`,
    kronex: `
🚀 <strong style="color:#38BDF8;">Kronex Academic OS:</strong>
App insignia creada por Ocelotl Studio para optimizar la vida académica de estudiantes.
• Escaneo de horarios físicos por cámara con IA (KRON).
• Dashboard "Hoy" con clases y tareas inmediatas.
• Calendario integral y recordatorios proactivos.
🌐 Sitio web oficial: <a href="https://kronexacademic.com" target="_blank" style="color:#38BDF8;text-decoration:underline;">kronexacademic.com</a>
📦 Beta APK: <a href="https://github.com/N1CKGZ/kronex-releases" target="_blank" style="color:#38BDF8;text-decoration:underline;">github.com/N1CKGZ/kronex-releases</a>
`,
    origen: `
🐆 <strong style="color:#F5B037;">Nuestras Raíces:</strong>
Ocelotl Studio fue fundado por dos hermanos en el estado de Guerrero, México.
Inspirados en la figura del Ocelotl (el jaguar de Guerrero), construimos tecnología
con garra, perseverancia y arquitectura sin concesiones.
Demostramos con hechos que el software de clase mundial florece desde nuestra tierra.
`,
    guerrero: `
📍 <strong style="color:#10B981;">Estado de Guerrero, México:</strong>
Tierra de historia ancestral, riqueza artesanal y espíritu indomable.
En Ocelotl Studio llevamos el nombre de Guerrero a la vanguardia de la industria tecnológica.
`,
    servicios: `
🛠️ <strong style="color:#FCD34D;">Servicios de Desarrollo:</strong>
• 📱 Aplicaciones Móviles nativas y cross-platform (iOS & Android).
• 💻 Plataformas Web modernas, SaaS y PWA.
• ⚡ Arquitectura Cloud, APIs escalables y Microservicios.
• 🤖 Soluciones de IA, OCR, visión por computadora y automatización.
`,
    stack: `
💻 <strong style="color:#34D399;">Tech Stack Principal:</strong>
• Frontend: TypeScript, React, Next.js, Vite, Tailwind CSS, Modern Web APIs.
• Mobile: Flutter, Kotlin / Android, React Native.
• Backend: Node.js, Python, PostgreSQL, REST/GraphQL, Edge Functions.
• Infraestructura: Git, CI/CD, Docker, Cloudflare, Vercel, Supabase.
`,
    contacto: `
📬 <strong style="color:#F5B037;">Contacto Directo:</strong>
¿Tienes una consulta o propuesta de desarrollo?
• Correo / Web: <a href="https://ocelotl.studio" style="color:#FCD34D;">ocelotl.studio</a>
• Proyecto: <a href="https://kronexacademic.com" target="_blank" style="color:#FCD34D;">kronexacademic.com</a>
• O completa el formulario al final de la página para respuesta inmediata.
`,
    sudo: `
🔒 ¡Acceso concedido! Pero recuerda: «Con gran poder en el código, viene gran responsabilidad».
`,
    clear: '__CLEAR__'
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      log.innerHTML = `
        <p class="t-output-system">🐆 Ocelotl Studio Interactive Console v1.0.0 (Guerrero, MX)</p>
        <p class="t-output-system">Escribe <span class="t-cmd-highlight">help</span> para consultar información.</p>
        <br>
      `;
      return;
    }

    // Echo command
    const echoEl = document.createElement('div');
    echoEl.className = 't-command-echo';
    echoEl.innerHTML = `ocelotl ➜ ~ $ <span>${escapeHtml(rawCmd)}</span>`;
    log.appendChild(echoEl);

    // Result
    const resEl = document.createElement('div');
    resEl.className = 't-command-result';

    if (commands[cmd]) {
      resEl.innerHTML = commands[cmd];
    } else {
      resEl.innerHTML = `<span style="color:#EF4444;">Comando no reconocido: "${escapeHtml(rawCmd)}". Escribe <strong class="t-cmd-highlight">help</strong> para ver la lista de comandos.</span>`;
    }

    log.appendChild(resEl);
    screen.scrollTop = screen.scrollHeight;
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(input.value);
      input.value = '';
    }
  });

  shortcutButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const command = btn.dataset.command;
      input.value = command;
      executeCommand(command);
      input.value = '';
      input.focus();
    });
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/* --------------------------------------------------------------------------
   Contact Form Handler
   -------------------------------------------------------------------------- */
function handleContactSubmit() {
  const name = document.getElementById('nameInput').value.trim();
  const email = document.getElementById('emailInput').value.trim();
  const type = document.getElementById('projectType').value;
  const message = document.getElementById('messageInput').value.trim();
  const feedback = document.getElementById('formFeedback');
  const btn = document.getElementById('btnSubmitContact');

  if (!name || !email || !message) return;

  btn.disabled = true;
  btn.innerHTML = `<span>Enviando mensaje...</span>`;

  // Simulating instant professional submission
  setTimeout(() => {
    feedback.className = 'form-feedback success';
    feedback.style.display = 'block';
    feedback.innerHTML = `
      <strong>¡Gracias, ${escapeHtml(name)}!</strong><br>
      Hemos recibido tu mensaje sobre <em>${escapeHtml(type || 'tu consulta')}</em>.
      Los fundadores de Ocelotl Studio te responderemos a <strong>${escapeHtml(email)}</strong> a la brevedad.
    `;

    document.getElementById('contactForm').reset();
    btn.disabled = false;
    btn.innerHTML = `
      <span>Mensaje Enviado ✓</span>
    `;

    setTimeout(() => {
      btn.innerHTML = `
        <span>Enviar Otro Mensaje</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      `;
    }, 4000);
  }, 700);
}

/* --------------------------------------------------------------------------
   Dynamic Year
   -------------------------------------------------------------------------- */
function initYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
