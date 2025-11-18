// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');

// Mobile Menu Toggle
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu?.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('active');
    navMenu?.classList.remove('active');
  });
});

// Navbar scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Add scrolled class for styling
  if (scrollTop > 50) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }

  lastScrollTop = scrollTop;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      const headerOffset = 80; // Height of fixed navbar
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  // Animate feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  // Animate steps
  const steps = document.querySelectorAll('.step');
  steps.forEach((step, index) => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(30px)';
    step.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
    observer.observe(step);
  });

  // Animate tech categories
  const techCategories = document.querySelectorAll('.tech-category');
  techCategories.forEach((category, index) => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(30px)';
    category.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
    observer.observe(category);
  });

  // Animate CTA section
  const ctaContent = document.querySelector('.cta-content');
  if (ctaContent) {
    ctaContent.style.opacity = '0';
    ctaContent.style.transform = 'scale(0.9)';
    ctaContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(ctaContent);
  }
});

// Counter animation for hero stats
const animateCounters = () => {
  const counters = document.querySelectorAll('.stat-number');

  counters.forEach(counter => {
    const target = parseInt(counter.textContent.replace(/\D/g, ''));
    let current = 0;
    const increment = target / 50; // Animate over 50 frames
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target + '+';
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current) + '+';
      }
    }, 40); // 40ms per frame for smooth animation
  });
};

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      heroObserver.unobserve(entry.target); // Only animate once
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  heroObserver.observe(heroStats);
}

// Progress bar animation
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressFill = entry.target.querySelector('.progress-fill');
      if (progressFill) {
        progressFill.style.animation = 'progressFill 2s ease-out forwards';
      }
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroCard = document.querySelector('.hero-card');
if (heroCard) {
  progressObserver.observe(heroCard);
}

// Parallax effect for hero background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;

  const hero = document.querySelector('.hero');
  if (hero && scrolled < hero.offsetHeight) {
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Tech items hover effect enhancement
document.querySelectorAll('.tech-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'translateY(-3px) scale(1.05)';
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translateY(-2px) scale(1)';
  });
});

// Feature cards enhanced hover effect
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-8px) rotate(1deg)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) rotate(0deg)';
  });
});

// Form validation (if contact form is added later)
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close mobile menu on escape
    hamburger?.classList.remove('active');
    navMenu?.classList.remove('active');
  }
});

// Focus management for accessibility
const trapFocus = (element) => {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
  );
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    }
  });
};

// Enhanced mobile menu accessibility
if (navMenu) {
  navMenu.setAttribute('role', 'navigation');
  navMenu.setAttribute('aria-label', 'Main navigation');

  hamburger?.addEventListener('click', () => {
    const isExpanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);

    if (isExpanded) {
      trapFocus(navMenu);
      navMenu.querySelector('.nav-link')?.focus();
    }
  });
}

// Lazy loading for images (if any are added later)
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Performance monitoring
const logPerformance = () => {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        console.log('DOM content loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart, 'ms');
      }, 0);
    });
  }
};

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  addCopyFunctionality();
  logPerformance();

  // Add loading state management
  document.body.classList.add('loaded');

  // Preload critical resources
  const preloadLinks = [
    'https://zaku-frontend.vercel.app/',
    'https://zaku.onrender.com/api/docs'
  ];

  preloadLinks.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
});

// Service worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Uncomment if you want to add PWA capabilities
    // navigator.serviceWorker.register('/sw.js')
    //     .then(registration => console.log('SW registered'))
    //     .catch(error => console.log('SW registration failed'));
  });
}

// Error handling
window.addEventListener('error', (e) => {
  console.error('JavaScript error:', e.error);
  // Could send error reports to analytics service
});

// Scroll to top functionality
const createScrollToTop = () => {
  const scrollButton = document.createElement('button');
  scrollButton.innerHTML = '<i class="ph ph-arrow-bend-right-up"></i>';
  scrollButton.className = 'scroll-to-top';
  scrollButton.setAttribute('aria-label', 'Scroll to top');
  scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 18px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

  document.body.appendChild(scrollButton);

  scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollButton.style.opacity = '1';
      scrollButton.style.visibility = 'visible';
    } else {
      scrollButton.style.opacity = '0';
      scrollButton.style.visibility = 'hidden';
    }
  });
};

// Initialize scroll to top button
createScrollToTop();
