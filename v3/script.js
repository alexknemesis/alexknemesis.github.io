document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear()

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenu = document.getElementById("mobileMenu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on a link
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu a")
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
    })
  })

  // Tabs functionality
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons and contents
      tabBtns.forEach((btn) => btn.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Show corresponding content
      const tabId = this.getAttribute("data-tab")
      document.getElementById(tabId).classList.add("active")
    })
  })

  // Form submission
  const quoteForm = document.getElementById("quoteForm")
  if (quoteForm) {
    quoteForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const phone = document.getElementById("phone").value
      const email = document.getElementById("email").value
      const service = document.getElementById("service").value
      const message = document.getElementById("message").value

      // Here you would typically send the form data to a server
      // For this example, we'll just show an alert
      alert(`Gracias ${name} por contactarnos. Nos comunicaremos con usted a la brevedad.`)

      // Reset form
      quoteForm.reset()
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Add active class to nav links based on scroll position
  function setActiveNavLink() {
    const sections = document.querySelectorAll("section[id]")
    const scrollPosition = window.scrollY

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll(".main-nav a").forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", setActiveNavLink)

  // Initialize active nav link on page load
  setActiveNavLink()
})

// swiper
// var swiper = new Swiper('.swiper-container', {
//   loop: true,
//   pagination: {
//     el: '.swiper-pagination',
//   },
// });

const swiper = new Swiper('.swiper', {
  loop: true,
  initialSlide: 2,
  slidesPerView: 'auto',
  centeredSlides: true,
  navigation: {
    enabled: false,
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
})

// swiper.on("slideChangeTransitionStart", () => {
//   swiper.el.classList.add("start")
// })

// swiper.on("slideChangeTransitionEnd", () => {
//   swiper.el.classList.remove("start")
// })

// swiper.el.addEventListener("mouseenter", function() {
//   swiper.el.classList.add("end")
// })
                           
// swiper.el.addEventListener("mouseleave", function() {
//    swiper.el.classList.remove("end")
// })
