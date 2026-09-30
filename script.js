// WattWise — shared script for the 3-page version
// Highlights whichever nav link matches the current page, and keeps
// the footer year current. Actual navigation is handled by normal
// <a href="..."> links between index.html, televisions.html and about.html.

(function () {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Get just the filename part of the current URL, defaulting to
  // index.html when the path ends in a slash (e.g. hosted at a domain root).
  const currentFile = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-link").forEach((link) => {
    const linkFile = link.getAttribute("href");
    const isCurrent = linkFile === currentFile;

    link.classList.toggle("active", isCurrent);
    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
})();

// Click-to-enlarge lightbox for chart images (only affects the
// Televisions page, since only it has .chart-image elements)
(function () {
  const chartImages = document.querySelectorAll(".chart-image");
  if (!chartImages.length) return;

  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  const bigImg = document.createElement("img");
  bigImg.className = "lightbox-img";
  overlay.appendChild(bigImg);
  document.body.appendChild(overlay);

  function openLightbox(src, alt) {
    bigImg.src = src;
    bigImg.alt = alt;
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  chartImages.forEach((img) => {
    img.addEventListener("click", () => openLightbox(img.src, img.alt));
  });

  overlay.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
})();