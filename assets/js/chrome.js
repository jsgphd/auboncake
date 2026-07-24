/**
 * Au Bon Cake — editorial chrome
 * Gallery-Editorial top layout: girl logo + Kosher seal kept prominent,
 * nav/CTA cleaned up, homepage hero rearranged into a two-column composition.
 * No content removed — only rearranged.
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

  function isHome() {
    var page = pageName();
    return page === "index.html" || page === "";
  }

  function isActive(href) {
    var page = pageName();
    if (href === "index.html") return isHome();
    return page === href;
  }

  function findImgSrc(selector, fallback) {
    var img = document.querySelector(selector);
    return (img && img.getAttribute("src")) || fallback;
  }

  function buildChrome() {
    if (document.getElementById("abc-site-chrome")) return;

    var galleryActive = GALLERIES.some(function (g) { return g.href === pageName(); });
    var galleryItems = GALLERIES.map(function (g) {
      return '<a href="' + g.href + '"' + (isActive(g.href) ? ' class="is-active"' : "") + ">" + g.label + "</a>";
    }).join("");

    var socialItems = SOCIAL.map(function (s) {
      return (
        '<a href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + s.label + '">' +
          '<img src="' + s.icon + '" alt="" width="18" height="18" />' +
        "</a>"
      );
    }).join("");

    var girlSrc = findImgSrc('img[src*="logo-au-bon-cake"]', "./assets/images/logo-au-bon-cake.png");
    var kosherSrc = findImgSrc(
      '#comp-l3chwh8b img, #comp-l3chzrnt img, img[src*="logo-kosher-miami"]',
      "./assets/images/logo-kosher-miami.png"
    );

    var brandCluster =
      '<div class="abc-chrome-brand-cluster">' +
        (isHome()
          ? ""
          : '<img class="abc-chrome-kosher" src="' + kosherSrc + '" alt="Kosher Miami" width="72" height="72" />') +
        '<a class="abc-chrome-brand" href="index.html" aria-label="Au Bon Cake home">' +
          '<img src="' + girlSrc + '" alt="Au Bon Cake" />' +
        "</a>" +
      "</div>";

    var chrome = document.createElement("header");
    chrome.id = "abc-site-chrome";
    chrome.className = "abc-site-chrome abc-editorial-chrome";
    chrome.innerHTML =
      '<div class="abc-chrome-bar">' +
        brandCluster +
        '<nav class="abc-chrome-nav" aria-label="Primary">' +
          '<ul class="abc-chrome-links">' +
            '<li><a class="abc-chrome-link' + (isActive("index.html") ? " is-active" : "") + '" href="index.html">Home</a></li>' +
            '<li class="abc-chrome-dropdown' + (galleryActive ? " is-current" : "") + '">' +
              '<button type="button" class="abc-chrome-link abc-chrome-dropbtn' + (galleryActive ? " is-active" : "") + '" aria-expanded="false" aria-haspopup="true">' +
                'Galleries <span class="abc-chrome-caret" aria-hidden="true"></span>' +
              "</button>" +
              '<div class="abc-chrome-panel" role="menu">' + galleryItems + "</div>" +
            "</li>" +
            '<li><a class="abc-chrome-link' + (isActive("order.html") ? " is-active" : "") + '" href="order.html">Order</a></li>' +
            '<li><a class="abc-chrome-link' + (isActive("contact.html") ? " is-active" : "") + '" href="contact.html">Contact</a></li>' +
          "</ul>" +
        "</nav>" +
        '<div class="abc-chrome-end">' +
          '<a class="abc-chrome-cta" href="order.html">Click to Order</a>' +
          '<div class="abc-chrome-social">' + socialItems + "</div>" +
        "</div>" +
      "</div>" +
      '<div class="abc-chrome-rule" aria-hidden="true"></div>';

    var host = document.getElementById("SITE_HEADER") || document.body;
    if (host.id === "SITE_HEADER") host.insertBefore(chrome, host.firstChild);
    else host.insertBefore(chrome, host.firstChild);

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

  function lowercaseArtisticDesserts(root) {
    var scope = root || document.getElementById("comp-kkngirfd") || document;
    scope.querySelectorAll("h1, span, p").forEach(function (node) {
      if (/artistic\s+desserts/i.test(node.textContent || "") && node.children.length === 0) {
        node.textContent = "artistic desserts";
      }
    });
  }

  function composeEditorialHero() {
    if (!isHome()) return;
    if (document.getElementById("abc-editorial-hero")) return;

    var kosher = document.getElementById("comp-l3chwh8b");
    var title = document.getElementById("comp-kkngirfd");
    var carousel =
      document.getElementById("abc-hero-carousel") ||
      document.querySelector(".abc-hero-carousel") ||
      document.getElementById("comp-kkn1m2n6");

    var section = document.createElement("section");
    section.id = "abc-editorial-hero";
    section.className = "abc-editorial-hero";
    section.innerHTML =
      '<div class="abc-editorial-copy">' +
        '<div class="abc-editorial-kosher-slot"></div>' +
        '<div class="abc-editorial-title-slot"></div>' +
        '<div class="abc-editorial-actions">' +
          '<a class="abc-hero-cta-btn" href="order.html">' +
            "<span>Click to Order</span>" +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12m0 0-5-5m5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          "</a>" +
          '<a class="abc-editorial-ghost" href="all.html">View galleries</a>' +
        "</div>" +
      "</div>" +
      '<div class="abc-editorial-media"></div>';

    var kosherSlot = section.querySelector(".abc-editorial-kosher-slot");
    var titleSlot = section.querySelector(".abc-editorial-title-slot");
    var mediaSlot = section.querySelector(".abc-editorial-media");

    if (kosher) kosherSlot.appendChild(kosher);
    else {
      kosherSlot.innerHTML =
        '<img class="abc-editorial-kosher-img" src="./assets/images/logo-kosher-miami.png" alt="Kosher Miami" />';
    }

    if (title) {
      titleSlot.appendChild(title);
      lowercaseArtisticDesserts(title);
    } else {
      titleSlot.innerHTML = '<h1 class="abc-editorial-heading">artistic desserts</h1>';
    }

    if (carousel) mediaSlot.appendChild(carousel);

    // Place editorial band above the Wix page mesh (avoids uvik8H stacking trap)
    var main = document.getElementById("PAGES_CONTAINER");
    var sitePages = document.getElementById("SITE_PAGES");
    if (main && sitePages) {
      main.insertBefore(section, sitePages);
    } else if (sitePages && sitePages.parentElement) {
      sitePages.parentElement.insertBefore(section, sitePages);
    } else {
      var pageRoot = document.getElementById("lh2lj");
      if (pageRoot && pageRoot.parentElement) pageRoot.parentElement.insertBefore(section, pageRoot);
      else document.body.insertBefore(section, document.body.firstChild);
    }

    [
      document.getElementById("comp-l1z1qig2"),
      document.getElementById("comp-kkn397b6"),
      document.getElementById("abc-hero-cta"),
      document.getElementById("comp-kkngirf5"),
      document.getElementById("comp-l1z0qnl8"),
      document.getElementById("comp-mqzh07h71")
    ].forEach(function (el) {
      if (el) el.classList.add("abc-relocated-source");
    });

    document.documentElement.classList.add("abc-editorial-home");
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
    composeEditorialHero();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
