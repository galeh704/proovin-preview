document.addEventListener("DOMContentLoaded", () => {
  // Parallax Scrolling Effect
  const parallaxSections = document.querySelectorAll(".parallax");

  window.addEventListener("scroll", () => {
    parallaxSections.forEach((section) => {
      const scrollPosition = window.pageYOffset;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      // Only apply parallax if the section is in or near the viewport
      if (
        scrollPosition + window.innerHeight > sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        const speedFactor = 0.5; // Adjust this value for faster/slower parallax
        const yPos = (scrollPosition - sectionTop) * speedFactor;

        // For background-image parallax on the section itself
        section.style.backgroundPositionY = `${-yPos}px`;

        // For individual layers within the parallax section
        const layers = section.querySelectorAll(".parallax-layer");
        layers.forEach((layer, index) => {
          // Different speeds for different layers
          const layerSpeed = (index + 1) * 0.2; // Adjust speed multiplier
          const layerYPos = yPos * layerSpeed;
          layer.style.transform = `translateY(${layerYPos}px)`;
        });
      }
    });
  });

  // Responsive Navbar (Hamburger Menu)
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const navLinks = document.querySelector(".nav-links");
  const ctaButtons = document.querySelector(".navbar .cta-buttons");

  hamburgerMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    ctaButtons.classList.toggle("active");
    hamburgerMenu.classList.toggle("open");
  });

  // Close mobile nav when a link is clicked
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        ctaButtons.classList.remove("active");
        hamburgerMenu.classList.remove("open");
      }
    });
  });

  // Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      // Check if it's a mobile nav link, then close menu
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        ctaButtons.classList.remove("active");
        hamburgerMenu.classList.remove("open");
      }

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Animation on Scroll with Intersection Observer
  const animateElements = document.querySelectorAll(".animate-on-scroll");

  const observerOptions = {
    root: null, // viewport
    rootMargin: "0px",
    threshold: 0.1, // 10% of the element must be visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Optional: Stop observing after animation to save resources
        // observer.unobserve(entry.target); // Uncomment if you want elements to only animate once
      } else {
        // Optional: Remove 'active' class when element leaves viewport
        // This makes the animation repeat on scroll up/down
        // entry.target.classList.remove('active'); // Uncomment if you want animations to reset when out of view
      }
    });
  }, observerOptions);

  animateElements.forEach((element) => {
    observer.observe(element);
  });

  // Apply fade-in animation to hero content when page loads
  // These elements are often visible immediately, so applying 'active' on load
  const heroContentH1 = document.querySelector(".hero-content h1");
  if (heroContentH1) {
    heroContentH1.classList.add("active");
  }
  const heroContentP = document.querySelector(".hero-content p");
  if (heroContentP) {
    heroContentP.classList.add("active");
  }
  const heroContentCTA = document.querySelector(".hero-content .hero-cta");
  if (heroContentCTA) {
    heroContentCTA.classList.add("active");
  }

  // FAQ Accordion Functionality
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;

      // Close any currently active FAQ item first (if desired for single open at a time)
      document
        .querySelectorAll(".faq-question.active")
        .forEach((activeQuestion) => {
          if (activeQuestion !== question) {
            // Don't close the one just clicked
            activeQuestion.classList.remove("active");
            activeQuestion.nextElementSibling.classList.remove("active");
          }
        });

      // Toggle active class on the clicked question
      question.classList.toggle("active");
      // Toggle max-height and padding for the answer
      answer.classList.toggle("active");
    });
  });
});
