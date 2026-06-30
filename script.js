// =============================================
//   ABHISHEK SHARMA — PORTFOLIO SCRIPT.JS
// =============================================

document.addEventListener("DOMContentLoaded", () => {

  // ── 1. ACTIVE NAV LINK ──────────────────────
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // ── 2. FADE-IN HEADINGS (Intersection Observer) ──
  const headings = document.querySelectorAll("h1, h2, h3, .fade-in");
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  headings.forEach(el => {
    el.classList.add("fade-target");
    fadeObserver.observe(el);
  });

  // ── 3. SLIDE-UP ANIMATION FOR CARDS / VIDEOS ──
  const slideEls = document.querySelectorAll(".slide-up");
  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("slide-visible");
        slideObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  slideEls.forEach(el => slideObserver.observe(el));

  // ── 4. TYPEWRITER ANIMATION ──────────────────
  function typeWriter(el, text, speed = 40) {
    el.textContent = "";
    el.style.opacity = 1;
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
        el.classList.remove("typing-cursor");
      }
    }, speed);
  }

  const typeTargets = document.querySelectorAll(".typewriter");
  const typeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.typed) {
        entry.target.dataset.typed = "true";
        const original = entry.target.dataset.text || entry.target.textContent;
        entry.target.dataset.text = original;
        entry.target.classList.add("typing-cursor");
        typeWriter(entry.target, original);
        typeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  typeTargets.forEach(el => {
    el.dataset.text = el.textContent;
    el.textContent = "";
    el.style.opacity = 0;
    typeObserver.observe(el);
  });

  // ── 5. GLOW HIGHLIGHT PULSE ──────────────────
  // Randomly pulse glow words every few seconds
  const glowWords = document.querySelectorAll(".glow");
  setInterval(() => {
    glowWords.forEach(gw => {
      gw.classList.add("glow-pulse");
      setTimeout(() => gw.classList.remove("glow-pulse"), 1200);
    });
  }, 3500);

  // ── 6. NAV HAMBURGER (mobile) ────────────────
  const hamburger = document.getElementById("hamburger");
  const navMenu   = document.getElementById("nav-menu");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      hamburger.classList.toggle("open");
    });
  }

  // ── 7. SMOOTH SCROLL ─────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ── 8. VIDEO CARD HOVER TILT ─────────────────
  document.querySelectorAll(".video-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(600px) rotateY(0) rotateX(0) translateY(0)";
    });
  });

  // ── 9. SCROLL PROGRESS BAR ───────────────────
  const bar = document.createElement("div");
  bar.id = "scroll-bar";
  bar.style.cssText = `
    position:fixed; top:0; left:0; height:3px; width:0%;
    background:linear-gradient(90deg,#00c6ff,#0072ff);
    z-index:9999; transition:width 0.1s linear;
    box-shadow: 0 0 8px #00c6ff;
  `;
  document.body.prepend(bar);
  window.addEventListener("scroll", () => {
    const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = scrolled + "%";
  });

});
