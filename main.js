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
