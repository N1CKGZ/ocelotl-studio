/**
 * Ocelotl Studio Interactive Engine
 * Handles navigation, interactive device showcase, code manifest typing animation, and developer console
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initKronexShowcase();
  initManifestTypingAnimation();
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
  const menuBackdrop = document.getElementById('menuBackdrop');

  // Sticky blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  function closeMenu() {
    if (!navMenu || !mobileToggle) return;
    mobileToggle.classList.remove('active');
    navMenu.classList.remove('open');
    if (menuBackdrop) menuBackdrop.classList.remove('active');
    document.body.classList.remove('menu-open');
    mobileToggle.setAttribute('aria-expanded', 'false');
  }

  function openMenu() {
    if (!navMenu || !mobileToggle) return;
    mobileToggle.classList.add('active');
    navMenu.classList.add('open');
    if (menuBackdrop) menuBackdrop.classList.add('active');
    document.body.classList.add('menu-open');
    mobileToggle.setAttribute('aria-expanded', 'true');
  }

  // Mobile toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (menuBackdrop) {
      menuBackdrop.addEventListener('click', closeMenu);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMenu();
      }
    });

    // Close menu when clicking any link inside nav
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Auto-close menu if resizing to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
        closeMenu();
      }
    }, { passive: true });
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
   Technical Manifest Code Typing Animation
   -------------------------------------------------------------------------- */
function initManifestTypingAnimation() {
  const codeBlock = document.getElementById('manifestCodeBlock');
  const metrics = document.getElementById('manifestMetrics');
  const dashboard = document.querySelector('.hero-dashboard');

  if (!codeBlock || !dashboard) return;

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    if (metrics) metrics.classList.add('revealed');
    return;
  }

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const manifestRows = [
    {
      isIndent: false,
      tokens: [
        { text: "const ", className: "token-keyword" },
        { text: "studioManifest", className: "token-variable" },
        { text: " = {" }
      ]
    },
    {
      isIndent: true,
      tokens: [
        { text: "entity: ", className: "token-property" },
        { text: '"Ocelotl Studio"', className: "token-string" },
        { text: "," }
      ]
    },
    {
      isIndent: true,
      tokens: [
        { text: "origin: ", className: "token-property" },
        { text: '"Estado de Guerrero, México"', className: "token-string" },
        { text: "," }
      ]
    },
    {
      isIndent: true,
      tokens: [
        { text: "focus: ", className: "token-property" },
        { text: '"Digital Architecture & High Performance Software"', className: "token-string" },
        { text: "," }
      ]
    },
    {
      isIndent: true,
      tokens: [
        { text: "coreDisciplines: ", className: "token-property" },
        { text: "[" },
        { text: '"Mobile Engineering"', className: "token-string" },
        { text: ", " },
        { text: '"Cloud Architecture"', className: "token-string" },
        { text: ", " },
        { text: '"Applied AI"', className: "token-string" },
        { text: "]," }
      ]
    },
    {
      isIndent: true,
      tokens: [
        { text: "flagshipSystem: ", className: "token-property" },
        { text: '"Kronex Academic OS"', className: "token-link", href: "https://kronexacademic.com" },
        { text: "," }
      ]
    },
    {
      isIndent: true,
      tokens: [
        { text: "engineeringStandard: ", className: "token-property" },
        { text: '"High Concurrency & Zero Technical Debt"', className: "token-accent" }
      ]
    },
    {
      isIndent: false,
      tokens: [
        { text: "};" }
      ]
    }
  ];

  let hasStarted = false;

  async function startTyping() {
    if (hasStarted) return;
    hasStarted = true;

    // Clear existing static HTML
    codeBlock.innerHTML = '';

    // Create cursor element
    const cursor = document.createElement('span');
    cursor.className = 'manifest-cursor';
    cursor.setAttribute('aria-hidden', 'true');

    for (const row of manifestRows) {
      const p = document.createElement('p');
      p.className = `code-row ${row.isIndent ? 'code-indent' : ''}`;
      codeBlock.appendChild(p);

      // Append cursor to current line
      p.appendChild(cursor);

      for (const token of row.tokens) {
        let targetEl;
        if (token.href) {
          const a = document.createElement('a');
          a.href = token.href;
          a.target = '_blank';
          a.rel = 'noopener';
          const span = document.createElement('span');
          span.className = token.className || '';
          a.appendChild(span);
          p.insertBefore(a, cursor);
          targetEl = span;
        } else if (token.className) {
          const span = document.createElement('span');
          span.className = token.className;
          p.insertBefore(span, cursor);
          targetEl = span;
        } else {
          const span = document.createElement('span');
          p.insertBefore(span, cursor);
          targetEl = span;
        }

        // Type character by character
        for (let i = 0; i < token.text.length; i++) {
          targetEl.textContent += token.text[i];
          // Fast, precise technical cadence
          await wait(14);
        }
      }

      // Micro pause at line break
      await wait(35);
    }

    // Finished typing: Reveal metrics with subtle upward fade
    if (metrics) {
      await wait(120);
      metrics.classList.add('revealed');
    }

    // Keep cursor blinking softly then fade out after 2.5s
    setTimeout(() => {
      cursor.classList.add('fade-out');
      setTimeout(() => cursor.remove(), 600);
    }, 2500);
  }

  // Observe when the hero dashboard enters the viewport
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          observer.unobserve(dashboard);
          startTyping();
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -20px 0px'
    });

    observer.observe(dashboard);
  } else {
    // Fallback for older browsers
    startTyping();
  }
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
  <span class="highlight-cmd">ocelotl</span>    - Significado ancestral y símbolo del jaguar de Guerrero
  <span class="highlight-cmd">kronex</span>     - Especificaciones y arquitectura de Kronex Academic OS
  <span class="highlight-cmd">origen</span>     - Fundación y sede en el estado de Guerrero, México
  <span class="highlight-cmd">creadores</span>  - Autoría: Nicolas Godinez Santana & Eduardo Godinez Santana
  <span class="highlight-cmd">servicios</span>  - Capacidades de ingeniería móvil, web y cloud
  <span class="highlight-cmd">stack</span>      - Herramientas y tecnologías de producción
  <span class="highlight-cmd">contacto</span>   - Vías formales de comunicación institucional
  <span class="highlight-cmd">clear</span>      - Limpiar la salida de la consola
`,
    ocelotl: `
[HERENCIA & SIGNIFICADO: OCĒLŌTL]
Etimología náhuatl: ocēlōtl [oːˈseːloːt͡ɬ] • Jaguar (Panthera onca).
El jaguar es el animal más representativo, reverenciado y sagrado del estado de Guerrero.
En la cosmovisión ancestral, sus manchas representan las constelaciones reflejadas en la noche.
Simboliza la visión penetrante donde otros solo ven penumbra, la paciencia estratégica
que precede a la acción y la fuerza indomable de un territorio que jamás retrocede.
En Ocelotl Studio, ese espíritu forja nuestra ingeniería: precisión matemática, código limpio y rendimiento extremo.
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
    creadores: `
[AUTORÍA & DIRECCIÓN DE INGENIERÍA]
• Creadores: Nicolas Godinez Santana • Eduardo Godinez Santana.
• Raíces: Orgullosos del estado de Guerrero.
• Misión: Forjar tecnología y software de estándar internacional desde el estado de Guerrero, México.
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
      if (window.innerWidth > 768) {
        input.focus();
      }
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
