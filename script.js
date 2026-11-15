/* ==========================================================================
   Lex Tributaria Indonesia — Interactive Reading & Citation Scripts
   Author: Revandino Afgan Alexa (Universitas Sebelas Maret)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const progressBar = document.getElementById("progressBar");

  // 1. Reading Progress Bar
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  // 2. Font Size Adjuster
  let currentFontRem = 1.075;
  const minFont = 0.925;
  const maxFont = 1.3;

  const applyFontSize = () => {
    root.style.setProperty("--body-font-size", `${currentFontRem.toFixed(3)}rem`);
  };

  document.getElementById("fontDecrease")?.addEventListener("click", () => {
    if (currentFontRem > minFont) {
      currentFontRem -= 0.05;
      applyFontSize();
    }
  });

  document.getElementById("fontReset")?.addEventListener("click", () => {
    currentFontRem = 1.075;
    applyFontSize();
  });

  document.getElementById("fontIncrease")?.addEventListener("click", () => {
    if (currentFontRem < maxFont) {
      currentFontRem += 0.05;
      applyFontSize();
    }
  });

  // 3. Dark / Light Reading Mode Toggle
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const themeLabel = document.getElementById("themeLabel");

  const savedTheme = localStorage.getItem("lex-theme");
  if (savedTheme === "dark") {
    root.setAttribute("data-theme", "dark");
    if (themeIcon) themeIcon.textContent = "☀️";
    if (themeLabel) themeLabel.textContent = "Mode Terang";
  }

  themeToggle?.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    const nextTheme = isDark ? "light" : "dark";
    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem("lex-theme", nextTheme);
    if (themeIcon) themeIcon.textContent = nextTheme === "dark" ? "☀️" : "🌙";
    if (themeLabel) themeLabel.textContent = nextTheme === "dark" ? "Mode Terang" : "Mode Gelap";
  });

  // 4. Print / Export PDF
  document.getElementById("printBtn")?.addEventListener("click", () => {
    window.print();
  });

  // 5. Mobile Table of Contents Collapsible
  const tocToggle = document.getElementById("tocToggle");
  const tocNav = document.getElementById("tocNav");
  const tocChevron = document.getElementById("tocChevron");

  tocToggle?.addEventListener("click", () => {
    const expanded = tocToggle.getAttribute("aria-expanded") === "true";
    tocToggle.setAttribute("aria-expanded", String(!expanded));
    if (tocNav) tocNav.style.display = expanded ? "none" : "block";
    if (tocChevron) tocChevron.textContent = expanded ? "▸" : "▾";
  });

  // 6. ScrollSpy for Table of Contents
  const sections = document.querySelectorAll(".article-section");
  const tocLinks = document.querySelectorAll(".toc-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          tocLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    {
      rootMargin: "-15% 0px -70% 0px",
      threshold: 0
    }
  );

  sections.forEach((sec) => observer.observe(sec));

  // 7. Academic Citation Format Switcher & Clipboard Copy
  const citations = {
    apa: `Alexa, R. A. (2026, 15 November). Rekonstruksi kepatuhan sukarela dan kepastian hukum dalam transformasi digital administrasi perpajakan Indonesia. Lex Tributaria Indonesia.`,
    chicago: `Alexa, Revandino Afgan. "Rekonstruksi Kepatuhan Sukarela dan Kepastian Hukum dalam Transformasi Digital Administrasi Perpajakan Indonesia." Lex Tributaria Indonesia, 15 November 2026.`,
    bibtex: `@article{alexa2026coretax,
  author  = {Alexa, Revandino Afgan},
  title   = {Rekonstruksi Kepatuhan Sukarela dan Kepastian Hukum dalam Transformasi Digital Administrasi Perpajakan Indonesia},
  journal = {Lex Tributaria Indonesia},
  note    = {Universitas Sebelas Maret},
  year    = {2026},
  month   = {November}
}`
  };

  const citationOutput = document.getElementById("citationOutput");
  const citeTabs = document.querySelectorAll(".cite-tab");
  const copyCitationBtn = document.getElementById("copyCitationBtn");
  const copyFeedback = document.getElementById("copyFeedback");

  citeTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      citeTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const format = tab.getAttribute("data-format");
      if (citationOutput && citations[format]) {
        citationOutput.textContent = citations[format];
      }
      if (copyFeedback) copyFeedback.textContent = "";
    });
  });

  copyCitationBtn?.addEventListener("click", async () => {
    if (!citationOutput) return;
    try {
      await navigator.clipboard.writeText(citationOutput.textContent);
      if (copyFeedback) copyFeedback.textContent = "✓ Sitasi berhasil disalin!";
      setTimeout(() => {
        if (copyFeedback) copyFeedback.textContent = "";
      }, 2500);
    } catch {
      if (copyFeedback) copyFeedback.textContent = "Silakan salin teks secara manual.";
    }
  });
});
