document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector("nav");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const serviceCards = document.querySelectorAll(".service-card");
  const elementsToFade = document.querySelectorAll(
    ".fade-in, .fade-left, .fade-right"
  );
  const cards = document.querySelectorAll(".fade-in-up");
  const slider = document.getElementById("cardSlider");
  const prev = document.getElementById("prevBtn");
  const next = document.getElementById("nextBtn");

  // ======== recharge ======

  // Loader - disparition après chargement complet
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.classList.add("hidden");
    }
  });

  // ==== NAV SCROLL EFFECT ====
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 50);
  });

  // ==== MENU TOGGLE ====
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      navLinks.classList.toggle("show"); // support legacy class
    });
  }

  // ==== SLIDER NAVIGATION ====
  const scrollAmount = 500;
  if (slider && prev && next) {
    prev.addEventListener("click", () => {
      if (slider.scrollLeft === 0) {
        slider.scrollLeft = slider.scrollWidth;
      } else {
        slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
      pauseAutoScroll();
    });

    next.addEventListener("click", () => {
      if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 5) {
        slider.scrollLeft = 0;
      } else {
        slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
      pauseAutoScroll();
    });

    // ==== AUTO SCROLL LOOP ====
    let autoScrollInterval;
    let autoScrollPaused = false;
    let resumeTimeout;

    function scrollNext() {
      if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 5) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }

    function startAutoScroll() {
      autoScrollInterval = setInterval(scrollNext, 5000);
    }

    function pauseAutoScroll() {
      if (!autoScrollPaused) {
        clearInterval(autoScrollInterval);
        autoScrollPaused = true;
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => {
          startAutoScroll();
          autoScrollPaused = false;
        }, 10000);
      }
    }

    startAutoScroll();
    slider.addEventListener("mouseenter", pauseAutoScroll);
    slider.addEventListener("touchstart", pauseAutoScroll);
  }

  // ==== FADE-IN OBSERVER ====
  const fadeObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  elementsToFade.forEach((el) => fadeObserver.observe(el));

  // ==== FADE-IN-UP (liens utiles) ====
  function showCardsOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;
    const cards = document.querySelectorAll(".fade-in-up");
    cards.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < triggerBottom) card.classList.add("visible");
    });
  }

  window.addEventListener("scroll", showCardsOnScroll);
  window.addEventListener("load", showCardsOnScroll);

  // ==== SERVICE CARD ENTRÉE ====
  const serviceCardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          entry.target.style.transition = "all 0.8s ease-out";
          serviceCardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  serviceCards.forEach((card) => serviceCardObserver.observe(card));
});

// Scroll fluide sur tous les liens ancrés (avec offset si header fixe)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = 80; // hauteur du header
      const top = target.offsetTop - offset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  });
});

// Accordéon Terme d'utilisation
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    item.classList.toggle('active');
  });
});
