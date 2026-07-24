/**
 * Au Bon Cake — standalone chrome
 * Replaces the Wix header menu with a centered brand + juicy nav + CTA.
 */
(function () {
  var GALLERIES = [
    { href: "all.html", label: "All Galleries" },
    { href: "weddings.html", label: "Weddings" },
    { href: "bar-and-bat-mitzvah.html", label: "Bar & Bat Mitzvah" },
    { href: "babies.html", label: "Babies" },
    { href: "themed-cakes.html", label: "Themed Cakes" },
    { href: "for-him.html", label: "For Him" },
    { href: "for-her.html", label: "For Her" },
    { href: "for-boys.html", label: "For Boys" },
    { href: "for-girls.html", label: "For Girls" },
    { href: "is-that-a-cake.html", label: "Is that a cake?!" },
    { href: "minis.html", label: "Minis" },
    { href: "cookie.html", label: "Cookies" },
    { href: "graduation.html", label: "Graduation" }
  ];

  var SOCIAL = [
    { href: "https://www.instagram.com/au_bon_cake", label: "Instagram", icon: "./assets/images/icon-instagram.png" },
    { href: "https://www.facebook.com/AuBonCake/", label: "Facebook", icon: "./assets/images/icon-facebook.png" },
    { href: "https://www.youtube.com/channel/UCRS3adEPZszQvc88NfrNyqQ", label: "YouTube", icon: "./assets/images/icon-youtube.png" }
  ];

  function pageName() {
    var path = (location.pathname || "").split("/").pop() || "index.html";
    return path === "" ? "index.html" : path;
  }

  function isActive(href) {
    var page = pageName();
    if (href === "index.html") return page === "index.html" || page === "";
    return page === href;
  }

  function logoSrc() {
    var img = document.querySelector('#SITE_HEADER img[src*="logo-au-bon-cake"], img[src*="logo-au-bon-cake"]');
    return (img && img.getAttribute("src")) || "./assets/images/logo-au-bon-cake.png";
  }

  function buildChrome() {
    if (document.getElementById("abc-site-chrome")) return;

    var page = pageName();
    var galleryActive = GALLERIES.some(function (g) { return g.href === page; });
    var galleryItems = GALLERIES.map(function (g) {
      return '<a href="' + g.href + '"' + (isActive(g.href) ? ' class="is-active"' : "") + ">" + g.label + "</a>";
    }).join("");

    var socialItems = SOCIAL.map(function (s) {
      return '<a href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + s.label + '">' +
        '<img src="' + s.icon + '" alt="" width="22" height="22" />' +
      "</a>";
    }).join("");

    var chrome = document.createElement("div");
    chrome.id = "abc-site-chrome";
    chrome.className = "abc-site-chrome";
    chrome.innerHTML =
      '<div class="abc-chrome-top">' +
        '<a class="abc-chrome-brand" href="index.html" aria-label="Au Bon Cake home">' +
          '<img src="' + logoSrc() + '" alt="Au Bon Cake" />' +
        "</a>" +
        '<div class="abc-chrome-social">' + socialItems + "</div>" +
      "</div>" +
      '<nav class="abc-chrome-nav" aria-label="Primary">' +
        '<div class="abc-chrome-inner">' +
          '<ul class="abc-chrome-links">' +
            '<li><a class="abc-chrome-link' + (isActive("index.html") ? " is-active" : "") + '" href="index.html">Home</a></li>' +
            '<li class="abc-chrome-dropdown' + (galleryActive ? " is-current" : "") + '">' +
              '<button type="button" class="abc-chrome-link abc-chrome-dropbtn' + (galleryActive ? " is-active" : "") + '" aria-expanded="false" aria-haspopup="true">' +
                'Galleries <span class="abc-chrome-caret" aria-hidden="true"></span>' +
              "</button>" +
              '<div class="abc-chrome-panel" role="menu">' + galleryItems + "</div>" +
            "</li>" +
            '<li><a class="abc-chrome-link' + (isActive("contact.html") ? " is-active" : "") + '" href="contact.html">Contact</a></li>' +
          "</ul>" +
          '<a class="abc-chrome-cta" href="order.html">Order a Cake</a>' +
        "</div>" +
      "</nav>";

    var header = document.getElementById("SITE_HEADER");
    if (header) {
      header.insertBefore(chrome, header.firstChild);
    } else {
      document.body.insertBefore(chrome, document.body.firstChild);
    }

    var drop = chrome.querySelector(".abc-chrome-dropdown");
    var btn = chrome.querySelector(".abc-chrome-dropbtn");
    if (drop && btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var open = drop.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
      document.addEventListener("click", function (e) {
        if (!drop.contains(e.target)) {
          drop.classList.remove("is-open");
          btn.setAttribute("aria-expanded", "false");
        }
      });
    }
  }

  function lowercaseArtisticDesserts() {
    var el = document.getElementById("comp-kkngirfd");
    if (!el) return;
    el.querySelectorAll("h1, span, p").forEach(function (node) {
      if (/artistic\s+desserts/i.test(node.textContent || "") && node.children.length === 0) {
        node.textContent = "artistic desserts";
      }
    });
    var h1 = el.querySelector("h1");
    if (h1 && /ARTISTIC\s+DESSERTS/i.test(h1.textContent || "")) {
      var spans = h1.querySelectorAll("span");
      var leaf = spans[spans.length - 1] || h1;
      leaf.textContent = "artistic desserts";
    }
  }

  function ensureHeroCta() {
    if (pageName() !== "index.html" && pageName() !== "") return;
    if (document.getElementById("abc-hero-cta")) return;

    var hero =
      document.getElementById("abc-hero-carousel") ||
      document.querySelector(".abc-hero-carousel") ||
      document.getElementById("comp-kkn1m2n6");
    if (!hero || !hero.parentElement) return;

    var wrap = document.createElement("div");
    wrap.id = "abc-hero-cta";
    wrap.className = "abc-hero-cta";
    wrap.innerHTML =
      '<a class="abc-hero-cta-btn" href="order.html">' +
        "<span>Click to Order</span>" +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12m0 0-5-5m5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      "</a>";
    hero.parentElement.insertBefore(wrap, hero.nextSibling);
  }

  function scrubWixDust() {
    document.documentElement.classList.add("abc-standalone");
    document.querySelectorAll('[style*="--motion-scale"], [data-motion-enter]').forEach(function (el) {
      el.style.setProperty("--motion-scale", "1");
      el.style.setProperty("--motion-rotate", "0deg");
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.animation = "none";
      if (!el.getAttribute("data-motion-enter")) el.setAttribute("data-motion-enter", "done");
    });
  }

  function init() {
    scrubWixDust();
    buildChrome();
    lowercaseArtisticDesserts();
    ensureHeroCta();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
