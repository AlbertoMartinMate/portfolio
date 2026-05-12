import './sass/app.scss'

// ── CURSOR
const cursor = document.getElementById('cursor')
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px'
  cursor.style.top  = e.clientY + 'px'
})
document.querySelectorAll('a, button, .project-card, .skill-tag').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('big'))
  el.addEventListener('mouseleave', () => cursor.classList.remove('big'))
})

// ── NAV SCROLL
const navbar = document.getElementById('navbar')
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40)
})

// ── FADE-UP OBSERVER
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible')
      observer.unobserve(e.target)
    }
  })
}, { threshold: 0.15 })

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))

// ── CERTS DATA
const certsData = {
  'Python': [
    { titulo: 'Python Avanzado', institucion: 'MMT Academy', img: 'img/certs/cert-python-avanzado.png' }
  ],
  'HTML / CSS': [
    { titulo: 'CSS Experto',  institucion: 'MMT Academy', img: 'img/certs/cert_css_experto.png' },
    { titulo: 'HTML',         institucion: 'MMT Academy', img: 'img/certs/cert-html.png' }
  ],
  'Terminal/Bash': [
    { titulo: 'Linux & Terminal', institucion: 'MMT Academy', img: 'img/certs/certr-linux_terminal.png' }
  ],
  'Git': [
    { titulo: 'Git & GitHub', institucion: 'MMT Academy', img: 'img/certs/cert-git_git-hub.png' }
  ],
  'IA a Producción': [
    { titulo: 'IA a Producción', institucion: 'MMT Academy', img: 'img/certs/cert-ia-produccion.png' }
  ],
  'SEO': [
    { titulo: 'SEO', institucion: 'MMT Academy', img: 'img/certs/cert-seo.png' }
  ]
}

// ── CERT EXPAND PANEL
const expandPanel = document.getElementById('cert-expand')
const certCards   = document.getElementById('cert-cards')
let activeSkill   = null

function openExpand (skillKey, triggerEl) {
  const list = certsData[skillKey]
  certCards.innerHTML = list.map(c => `
    <div class="cert-card" data-img="${c.img}" role="button" tabindex="0" aria-label="Ver ${c.titulo}">
      <img class="cert-card__thumb" src="${c.img}" alt="${c.titulo}" loading="lazy" />
      <div class="cert-card__info">
        <div class="cert-card__title">${c.titulo}</div>
        <div class="cert-card__inst">${c.institucion}</div>
      </div>
    </div>
  `).join('')

  expandPanel.style.maxHeight = expandPanel.scrollHeight + certCards.scrollHeight + 'px'
  expandPanel.setAttribute('aria-hidden', 'false')

  bindCardEvents()
}

function closeExpand () {
  expandPanel.style.maxHeight = '0'
  expandPanel.setAttribute('aria-hidden', 'true')
  activeSkill = null
}

function bindCardEvents () {
  expandPanel.querySelectorAll('.cert-card').forEach(card => {
    const open = () => openLightbox(card.dataset.img)
    card.addEventListener('click', open)
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open() })
  })
}

document.querySelectorAll('.skill-tag.clickable').forEach(el => {
  const key = el.dataset.skill
  el.addEventListener('click', () => {
    if (activeSkill === key) {
      el.classList.remove('active')
      el.setAttribute('aria-expanded', 'false')
      closeExpand()
      return
    }
    document.querySelectorAll('.skill-tag.clickable').forEach(t => {
      t.classList.remove('active')
      t.setAttribute('aria-expanded', 'false')
    })
    el.classList.add('active')
    el.setAttribute('aria-expanded', 'true')
    activeSkill = key
    openExpand(key, el)
  })
  el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') el.click() })
})

// ── CERT LIGHTBOX
const lightbox     = document.getElementById('cert-lightbox')
const lightboxImg  = lightbox.querySelector('.cert-lightbox__img')
const lightboxBtn  = lightbox.querySelector('.cert-lightbox__btn')

function openLightbox (imgSrc) {
  lightboxImg.src = imgSrc
  lightboxBtn.href = imgSrc
  lightbox.classList.add('open')
  lightbox.setAttribute('aria-hidden', 'false')
  document.body.style.overflow = 'hidden'
}

function closeLightbox () {
  lightbox.classList.remove('open')
  lightbox.setAttribute('aria-hidden', 'true')
  document.body.style.overflow = ''
}

lightbox.querySelector('.cert-lightbox__close').addEventListener('click', closeLightbox)
lightbox.querySelector('.cert-lightbox__backdrop').addEventListener('click', closeLightbox)
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox()
})
