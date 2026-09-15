/* ============================================================
   COMMON.JS — shared behavior for every page:
   - loads partials/header.html and partials/footer.html into
     the page (so nav + footer only need to be edited in one place)
   - wires up the hamburger / mobile nav
   - marks the current page's nav pill as active automatically
   - runs the scroll-reveal (.reveal) animation
   Each page just needs:
     <div id="site-header"></div>  ...content...  <div id="site-footer"></div>
     <script src="js/common.js"></script>
   ============================================================ */

(function () {
    function loadPartial(placeholderId, url, onLoaded) {
        var el = document.getElementById(placeholderId);
        if (!el) return;
        fetch(url)
            .then(function (res) { return res.text(); })
            .then(function (html) {
                el.outerHTML = html;
                if (onLoaded) onLoaded();
            })
            .catch(function (err) {
                console.error('Could not load ' + url, err);
            });
    }

    function setActiveNav() {
        var page = location.pathname.split('/').pop();
        if (page === '') page = 'index.html';
        document.querySelectorAll('nav a.pill, .mobile-nav a.pill').forEach(function (a) {
            if (a.getAttribute('href') === page) a.classList.add('active');
        });
    }

    function initHamburger() {
        var hamburger = document.getElementById('hamburger');
        var mobileNav = document.getElementById('mobileNav');
        if (!hamburger || !mobileNav) return;

        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('open');
            mobileNav.classList.toggle('open');
            document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
        });

        mobileNav.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                hamburger.classList.remove('open');
                mobileNav.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    function initScrollReveal() {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
    }

    document.addEventListener('DOMContentLoaded', function () {
        loadPartial('site-header', 'partials/header.html', function () {
            initHamburger();
            setActiveNav();
        });
        loadPartial('site-footer', 'partials/footer.html');
        initScrollReveal();
    });
})();
