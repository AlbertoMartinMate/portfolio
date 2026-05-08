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

// ── CERT MODAL
const modal       = document.getElementById('cert-modal')
const modalTitle  = modal.querySelector('.cert-modal__title')
const modalViewer = modal.querySelector('.cert-modal__viewer')
const modalNav    = modal.querySelector('.cert-modal__nav')
const modalCounter= modal.querySelector('.cert-modal__counter')
const modalPrev   = modal.querySelector('.cert-modal__prev')
const modalNext   = modal.querySelector('.cert-modal__next')

let certs = []
let current = 0

const base = import.meta.env.BASE_URL

function renderCert () {
  const src = base + certs[current]
  modalViewer.innerHTML = `
    <iframe src="${src}" title="Certificado"></iframe>
    <a class="cert-modal__open-link" href="${src}" target="_blank" rel="noopener">Abrir en nueva pestaña ↗</a>
  `
  modalCounter.textContent = `${current + 1} / ${certs.length}`
}

function openModal (label, certList, pending) {
  certs   = certList
  current = 0
  modalTitle.textContent = label

  if (pending) {
    modalViewer.innerHTML = `
      <div class="cert-modal__pending">
        <span>⏳</span>
        Certificado en camino…
      </div>
    `
    modalNav.classList.add('hidden')
  } else {
    renderCert()
    modalNav.classList.toggle('hidden', certs.length <= 1)
  }

  modal.classList.add('open')
  document.body.style.overflow = 'hidden'
}

function closeModal () {
  modal.classList.remove('open')
  document.body.style.overflow = ''
  setTimeout(() => { modalViewer.innerHTML = '' }, 250)
}

document.querySelectorAll('.skill-tag.clickable').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault()
    const pending  = el.hasAttribute('data-pending')
    const certAttr = el.dataset.certs ?? ''
    const certList = certAttr ? certAttr.split(',') : []
    openModal(el.textContent.trim(), certList, pending)
  })
})

modalPrev.addEventListener('click', () => {
  current = (current - 1 + certs.length) % certs.length
  renderCert()
})

modalNext.addEventListener('click', () => {
  current = (current + 1) % certs.length
  renderCert()
})

modal.querySelector('.cert-modal__close').addEventListener('click', closeModal)
modal.querySelector('.cert-modal__backdrop').addEventListener('click', closeModal)

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal()
})
