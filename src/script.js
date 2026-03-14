/* ═══════════════════════════════════════════════════════
   Acropolis Blockchain Club — Events Script
   ═══════════════════════════════════════════════════════ */

/* ─── Data ─────────────────────────────────────────────── */
const EVENTS = [
  {
    id: '1',
    title: 'Mastering Job Hunts During Recession',
    date: 'February 20, 2024',
    time: '2:00 PM – 3:30 PM',
    location: 'Lab 116, CSE Department',
    description: 'Insider tips, strategies, and a roadmap to land high-paying roles even when the market is tight.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800',
    category: 'Seminar',
    theme: 'blue',
    icon: 'fa-briefcase',
    tags: ['Career', 'Growth'],
    status: 'Past',
    sortDate: '2024-02-20',
  },
  {
    id: '2',
    title: 'Blockchain Event Winners Announcement',
    date: 'November 04, 2023',
    time: 'N/A',
    location: 'Acropolis Campus',
    description: 'Celebrating the brilliant minds and winners of our recent blockchain competition.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    category: 'Meetup',
    theme: 'teal',
    icon: 'fa-trophy',
    tags: ['Awards', 'Community'],
    status: 'Past',
    sortDate: '2023-11-04',
  },
  {
    id: '3',
    title: 'Community Interactions Session',
    date: 'October 11, 2023',
    time: 'N/A',
    location: 'Acropolis Campus',
    description: 'A vibrant session focused on community interactions, networking, and sharing blockchain insights.',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800',
    category: 'Meetup',
    theme: 'teal',
    icon: 'fa-users',
    tags: ['Networking', 'Community'],
    status: 'Past',
    sortDate: '2023-10-11',
  },
  {
    id: '4',
    title: 'Code Block: Blockchain Journey',
    date: 'March 27, 2023',
    time: '10:30 AM – 1:30 PM',
    location: 'Lab 121, CSE Department',
    description: 'Build your own dApp, NFT, and Smart Contracts with Mr. Uttam Singh from Flare Network.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    category: 'Workshop',
    theme: 'orange',
    icon: 'fa-code',
    tags: ['Solidity', 'NFT', 'Hands-on'],
    status: 'Past',
    sortDate: '2023-03-27',
  },
  {
    id: '5',
    title: 'Private & Public Blockchain Use Cases',
    date: 'March 10, 2023',
    time: '7:00 PM',
    location: 'Virtual · Microsoft Teams',
    description: 'Valuable insights on industry trends and real-world applications of private and public blockchains.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
    category: 'Webinar',
    theme: 'purple',
    icon: 'fa-globe',
    tags: ['Industry', 'Use Cases'],
    status: 'Past',
    sortDate: '2023-03-10',
  },
  {
    id: '6',
    title: 'Beginners Guide to LinkedIn',
    date: 'January 17, 2023',
    time: '8:00 PM – 9:00 PM',
    location: 'Virtual · Google Meet',
    description: 'ABC\'s very first event — teaching LinkedIn profile building, networking basics, and personal branding.',
    image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=800',
    category: 'Webinar',
    theme: 'blue',
    icon: 'fa-linkedin',
    tags: ['LinkedIn', 'Beginner'],
    status: 'Past',
    sortDate: '2023-01-17',
  },
];

/* ─── Helpers ───────────────────────────────────────────── */

/** Days until a sortDate string (negative = in the past) */
function daysUntil(sortDate) {
  return Math.ceil((new Date(sortDate + 'T00:00:00') - Date.now()) / 86_400_000);
}

/** Returns a human-readable countdown label for upcoming events */
function countdownLabel(days) {
  if (days === 0) return 'Today!';
  if (days === 1) return 'Tomorrow';
  if (days > 0)  return `In ${days} days`;
  return null;
}

