// ===== MENÚ MÓVIL =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  // Cerrar menú al hacer click en un enlace
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', false);
    });
  });
}

// ===== ANIMACIÓN DE NÚMEROS (STATS) =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = Math.ceil(target / (duration / 16));
  let current = 0;

  const update = () => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      return;
    }
    el.textContent = current;
    requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
}

// Observar cuándo los números son visibles
const statNumbers = document.querySelectorAll('.stat-number');

if (statNumbers.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => observer.observe(el));
}

// ===== ANIMACIÓN DE TARJETAS AL ENTRAR EN VISTA =====
const cards = document.querySelectorAll('.card, .team-card');

if (cards.length > 0) {
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    cardObserver.observe(card);
  });
}

// ===== FORMULARIO DE CONTACTO =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm && formMessage) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre   = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email    = document.getElementById('email').value.trim();
    const asunto   = document.getElementById('asunto').value;
    const mensaje  = document.getElementById('mensaje').value.trim();

    // Validación básica
    if (!nombre || !apellido || !email || !asunto || !mensaje) {
      showMessage('Por favor completa todos los campos.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showMessage('Ingresa un correo electrónico válido.', 'error');
      return;
    }

    // Simular envío
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    setTimeout(() => {
      showMessage(`¡Gracias, ${nombre}! Tu mensaje fue enviado correctamente. Te contactaremos pronto.`, 'success');
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar mensaje';
    }, 1500);
  });
}

function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = `form-message ${type}`;
  formMessage.style.display = 'block';

  formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Ocultar después de 6 segundos
  setTimeout(() => {
    formMessage.style.display = 'none';
  }, 6000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== NAVBAR SHADOW AL HACER SCROLL =====
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.12)';
    } else {
      navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
    }
  }
});
