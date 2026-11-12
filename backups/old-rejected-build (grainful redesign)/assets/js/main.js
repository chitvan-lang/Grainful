/* Grainful homepage interactions (no dependencies). */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header: dark bar once the page scrolls ---------- */
  var header = document.querySelector('.hdr');
  // header, menu and dropdowns are guarded: privacy.html has none of them but shares this file
  var onScroll = function () { if (header) header.classList.toggle('is-scrolled', window.scrollY > 40); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var burger = document.querySelector('.hdr-burger');
  var nav = document.getElementById('nav');
  var setMenu = function (open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
  };
  if (burger && nav) {
    burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
    window.addEventListener('resize', function () { if (window.innerWidth > 991 && nav.classList.contains('is-open')) setMenu(false); });
  }

  /* ---------- Dropdowns ---------- */
  var drops = document.querySelectorAll('.nav-drop');
  var closeDrops = function (except) {
    drops.forEach(function (li) {
      if (li === except) return;
      li.classList.remove('is-open');
      li.querySelector('.nav-drop-btn').setAttribute('aria-expanded', 'false');
    });
  };
  drops.forEach(function (li) {
    var btn = li.querySelector('.nav-drop-btn');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !li.classList.contains('is-open');
      closeDrops(li);
      li.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.nav-drop')) closeDrops(); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (nav && burger && nav.classList.contains('is-open')) { setMenu(false); burger.focus(); }
    closeDrops();
  });

  /* ---------- Hero: a slide every 6s, its line filling as it shows; thumbnails jump to a slide. Paused off
     screen and while the thumbnails are pointed at or focused; a still first slide for reduced motion. ---------- */
  var hero = document.querySelector('[data-hero]');
  if (hero) {
    var hSlides = Array.prototype.slice.call(hero.querySelectorAll('.hero-slide'));
    var hThumbs = Array.prototype.slice.call(hero.querySelectorAll('.hero-thumb'));
    var hFills = Array.prototype.slice.call(hero.querySelectorAll('.hero-line > span'));
    var SLIDE = 6000, hIdx = 0, hElapsed = 0, hLast = null, hRaf = 0, hSeen = true, hHeld = false;
    var hShow = function (i) {
      hIdx = (i + hSlides.length) % hSlides.length;
      hElapsed = 0;
      hSlides.forEach(function (s, k) { s.classList.toggle('is-on', k === hIdx); });
      hThumbs.forEach(function (t, k) { t.classList.toggle('is-on', k === hIdx); t.setAttribute('aria-pressed', String(k === hIdx)); });
      hFills.forEach(function (f) { f.style.width = '0'; });
    };
    var hFrame = function (now) {
      if (hLast !== null && !hHeld) hElapsed += Math.min(now - hLast, 100);
      hLast = now;
      hFills[hIdx].style.width = (Math.min(hElapsed / SLIDE, 1) * 100).toFixed(2) + '%';
      if (hElapsed >= SLIDE) hShow(hIdx + 1);
      hRaf = window.requestAnimationFrame(hFrame);
    };
    var hRun = function () {
      window.cancelAnimationFrame(hRaf);
      hLast = null;
      if (hSeen && !reduceMotion) hRaf = window.requestAnimationFrame(hFrame);
    };
    hThumbs.forEach(function (t, k) { t.addEventListener('click', function () { hShow(k); }); });
    var hNav = hero.querySelector('.hero-nav');
    hNav.addEventListener('mouseenter', function () { hHeld = true; });
    hNav.addEventListener('mouseleave', function () { hHeld = false; });
    hNav.addEventListener('focusin', function () { hHeld = true; });
    hNav.addEventListener('focusout', function () { hHeld = false; });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { hSeen = en[0].isIntersecting; hRun(); }).observe(hero);
    } else hRun();
  }

  /* ---------- Why choose us: one numbered row open at a time; opening a row closes the one that was open ---------- */
  var why = document.querySelector('[data-why]');
  if (why) {
    var whyRows = Array.prototype.slice.call(why.querySelectorAll('.why-row'));
    whyRows.forEach(function (row) {
      row.querySelector('.why-toggle').addEventListener('click', function () {
        var opening = !row.classList.contains('is-open');
        whyRows.forEach(function (r) {
          var on = r === row && opening;
          r.classList.toggle('is-open', on);
          r.querySelector('.why-toggle').setAttribute('aria-expanded', String(on));
        });
      });
    });
  }

  /* ---------- Facility: one station row open at a time (Millwright's station list) ---------- */
  var fac = document.querySelector('[data-facility]');
  if (fac) {
    var facRows = Array.prototype.slice.call(fac.querySelectorAll('.facility-row'));
    facRows.forEach(function (row) {
      row.querySelector('.facility-toggle').addEventListener('click', function () {
        var opening = !row.classList.contains('is-open');
        facRows.forEach(function (r) {
          var on = r === row && opening;
          r.classList.toggle('is-open', on);
          r.querySelector('.facility-toggle').setAttribute('aria-expanded', String(on));
        });
      });
    });
  }

  /* ---------- Products: one category selected at a time, its media + copy shown on the right ---------- */
  var prod = document.querySelector('[data-products]');
  if (prod) {
    var prodRows = Array.prototype.slice.call(prod.querySelectorAll('.prod-row'));
    var prodPanels = Array.prototype.slice.call(prod.querySelectorAll('.prod-panel'));
    var prodShow = function (i) {
      prodRows.forEach(function (r, k) {
        var on = k === i;
        r.classList.toggle('is-on', on);
        r.setAttribute('aria-selected', String(on));
      });
      prodPanels.forEach(function (p, k) { p.classList.toggle('is-on', k === i); });
    };
    prodRows.forEach(function (row, k) {
      row.addEventListener('click', function () { prodShow(k); });
      row.addEventListener('mouseenter', function () { prodShow(k); });
      row.addEventListener('focus', function () { prodShow(k); });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) {
      // stagger siblings in the same row
      var idx = Array.prototype.indexOf.call(el.parentElement.children, el);
      el.style.transitionDelay = Math.min(idx, 4) * 100 + 'ms';
      io.observe(el);
      setTimeout(function () { el.style.transitionDelay = ''; }, 2500); // hover effects stay instant after the entrance
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Contact enquiry (Millwright quote request): the buyer picks product, quantity and brand, the counter
     shows how many are filled, and "Start my enquiry" opens the detailed form with the message pre-filled. Sending
     posts to Web3Forms and only reports success once Web3Forms confirms it. Without JS it is a plain form that posts
     to Web3Forms directly, so both parts show and the JS-only buttons stay hidden. ---------- */
  var enq = document.querySelector('[data-enquiry]');
  if (enq) {
    enq.noValidate = true; // the messages below replace the browser's own bubbles
    var enqMsg = enq.querySelector('.cta-msg');
    var qSteps = enq.querySelector('[data-quote-steps]');
    var qDetails = enq.querySelector('[data-quote-details]');
    var qCount = enq.querySelector('[data-quote-count]');
    var qNext = enq.querySelector('[data-quote-next]');
    var qBack = enq.querySelector('[data-quote-back]');
    var qSend = enq.querySelector('button[type="submit"]');
    var picked = function (n) { var r = enq.querySelector('input[name="' + n + '"]:checked'); return r ? r.value : ''; };
    var qty = function () { return enq.elements.quantity.value.trim(); };
    var qUpdate = function () { qCount.textContent = [picked('product'), qty(), picked('brand')].filter(Boolean).length + ' / 3'; };
    var tell = function (text, kind) {
      enqMsg.textContent = text;
      enqMsg.classList.toggle('is-error', kind === 'error');
      enqMsg.classList.toggle('is-ok', kind === 'ok');
    };
    enq.addEventListener('change', qUpdate);
    enq.elements.quantity.addEventListener('input', qUpdate);
    qNext.hidden = false;
    qBack.hidden = false;
    qDetails.hidden = true;
    qNext.addEventListener('click', function () {
      var lines = [];
      if (picked('product')) lines.push('Product: ' + picked('product'));
      if (qty()) lines.push('Quantity: ' + qty());
      if (picked('brand')) lines.push('Brand: ' + picked('brand'));
      var msg = enq.elements.message;
      if (lines.length && !msg.value.trim()) msg.value = lines.join('\n') + '\n\n';
      qSteps.hidden = true;
      qDetails.hidden = false;
      tell('');
      enq.elements.name.focus();
    });
    qBack.addEventListener('click', function () {
      qDetails.hidden = true;
      qSteps.hidden = false;
      qNext.focus();
    });
    enq.addEventListener('submit', function (e) {
      e.preventDefault();
      if (qSend.disabled) return;
      var bad = null;
      ['name', 'company', 'email', 'country', 'message'].forEach(function (n) {
        var f = enq.elements[n];
        var ok = f.value.trim() !== '' && f.checkValidity();
        if (ok) f.removeAttribute('aria-invalid'); else { f.setAttribute('aria-invalid', 'true'); bad = bad || f; }
      });
      if (bad) {
        tell('Please fill in your name, company name, a valid email address, destination country and message.', 'error');
        bad.focus();
        return;
      }
      // until Grainful's Web3Forms key is added, say so rather than pretend the enquiry was sent
      if (/^REPLACE-/.test(enq.elements.access_key.value)) {
        tell('Online enquiries are not connected yet. Please email mail@grainful.in or call +91 80000 37180.', 'error');
        return;
      }
      qSend.disabled = true;
      enq.setAttribute('aria-busy', 'true');
      tell('Sending your enquiry…');
      fetch(enq.action, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(enq) })
        .then(function (r) {
          return r.json().then(function (d) { if (!r.ok || !d.success) throw new Error(d.message || r.status); });
        })
        .then(function () {
          enq.reset();
          qUpdate();
          qSteps.hidden = true;
          qDetails.hidden = true;
          enq.classList.add('is-sent');
          tell('Thank you. Your enquiry has been sent, and we will reply by email.', 'ok');
          enqMsg.focus();
        })
        .catch(function () {
          tell('Sorry, your enquiry could not be sent. Please try again, or email mail@grainful.in.', 'error');
        })
        .then(function () {
          qSend.disabled = false;
          enq.removeAttribute('aria-busy');
        });
    });
  }

  /* ---------- Newsletter subscribe (Mailchimp). Mailchimp's form endpoint does not allow cross-site fetch, so its
     JSONP variant is used to get a confirmed result. (A CSP must allow script-src *.list-manage.com.) Without JS
     the form opens Mailchimp's own page in a new tab. ---------- */
  var form = document.querySelector('[data-subscribe]');
  if (form) {
    form.noValidate = true;
    var input = form.querySelector('input[type="email"]');
    var bot = form.querySelector('[data-subscribe-bot]');
    var msg = form.querySelector('.subscribe-msg');
    var subBtn = form.querySelector('button');
    var say = function (text, isError) { msg.textContent = text; msg.classList.toggle('is-error', !!isError); };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (subBtn.disabled) return;
      if (!input.value.trim() || !input.checkValidity()) {
        say('Please enter a valid email address.', true);
        input.setAttribute('aria-invalid', 'true');
        input.focus();
        return;
      }
      input.removeAttribute('aria-invalid');
      if (/REPLACE/.test(form.action)) {
        say('The newsletter is not connected yet. Please try again later.', true);
        return;
      }
      var cb = 'grainfulSub' + Date.now();
      var s = document.createElement('script');
      var done = function (text, isError) {
        clearTimeout(timer);
        delete window[cb];
        s.remove();
        subBtn.disabled = false;
        say(text, isError);
      };
      var timer = setTimeout(function () { done('Sorry, we could not subscribe you right now. Please try again later.', true); }, 10000);
      window[cb] = function (d) {
        if (d && d.result === 'success') { form.reset(); done('Thank you. Please check your inbox to confirm your subscription.'); return; }
        var m = String((d && d.msg) || '');
        if (/already subscribed/i.test(m)) { done('This email address is already subscribed.'); return; }
        // other Mailchimp messages (e.g. an invalid address) can contain HTML: parse it inertly, show plain text
        var t = new DOMParser().parseFromString(m, 'text/html').body.textContent || '';
        done(t.replace(/^\d+\s*-\s*/, '') || 'Sorry, we could not subscribe you right now. Please try again later.', true);
      };
      s.onerror = function () { done('Sorry, we could not subscribe you right now. Please try again later.', true); };
      s.src = form.action.replace('/subscribe/post?', '/subscribe/post-json?') +
        '&EMAIL=' + encodeURIComponent(input.value.trim()) + '&' + encodeURIComponent(bot.name) + '=&c=' + cb;
      subBtn.disabled = true;
      say('Subscribing…');
      document.head.appendChild(s);
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
