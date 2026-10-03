/**
 * Ocelotl Studio Interactive Engine
 * Handles navigation, interactive device showcase, and developer console
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
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   Kronex Phone Mockup Tab Switcher
   -------------------------------------------------------------------------- */
function initKronexShowcase() {
  const tabs = document.querySelectorAll('.switcher-btn');
  const imgToday = document.getElementById('kronexImgToday');
  const imgSchedule = document.getElementById('kronexImgSchedule');

  if (!tabs.length || !imgToday || !imgSchedule) return;

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
   Interactive Developer Console
   -------------------------------------------------------------------------- */
function initInteractiveTerminal() {
  const input = document.getElementById('terminalInput');
  const log = document.getElementById('terminalLog');
  const screen = document.getElementById('terminalScreen');
  const actionButtons = document.querySelectorAll('.terminal-action-btn');

  if (!input || !log) return;

  const commands = {
    help: `
Comandos disponibles:
  <span class="highlight-cmd">kronex</span>     - Especificaciones y arquitectura de Kronex Academic OS
  <span class="highlight-cmd">origen</span>     - Fundación y sede en el estado de Guerrero, México
  <span class="highlight-cmd">servicios</span>  - Capacidades de ingeniería móvil, web y cloud
  <span class="highlight-cmd">stack</span>      - Herramientas y tecnologías de producción
  <span class="highlight-cmd">contacto</span>   - Vías formales de comunicación institucional
  <span class="highlight-cmd">clear</span>      - Limpiar la salida de la consola
`,
    kronex: `
[KRONEX ACADEMIC OS // CASO DE ESTUDIO]
Plataforma académica integral desarrollada por Ocelotl Studio.
• Visión por computadora: Digitalización óptica de horarios físicos.
• Motor KRON: Análisis contextual y recomendaciones en tiempo real.
• Persistencia: Arquitectura offline-first con sincronización asíncrona.
Sitio web oficial: <a href="https://kronexacademic.com" target="_blank" style="color:#60A5FA;text-decoration:underline;">kronexacademic.com</a>
Repositorio de releases: <a href="https://github.com/N1CKGZ/kronex-releases" target="_blank" style="color:#60A5FA;text-decoration:underline;">github.com/N1CKGZ/kronex-releases</a>
`,
    origen: `
[ORIGEN & SEDE]
Ocelotl Studio es un estudio de desarrollo de software y arquitectura digital con sede en el estado de Guerrero, México.
Bajo una filosofía de rigor técnico y autonomía, el estudio diseña sistemas de alto desempeño
para el ecosistema local y global sin desvincularse de sus raíces territoriales.
`,
    servicios: `
[DISCIPLINAS DE INGENIERÍA]
• Mobile Engineering: Aplicaciones nativas y multiplataforma (iOS & Android).
• Web & SaaS Platforms: Portales y arquitecturas frontend optimizadas.
• Cloud & API Infrastructure: Microservicios, PostgreSQL, Redis, Edge Computing.
• Applied Research & AI: Integración de OCR, LLMs y automatización de flujos.
`,
    stack: `
[TECNOLOGÍAS DE PRODUCCIÓN]
• Frontend / Mobile: TypeScript, React, Next.js, Vite, Flutter, Kotlin.
• Backend: Node.js, Python, PostgreSQL, REST / GraphQL, Supabase, Edge Functions.
• Infraestructura: Git, CI/CD Pipelines, Vercel, Cloudflare, Docker.
`,
    contacto: `
[CANALES DE COMUNICACIÓN]
• Sitio oficial: <a href="https://ocelotl.studio" style="color:#E5C07B;">ocelotl.studio</a>
• Proyecto Kronex: <a href="https://kronexacademic.com" target="_blank" style="color:#60A5FA;">kronexacademic.com</a>
• Formulario: Puedes enviar tus requerimientos mediante la sección de contacto al final de la página.
`,
    clear: '__CLEAR__'
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      log.innerHTML = `
        <p class="log-system">Ocelotl Studio Developer Console [Version 1.0.4 - Guerrero, MX]</p>
        <p class="log-system">Escribe <span class="highlight-cmd">help</span> para consultar información.</p>
        <br>
      `;
      return;
    }

    // Echo command
    const echoEl = document.createElement('div');
    echoEl.className = 'log-echo';
    echoEl.innerHTML = `guest@ocelotl:~$ <span>${escapeHtml(rawCmd)}</span>`;
    log.appendChild(echoEl);

    // Result
    const resEl = document.createElement('div');
    resEl.className = 'log-result';

    if (commands[cmd]) {
      resEl.innerHTML = commands[cmd];
    } else {
      resEl.innerHTML = `<span style="color:#EF4444;">Comando no reconocido: "${escapeHtml(rawCmd)}". Escribe <strong class="highlight-cmd">help</strong> para ver la lista de comandos disponibles.</span>`;
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

  actionButtons.forEach(btn => {
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
  btn.innerHTML = `<span>Procesando consulta...</span>`;

  setTimeout(() => {
    feedback.className = 'form-alert success';
    feedback.style.display = 'block';
    feedback.innerHTML = `
      <strong>Consulta transmitida con éxito.</strong><br>
      Apreciamos tu mensaje, ${escapeHtml(name)}. Un miembro del equipo de ingeniería se pondrá en contacto contigo a través de <strong>${escapeHtml(email)}</strong>.
    `;

    document.getElementById('contactForm').reset();
    btn.disabled = false;
    btn.innerHTML = `<span>Consulta Transmitida</span>`;

    setTimeout(() => {
      btn.innerHTML = `
        <span>Transmitir Consulta</span>
        <svg class="icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      `;
    }, 4000);
  }, 600);
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
