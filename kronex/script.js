/**
 * Kronex Academic OS — Case Study Script Engine
 * Developed by Ocelotl Studio
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTourTabs();
  initCopyChecksum();
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

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMenu();
      }
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
        closeMenu();
      }
    }, { passive: true });
  }
}

/* --------------------------------------------------------------------------
   Interactive Product Tour Tab Switcher
   -------------------------------------------------------------------------- */
function initTourTabs() {
  const tabs = document.querySelectorAll('.tour-tab-btn');
  const images = document.querySelectorAll('.tour-screen-img');
  const panes = document.querySelectorAll('.tour-pane-item');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetScreen = tab.dataset.screen;

      // Update tab active states
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update image
      images.forEach(img => {
        if (img.dataset.screen === targetScreen) {
          img.classList.add('active');
        } else {
          img.classList.remove('active');
        }
      });

      // Update info pane
      panes.forEach(pane => {
        if (pane.dataset.screen === targetScreen) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   Copy Checksum Helper
   -------------------------------------------------------------------------- */
function initCopyChecksum() {
  const btn = document.getElementById('btnCopyChecksum');
  const hashText = document.getElementById('checksumValue');

  if (!btn || !hashText) return;

  btn.addEventListener('click', async () => {
    const textToCopy = hashText.textContent.trim();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const temp = document.createElement('textarea');
        temp.value = textToCopy;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }

      const originalText = btn.textContent;
      btn.textContent = '¡Copiado!';
      btn.style.background = '#31D4C1';
      btn.style.color = '#051A20';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
      }, 2500);
    } catch (err) {
      console.warn('Could not copy hash:', err);
    }
  });
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