/** Escape HTML to prevent XSS from data strings */
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ─── Card Builder ──────────────────────────────────────── */
function createEventCard(event) {
  const isPast     = event.status === 'Past';
  const days       = daysUntil(event.sortDate);
  const countdown  = !isPast ? countdownLabel(days) : null;

  // Status chip (top-right of banner)
  const statusChip = isPast
    ? `<span class="card-past-badge">Completed</span>`
    : countdown
      ? `<span class="card-past-badge" style="color:var(--teal-bright);background:rgba(0,221,180,.13);">${esc(countdown)}</span>`
      : '';

  // Tags
  const tagsHtml = (event.tags || [])
    .map(t => `<span class="card-tag theme-${esc(event.theme)}">${esc(t)}</span>`)
    .join('');

  // CTA button
  const ctaHtml = isPast
    ? `<button class="card-cta card-cta-ghost" aria-label="View recap of ${esc(event.title)}">
         <i class="fa-solid fa-eye" aria-hidden="true"></i> Recap
       </button>`
    : `<button class="card-cta card-cta-primary" aria-label="Register for ${esc(event.title)}">
         <i class="fa-solid fa-arrow-right" aria-hidden="true"></i> Register
       </button>`;

  // Banner: real image if available, else gradient + icon
  const bannerContent = event.image
    ? `<img
         src="${esc(event.image)}"
         alt="${esc(event.title)} event photo"
         class="card-banner-img"
         loading="lazy"
         decoding="async"
       />`
    : `<div class="card-banner-placeholder">
         <i class="fa-solid ${esc(event.icon || 'fa-calendar')} banner-icon" aria-hidden="true"></i>
       </div>`;

  return `
    <article class="event-card" role="listitem" tabindex="0" aria-label="${esc(event.title)}">
      <div class="card-banner ${event.image ? '' : 'banner-' + esc(event.theme)}">
        ${bannerContent}
        <div class="card-banner-overlay" aria-hidden="true"></div>
        <span class="card-category theme-${esc(event.theme)}">${esc(event.category)}</span>
        ${statusChip}
      </div>

      <div class="card-body">
        <div class="card-meta">
          <span class="card-meta-item">
            <i class="fa-regular fa-calendar" aria-hidden="true"></i>
            <time datetime="${esc(event.sortDate)}">${esc(event.date)}</time>
          </span>
          ${event.time && event.time !== 'N/A' ? `
          <span class="card-meta-item">
            <i class="fa-regular fa-clock" aria-hidden="true"></i>
            ${esc(event.time)}
          </span>` : ''}
          <span class="card-meta-item">
            <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
            ${esc(event.location)}
          </span>
        </div>

        <h4 class="card-title">${esc(event.title)}</h4>
        <p class="card-desc">${esc(event.description)}</p>
      </div>

      <div class="card-footer">
        <div class="card-tags">${tagsHtml}</div>
        ${ctaHtml}
      </div>
    </article>`;
}

/* ─── Render ────────────────────────────────────────────── */
function renderEvents(query = '') {
  const q = query.toLowerCase().trim();

  const matches = (ev) =>
    !q ||
    ev.title.toLowerCase().includes(q) ||
    ev.category.toLowerCase().includes(q) ||
    (ev.tags || []).some(t => t.toLowerCase().includes(q)) ||
    ev.description.toLowerCase().includes(q) ||
    ev.location.toLowerCase().includes(q);

  const upcoming = EVENTS
    .filter(ev => ev.status === 'Upcoming' && matches(ev))
    .sort((a, b) => new Date(a.sortDate) - new Date(b.sortDate));

  const past = EVENTS
    .filter(ev => ev.status === 'Past' && matches(ev))
    .sort((a, b) => new Date(b.sortDate) - new Date(a.sortDate));

  // DOM refs (cached below after DOMContentLoaded)
  const upGrid = document.getElementById('upcomingEventsGrid');
  const paGrid = document.getElementById('pastEventsGrid');
  const noUp   = document.getElementById('noUpcomingEvents');
  const noPa   = document.getElementById('noPastEvents');
  const upCnt  = document.getElementById('upcomingCount');
  const paCnt  = document.getElementById('pastCount');

  if (upGrid) upGrid.innerHTML = upcoming.map(createEventCard).join('');
  if (paGrid) paGrid.innerHTML = past.map(createEventCard).join('');

  if (upCnt) upCnt.textContent = upcoming.length;
  if (paCnt) paCnt.textContent = past.length;

  noUp?.classList.toggle('hidden', upcoming.length > 0);
  noPa?.classList.toggle('hidden', past.length > 0);
}

/* ─── Init ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* Initial render */
  renderEvents();

  /* Debounced search — avoids re-rendering on every keystroke */
  let searchTimer;
  const searchInput = document.getElementById('eventSearch');
  searchInput?.addEventListener('input', (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => renderEvents(e.target.value), 220);
  });

  /* Navbar scroll shadow */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* Hamburger / mobile menu */
  const hamburger  = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger?.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('click', (e) => {
    if (
      mobileMenu?.classList.contains('open') &&
      !navbar?.contains(e.target) &&
      !mobileMenu.contains(e.target)
    ) {
      mobileMenu.classList.remove('open');
      hamburger?.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
    }
  });

  /* Keyboard: close mobile menu on Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      hamburger?.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
      hamburger?.focus();
    }
  });

  /* Scroll-reveal via IntersectionObserver */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = `${i * 0.08}s`;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    revealEls.forEach(el => el.classList.add('visible'));
  }

});
