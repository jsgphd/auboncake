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

  function isContact() {
    return pageName() === "contact.html";
  }

  function isOrder() {
    return pageName() === "order.html";
  }

  function isAllGalleries() {
    return pageName() === "all.html";
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
        '<a class="abc-chrome-brand" href="index.html" aria-label="Au Bon Cake home">' +
          '<img src="' + girlSrc + '" alt="Au Bon Cake" />' +
        "</a>" +
        '<a class="abc-chrome-kosher-link" href="https://koshermiami.org/establishments/AuBonCakes" target="_blank" rel="noopener noreferrer" aria-label="Kosher Miami — opens in a new tab">' +
          '<img class="abc-chrome-kosher" src="' + kosherSrc + '" alt="" width="72" height="72" />' +
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

    syncChromeKosherSize(chrome);
  }

  /** Match KM seal height to the Au Bon Cake brand image (girl + wordmark).
   *  Mobile: size both to fill the chrome row (KM square = brand height).
   *  Desktop: brand keeps CSS width; KM height follows measured brand height.
   */
  function syncChromeKosherSize(root) {
    var chrome = root || document.getElementById("abc-site-chrome");
    if (!chrome) return;
    var cluster = chrome.querySelector(".abc-chrome-brand-cluster");
    var brand = chrome.querySelector(".abc-chrome-brand img");
    var kosher = chrome.querySelector(".abc-chrome-kosher");
    if (!cluster || !brand || !kosher) return;

    function apply() {
      var isNarrow = window.matchMedia("(max-width: 900px)").matches;
      if (isNarrow) {
        var gap = 8;
        var avail = cluster.clientWidth;
        if (avail < 40) return;
        /* brandW + gap + (brandW * 68/259) = avail — logo is 259×68 */
        var brandW = (avail - gap) / (1 + 68 / 259);
        brand.style.width = Math.floor(brandW) + "px";
        brand.style.maxWidth = "none";
        brand.style.height = "auto";
        /* Measure rendered brand height so KM matches the girl, not a formula guess */
        var h = Math.round(brand.getBoundingClientRect().height);
        if (h < 8) h = Math.round(brandW * (68 / 259));
        kosher.style.width = h + "px";
        kosher.style.height = h + "px";
        return;
      }

      brand.style.width = "";
      brand.style.maxWidth = "";
      brand.style.height = "";
      var h = Math.round(brand.getBoundingClientRect().height);
      if (h < 8) return;
      kosher.style.width = h + "px";
      kosher.style.height = h + "px";
    }

    apply();
    if (!brand.complete) brand.addEventListener("load", apply, { once: true });
    if (!kosher.complete) kosher.addEventListener("load", apply, { once: true });
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

    var carousel =
      document.getElementById("abc-hero-carousel") ||
      document.querySelector(".abc-hero-carousel") ||
      document.getElementById("comp-kkn1m2n6");

    var section = document.createElement("section");
    section.id = "abc-editorial-hero";
    section.className = "abc-editorial-hero";
    section.innerHTML =
      '<div class="abc-editorial-copy">' +
        '<div class="abc-editorial-title-slot">' +
          '<h1 class="abc-editorial-heading">Kosher Custom<br />Cakes &amp; Cookies</h1>' +
          '<p class="abc-editorial-lede">Artistic, certified kosher cakes and cookies in Miami Beach, FL — Jewish themes, weddings, celebrations, and more.</p>' +
        "</div>" +
        '<div class="abc-editorial-actions">' +
          '<a class="abc-instagram-promo" href="https://www.instagram.com/au_bon_cake" target="_blank" rel="noopener noreferrer">' +
            '<img class="abc-instagram-promo-icon" src="./assets/images/icon-instagram.png" alt="" width="20" height="20" />' +
            "<span>See latest updates on Instagram</span>" +
          "</a>" +
          '<a class="abc-hero-cta-btn" href="order.html">' +
            "<span>Click to Order</span>" +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12m0 0-5-5m5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          "</a>" +
        "</div>" +
      "</div>" +
      '<div class="abc-editorial-media"></div>';

    var mediaSlot = section.querySelector(".abc-editorial-media");
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

    // Hide emptied Wix hero shells + KM (now only in chrome) + Instagram spacer
    [
      document.getElementById("comp-l1z1qig2"),
      document.getElementById("comp-kkn397b6"),
      document.getElementById("abc-hero-cta"),
      document.getElementById("comp-kkngirf5"),
      document.getElementById("comp-kkngirfd"),
      document.getElementById("comp-l1z0qnl8"),
      document.getElementById("comp-l3chwh8b"),
      document.getElementById("comp-mqzh07h7"),
      document.getElementById("comp-mqzh07h71"),
      document.getElementById("comp-mqzgzh8t"),
      document.getElementById("comp-mqzgzhfu")
    ].forEach(function (el) {
      if (el) el.classList.add("abc-relocated-source");
    });

    document.documentElement.classList.add("abc-editorial-home");
  }

  /**
   * Homepage Instagram CTA — live feeds need Meta oEmbed tokens or third-party
   * widgets; the Wix Instagram iframe (#comp-mqzgzhfu) is empty. Point visitors
   * to @au_bon_cake instead of inventing fake tiles.
   */
  function composeInstagramNotice() {
    if (!isHome()) return;
    if (document.getElementById("abc-instagram-notice")) return;

    var section = document.createElement("section");
    section.id = "abc-instagram-notice";
    section.className = "abc-instagram-notice";
    section.setAttribute("aria-labelledby", "abc-instagram-heading");
    section.innerHTML =
      '<div class="abc-instagram-inner">' +
        '<p class="abc-instagram-eyebrow">Follow along</p>' +
        '<h2 id="abc-instagram-heading" class="abc-instagram-heading">Latest news is on Instagram</h2>' +
        '<p class="abc-instagram-lede">New cakes, celebrations, and studio moments land on Instagram first — come say hello at @au_bon_cake.</p>' +
        '<a class="abc-instagram-cta" href="https://www.instagram.com/au_bon_cake" target="_blank" rel="noopener">Visit Instagram</a>' +
      "</div>";

    var hero = document.getElementById("abc-editorial-hero");
    var sitePages = document.getElementById("SITE_PAGES");
    var main = document.getElementById("PAGES_CONTAINER");
    if (hero && hero.parentElement) {
      hero.parentElement.insertBefore(section, hero.nextSibling);
    } else if (main && sitePages) {
      main.insertBefore(section, sitePages);
    } else if (sitePages && sitePages.parentElement) {
      sitePages.parentElement.insertBefore(section, sitePages);
    } else {
      document.body.appendChild(section);
    }

    [
      document.getElementById("comp-mqzh07h7"),
      document.getElementById("comp-mqzh07h71"),
      document.getElementById("comp-mqzgzh8t"),
      document.getElementById("comp-mqzgzhfu")
    ].forEach(function (el) {
      if (el) el.classList.add("abc-relocated-source");
    });
  }

  /** “Galleries By Theme” → all.html — plain link, no nav-style underline/visited change */
  function linkGalleriesByTheme() {
    if (!isHome()) return;
    var title = document.getElementById("comp-lcmrkmdf");
    if (!title || title.querySelector("a.abc-galleries-theme-link")) return;

    var heading = title.querySelector("h2, h1") || title;
    var link = document.createElement("a");
    link.className = "abc-galleries-theme-link";
    link.href = "all.html";
    link.setAttribute("aria-label", "View all galleries by theme");
    while (heading.firstChild) link.appendChild(heading.firstChild);
    heading.appendChild(link);
  }

  function composeOrderPage() {
    if (!isOrder()) return;
    if (document.getElementById("abc-order-band")) return;

    var section = document.createElement("section");
    section.id = "abc-order-band";
    section.className = "abc-order-band";
    section.innerHTML =
      '<div class="abc-order-copy">' +
        '<p class="abc-order-eyebrow">Order</p>' +
        '<h1 class="abc-order-heading">Let&rsquo;s Discuss Your Order</h1>' +
        '<p class="abc-order-lede">Everything is Custom! So a consultation with Nathalie is the first step to making an order.</p>' +
        '<ul class="abc-order-list">' +
          "<li>Parve (dairy-free) cakes.</li>" +
          "<li>Final costs will be quoted after consultation as prices vary based on complexity and size.</li>" +
          "<li>Most orders are booked several weeks in advance, so we recommend contacting us as early as possible.</li>" +
          "<li>Short-notice orders can often still be accommodated.</li>" +
          "<li>Kosher Certification under Kosher Miami</li>" +
          "<li>We have Gluten Free and Passover options.</li>" +
        "</ul>" +
        '<div class="abc-order-details">' +
          '<a class="abc-order-detail" href="mailto:nathalie@AuBonCake.com">' +
            '<span class="abc-order-label">Contact Nathalie</span>' +
            '<span class="abc-order-value">nathalie@AuBonCake.com</span>' +
          "</a>" +
          '<div class="abc-order-phone-group">' +
            '<a class="abc-order-detail" href="tel:+12158022253">' +
              '<span class="abc-order-label">Call or WhatsApp</span>' +
              '<span class="abc-order-value">215 802-2253</span>' +
            "</a>" +
            '<a class="abc-instagram-promo" href="https://www.instagram.com/au_bon_cake" target="_blank" rel="noopener noreferrer">' +
              '<img class="abc-instagram-promo-icon" src="./assets/images/icon-instagram.png" alt="" width="20" height="20" />' +
              "<span>See latest updates on Instagram</span>" +
            "</a>" +
          "</div>" +
        "</div>" +
      "</div>" +
      '<div class="abc-order-media" aria-hidden="true">' +
        '<img class="abc-order-photo" src="./assets/images/order-hero.jpg" alt="" />' +
      "</div>";

    var main = document.getElementById("PAGES_CONTAINER");
    var sitePages = document.getElementById("SITE_PAGES");
    if (main && sitePages) main.insertBefore(section, sitePages);
    else if (sitePages && sitePages.parentElement) sitePages.parentElement.insertBefore(section, sitePages);
    else document.body.insertBefore(section, document.body.firstChild);

    [
      document.getElementById("comp-kkkohipj1"),
      document.getElementById("comp-l3chzrnt"),
      document.getElementById("comp-l3chzrmh"),
      document.getElementById("comp-l3chzrn0"),
      document.getElementById("comp-l3chzrlx")
    ].forEach(function (el) {
      if (el) el.classList.add("abc-relocated-source");
    });

    document.documentElement.classList.add("abc-order-page");
  }

  function composeContactPage() {
    if (!isContact()) return;
    if (document.getElementById("abc-contact-band")) return;

    var section = document.createElement("section");
    section.id = "abc-contact-band";
    section.className = "abc-contact-band";
    section.innerHTML =
      '<div class="abc-contact-copy">' +
        '<p class="abc-contact-eyebrow">Contact</p>' +
        '<h1 class="abc-contact-heading">We&rsquo;re Listening</h1>' +
        '<p class="abc-contact-lede">To discuss an order or anything else — Nathalie would love to hear from you.</p>' +
        '<div class="abc-contact-details">' +
          '<a class="abc-contact-detail" href="mailto:orders@auboncake.com">' +
            '<span class="abc-contact-label">Email</span>' +
            '<span class="abc-contact-value">orders@auboncake.com</span>' +
          "</a>" +
          '<div class="abc-contact-phone-group">' +
            '<a class="abc-contact-detail" href="tel:+12158022253">' +
              '<span class="abc-contact-label">Call or WhatsApp</span>' +
              '<span class="abc-contact-value">215 802-2253</span>' +
            "</a>" +
            '<a class="abc-instagram-promo" href="https://www.instagram.com/au_bon_cake" target="_blank" rel="noopener noreferrer">' +
              '<img class="abc-instagram-promo-icon" src="./assets/images/icon-instagram.png" alt="" width="20" height="20" />' +
              "<span>See latest updates on Instagram</span>" +
            "</a>" +
          "</div>" +
        "</div>" +
      "</div>" +
      '<div class="abc-contact-media" aria-hidden="true">' +
        '<img src="./assets/images/contact-nathalie-cake.jpg" alt="" class="abc-contact-photo" />' +
      "</div>";

    var main = document.getElementById("PAGES_CONTAINER");
    var sitePages = document.getElementById("SITE_PAGES");
    if (main && sitePages) main.insertBefore(section, sitePages);
    else if (sitePages && sitePages.parentElement) sitePages.parentElement.insertBefore(section, sitePages);
    else document.body.insertBefore(section, document.body.firstChild);

    [
      document.getElementById("comp-kkr3u14l"),
      document.getElementById("comp-kkkics5n4"),
      document.getElementById("comp-kkkics5n2"),
      document.getElementById("comp-kkkics5n5"),
      document.getElementById("comp-kkkics5m"),
      document.getElementById("comp-kkkics5n"),
      document.getElementById("comp-mqzh8mo6")
    ].forEach(function (el) {
      if (el) el.classList.add("abc-relocated-source");
    });

    document.documentElement.classList.add("abc-contact-page");
  }

  function normalizeSiteShell() {
    document.documentElement.classList.add("abc-site");
    if (isHome()) document.documentElement.classList.add("abc-editorial-home");
    if (isContact()) document.documentElement.classList.add("abc-contact-page");
    if (isOrder()) document.documentElement.classList.add("abc-order-page");
    if (isAllGalleries()) document.documentElement.classList.add("abc-all-galleries-page");

    [
      document.getElementById("SITE_PAGES"),
      document.getElementById("SITE_PAGES_TRANSITION_GROUP"),
      document.getElementById("PAGES_CONTAINER"),
      document.getElementById("masterPage"),
      document.getElementById("site-root"),
      document.getElementById("SITE_CONTAINER"),
      document.querySelector(".wixui-page"),
      document.querySelector("[id^='pageBackground_']")
    ].forEach(function (el) {
      if (!el) return;
      el.style.setProperty("height", "auto", "important");
      el.style.setProperty("min-height", "0", "important");
      el.style.setProperty("min-width", "0", "important");
      el.style.setProperty("max-width", "100%", "important");
    });

    // Any page root (Wix page ids vary)
    document.querySelectorAll("[id^='pageBackground_'], .wixui-page, [data-mesh-id$='inlineContent-gridContainer']").forEach(function (el) {
      el.style.setProperty("min-width", "0", "important");
    });
  }

  function clearAbsoluteItem(el) {
    el.style.setProperty("position", "relative", "important");
    el.style.setProperty("left", "auto", "important");
    el.style.setProperty("top", "auto", "important");
    el.style.setProperty("right", "auto", "important");
    el.style.setProperty("bottom", "auto", "important");
    el.style.setProperty("width", "100%", "important");
    el.style.setProperty("height", "auto", "important");
    el.style.setProperty("overflow", "hidden", "important");
  }

  function layoutProGalleries() {
    var isNarrow = window.matchMedia("(max-width: 900px)").matches;
    var margins = document.querySelectorAll(".pro-gallery-margin-container");

    margins.forEach(function (margin) {
      // Skip broken/hidden Wix hero shell on homepage
      if (margin.closest(".abc-relocated-source, #comp-kkn1m2n6")) return;

      var isTheme =
        margin.id === "pro-gallery-margin-container-comp-lcmrjr9o" ||
        margin.id === "pro-gallery-margin-container-comp-l7wq5yam";
      margin.classList.add("abc-pro-gallery-grid");
      if (isTheme) margin.classList.add("abc-theme-gallery-grid");

      margin.style.setProperty("width", "100%", "important");
      margin.style.setProperty("max-width", "1120px", "important");
      margin.style.setProperty("height", "auto", "important");
      margin.style.setProperty("margin", "0 auto", "important");
      margin.style.setProperty("position", "relative", "important");
      margin.style.setProperty("overflow", "visible", "important");

      margin.querySelectorAll(".item-link-wrapper").forEach(function (wrap) {
        wrap.style.setProperty("display", "block", "important");
        wrap.style.setProperty("position", "relative", "important");
        wrap.style.setProperty("width", "100%", "important");
        wrap.style.setProperty("height", "auto", "important");
      });

      margin.querySelectorAll(".gallery-item-container").forEach(function (el) {
        clearAbsoluteItem(el);
        if (isTheme) el.style.setProperty("overflow", "visible", "important");
      });

      margin.querySelectorAll(".gallery-item-wrapper, .gallery-item-content, [data-hook='item-wrapper'], .item-hover-flex-container, .gallery-item-hover").forEach(function (el) {
        el.style.setProperty("width", "100%", "important");
        el.style.removeProperty("height");
        if (!isTheme) {
          el.style.setProperty("height", "auto", "important");
          el.style.setProperty("aspect-ratio", "1 / 1", "important");
        }
      });

      margin.querySelectorAll("img[data-hook='gallery-item-image-img'], .gallery-item-visible img, .gallery-item img").forEach(function (el) {
        el.style.setProperty("width", "100%", "important");
        el.style.setProperty("height", "100%", "important");
        el.style.setProperty("object-fit", "cover", "important");
        el.style.setProperty("border-radius", "0", "important");
      });

      if (isTheme) {
        margin.querySelectorAll(".gallery-item-common-info-outer, .gallery-item-common-info, .gallery-item-bottom-info").forEach(function (el) {
          if (isNarrow) {
            el.style.setProperty("height", "39px", "important");
            el.style.setProperty("min-height", "39px", "important");
            el.style.setProperty("max-height", "39px", "important");
          } else {
            el.style.removeProperty("height");
            el.style.removeProperty("min-height");
            el.style.removeProperty("max-height");
          }
        });
        margin.querySelectorAll(".info-element-title, .info-element-title span, [data-hook='item-title'], [data-hook='item-title'] span").forEach(function (el) {
          if (isNarrow) {
            el.style.setProperty("line-height", "1.05", "important");
            el.style.setProperty("font-size", "10px", "important");
          } else {
            el.style.removeProperty("line-height");
            el.style.removeProperty("font-size");
          }
        });
        margin.querySelectorAll(".info-element-text").forEach(function (el) {
          if (isNarrow) {
            el.style.setProperty("height", "39px", "important");
            el.style.setProperty("min-height", "39px", "important");
            el.style.setProperty("padding", "3px", "important");
          } else {
            el.style.removeProperty("height");
            el.style.removeProperty("min-height");
            el.style.removeProperty("padding");
          }
        });
      }

      var root = margin.closest("[id^='comp-']") || margin.parentElement;
      var isWide = window.matchMedia("(min-width: 1280px)").matches;
      var deskMax = isTheme && isWide ? "1320px" : "1120px";
      var chain = [
        margin,
        margin.closest(".pro-gallery"),
        margin.closest("[id^='pro-gallery-container']"),
        margin.closest("[id^='gallery-wrapper']"),
        root
      ];
      chain.forEach(function (el) {
        if (!el) return;
        el.style.setProperty("height", "auto", "important");
        el.style.setProperty("min-width", "0", "important");
        el.style.setProperty("width", "100%", "important");
        el.style.setProperty("max-width", isNarrow ? "100%" : deskMax, "important");
        el.style.setProperty("left", "auto", "important");
        el.style.setProperty("margin-left", "auto", "important");
        el.style.setProperty("margin-right", "auto", "important");
      });
    });

    // Theme gallery outer shells (homepage + All Galleries)
    var isWide = window.matchMedia("(min-width: 1280px)").matches;
    var deskWidth = isWide ? "min(1320px, calc(100% - 48px))" : "min(1120px, calc(100% - 48px))";
    var deskMax = isWide ? "1320px" : "1120px";
    ["comp-lcmrjr9o", "comp-l7wq5yam"].forEach(function (id) {
      var themeGal = document.getElementById(id);
      if (!themeGal) return;
      themeGal.style.setProperty("width", isNarrow ? "calc(100% - 24px)" : deskWidth, "important");
      themeGal.style.setProperty("max-width", isNarrow ? "100%" : deskMax, "important");
      themeGal.style.setProperty("margin", isNarrow ? "0 auto 20px" : "0 auto 24px", "important");
      themeGal.style.setProperty("left", "auto", "important");
      themeGal.style.setProperty("height", "auto", "important");
    });

    layoutAllGalleriesPage();
  }

  /** Collapse Wix mesh leftovers on all.html: -150px pull-up, empty 1153px column, fixed gallery height */
  function layoutAllGalleriesPage() {
    if (!isAllGalleries()) return;

    [
      document.getElementById("comp-l7wq01hv"),
      document.getElementById("comp-l7wq01jm")
    ].forEach(function (el) {
      if (el) el.classList.add("abc-relocated-source");
    });

    var meshIds = [
      "Containerdq0seinlineContent",
      "Containerdq0seinlineContent-gridContainer",
      "comp-mqzhan8qinlineContent",
      "comp-mqzhan8qinlineContent-gridContainer",
      "comp-l9liymtginlineContent",
      "comp-l9liymtginlineContent-gridContainer"
    ];
    meshIds.forEach(function (mid) {
      var el = document.querySelector('[data-mesh-id="' + mid + '"]');
      if (!el) return;
      el.style.setProperty("margin-top", "0", "important");
      el.style.setProperty("height", "auto", "important");
      el.style.setProperty("min-height", "0", "important");
      if (mid.indexOf("gridContainer") !== -1) {
        el.style.setProperty("grid-template-rows", "min-content min-content", "important");
      }
    });

    [
      "dq0se",
      "comp-mqzhan8q",
      "comp-l7wq5yam",
      "comp-l9liymrw",
      "comp-l9liymtg",
      "gallery-wrapper-comp-l7wq5yam",
      "pro-gallery-comp-l7wq5yam",
      "pro-gallery-container-comp-l7wq5yam",
      "pro-gallery-margin-container-comp-l7wq5yam",
      "SITE_PAGES",
      "SITE_PAGES_TRANSITION_GROUP",
      "PAGES_CONTAINER"
    ].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.style.setProperty("height", "auto", "important");
      el.style.setProperty("min-height", "0", "important");
      el.style.setProperty("min-width", "0", "important");
      if (id === "comp-l9liymrw" || id === "comp-l9liymtg") {
        el.style.setProperty("left", "auto", "important");
        el.style.setProperty("margin-left", "auto", "important");
        el.style.setProperty("margin-right", "auto", "important");
        el.style.setProperty("width", "100%", "important");
        el.style.setProperty("max-width", "1120px", "important");
      }
    });

    var gal = document.getElementById("comp-l7wq5yam");
    if (gal) {
      gal.style.setProperty("margin-top", "0", "important");
      gal.style.setProperty("position", "relative", "important");
    }

    var backBtn = document.getElementById("comp-l9liz73b");
    if (backBtn) {
      backBtn.style.setProperty("margin-left", "auto", "important");
      backBtn.style.setProperty("margin-right", "auto", "important");
      backBtn.style.setProperty("left", "auto", "important");
      backBtn.style.setProperty("justify-self", "center", "important");
    }
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

  function layoutOrderMobileColumns() {
    if (!isOrder()) return;
    var isNarrow = window.matchMedia("(max-width: 900px)").matches;
    var strips = document.querySelectorAll(
      ".abc-order-page .wixui-column-strip, #comp-kkkqb87n6, #comp-kkkr9wv71, #comp-kkkr9wv710, #comp-kkkouh4e12"
    );

    strips.forEach(function (strip) {
      var columns = strip.querySelector('[data-testid="columns"]') || strip.querySelector(".Ak0vpt");
      var cols = columns
        ? columns.querySelectorAll(":scope > .wixui-column-strip__column, :scope > .FDI5TK")
        : [];

      if (!isNarrow) {
        strip.style.removeProperty("flex-direction");
        strip.style.removeProperty("height");
        if (columns) {
          columns.style.removeProperty("flex-direction");
          columns.style.removeProperty("height");
          columns.style.removeProperty("gap");
        }
        cols.forEach(function (col) {
          [
            "width", "max-width", "flex", "flex-basis", "height", "min-height"
          ].forEach(function (prop) { col.style.removeProperty(prop); });
          col.querySelectorAll("[data-hook='bgLayers'], [id^='bgLayers_']").forEach(function (bg) {
            bg.style.removeProperty("height");
            bg.style.removeProperty("min-height");
          });
        });
        return;
      }

      strip.style.setProperty("display", "flex", "important");
      strip.style.setProperty("flex-direction", "column", "important");
      strip.style.setProperty("height", "auto", "important");
      strip.style.setProperty("width", "100%", "important");
      strip.style.setProperty("min-width", "0", "important");

      if (columns) {
        columns.style.setProperty("display", "flex", "important");
        columns.style.setProperty("flex-direction", "column", "important");
        columns.style.setProperty("height", "auto", "important");
        columns.style.setProperty("width", "100%", "important");
        columns.style.setProperty("gap", "20px", "important");
      }

      cols.forEach(function (col) {
        col.style.setProperty("width", "100%", "important");
        col.style.setProperty("max-width", "100%", "important");
        col.style.setProperty("min-width", "0", "important");
        col.style.setProperty("flex", "0 0 auto", "important");
        col.style.setProperty("height", "auto", "important");
        col.style.setProperty("min-height", "0", "important");
        col.style.setProperty("--column-width", "100%");
        col.style.setProperty("--column-flex", "100");
        col.style.setProperty("--height", "auto");

        col.querySelectorAll("[data-mesh-id$='inlineContent'], [data-mesh-id$='gridContainer']").forEach(function (mesh) {
          mesh.style.setProperty("height", "auto", "important");
          mesh.style.setProperty("min-height", "0", "important");
          mesh.style.setProperty("display", "flex", "important");
          mesh.style.setProperty("flex-direction", "column", "important");
          mesh.style.setProperty("align-items", "center", "important");
          mesh.style.setProperty("gap", "8px", "important");
        });

        col.querySelectorAll("[id^='comp-']").forEach(function (inner) {
          inner.style.setProperty("position", "relative", "important");
          inner.style.setProperty("left", "auto", "important");
          inner.style.setProperty("top", "auto", "important");
          inner.style.setProperty("width", "100%", "important");
          inner.style.setProperty("max-width", "100%", "important");
          inner.style.setProperty("height", "auto", "important");
          inner.style.setProperty("min-height", "0", "important");
        });

        col.querySelectorAll("wow-image, .bgImage, img").forEach(function (media) {
          media.style.setProperty("position", "absolute", "important");
          media.style.setProperty("inset", "0", "important");
          media.style.setProperty("width", "100%", "important");
          media.style.setProperty("height", "100%", "important");
          media.style.setProperty("object-fit", "cover", "important");
        });

        /* Media-only columns paint via absolute bgLayers — size from image ratio */
        var mediaImg = col.querySelector("img");
        var hasText = ((col.innerText || "").trim().length > 0);
        if (mediaImg && !hasText) {
          var applyMediaHeight = function () {
            if (!mediaImg.naturalWidth) return;
            var w = col.clientWidth || window.innerWidth || 390;
            var h = Math.round(w * (mediaImg.naturalHeight / mediaImg.naturalWidth));
            col.style.setProperty("height", h + "px", "important");
            col.style.setProperty("min-height", h + "px", "important");
            var bg = col.querySelector("[data-hook='bgLayers'], [id^='bgLayers_']");
            if (bg) {
              bg.style.setProperty("height", h + "px", "important");
              bg.style.setProperty("min-height", h + "px", "important");
            }
          };
          applyMediaHeight();
          if (!mediaImg.complete) mediaImg.addEventListener("load", applyMediaHeight, { once: true });
        }
      });
    });

    document.querySelectorAll('.abc-order-page img[src*="cake-servings-chart"]').forEach(function (img) {
      if (!isNarrow) {
        img.style.removeProperty("width");
        img.style.removeProperty("max-width");
        img.style.removeProperty("height");
        img.style.removeProperty("object-fit");
        var wrapClear = img.closest("[id^='comp-']");
        if (wrapClear) {
          wrapClear.style.removeProperty("height");
          wrapClear.style.removeProperty("min-height");
        }
        return;
      }
      img.style.setProperty("width", "100%", "important");
      img.style.setProperty("max-width", "100%", "important");
      img.style.setProperty("height", "auto", "important");
      img.style.setProperty("object-fit", "contain", "important");
      img.style.setProperty("position", "relative", "important");
      img.style.setProperty("display", "block", "important");

      var applyChartHeight = function () {
        var wrap = document.getElementById("comp-kkkouh4e15") || img.closest("[id^='comp-']");
        if (!wrap || !img.naturalWidth) return;
        var w = wrap.clientWidth || window.innerWidth || 390;
        var h = Math.round(w * (img.naturalHeight / img.naturalWidth));
        wrap.style.setProperty("height", h + "px", "important");
        wrap.style.setProperty("min-height", h + "px", "important");
        wrap.style.setProperty("width", "100%", "important");
        wrap.style.setProperty("max-width", "100%", "important");
        wrap.style.setProperty("overflow", "visible", "important");
        img.style.setProperty("width", "100%", "important");
        img.style.setProperty("height", "100%", "important");
        img.style.setProperty("object-fit", "contain", "important");
      };
      applyChartHeight();
      if (!img.complete) img.addEventListener("load", applyChartHeight, { once: true });
    });
  }

  function refreshLayout() {
    normalizeSiteShell();
    layoutProGalleries();
    layoutOrderMobileColumns();
    linkGalleriesByTheme();
    syncChromeKosherSize();
  }

  function init() {
    scrubWixDust();
    buildChrome();
    lowercaseArtisticDesserts();
    composeEditorialHero();
    composeInstagramNotice();
    composeOrderPage();
    composeContactPage();
    refreshLayout();
    window.setTimeout(refreshLayout, 300);
    window.setTimeout(refreshLayout, 1000);
    window.addEventListener("resize", refreshLayout);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
