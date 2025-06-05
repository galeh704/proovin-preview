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

  // Testimonial Slider
  const slider = document.querySelector(".testimonial-slider");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const testimonialItems = document.querySelectorAll(".testimonial-item");
  let currentIndex = 0;

  function updateSlider() {
    if (testimonialItems.length === 0) return; // Handle empty slider
    const itemWidth = testimonialItems[0].clientWidth;
    slider.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
  }

  // Initialize slider width on load and resize
  window.addEventListener("resize", updateSlider);
  updateSlider(); // Initial call

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % testimonialItems.length;
    updateSlider();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
    updateSlider();
  });

  // Auto-advance slider
  let autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonialItems.length;
    updateSlider();
  }, 5000); // Change slide every 5 seconds

  // Pause auto-slide on hover
  if (slider && slider.parentNode) {
    // Check if elements exist
    slider.parentNode.addEventListener("mouseenter", () =>
      clearInterval(autoSlideInterval)
    );
    slider.parentNode.addEventListener("mouseleave", () => {
      autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonialItems.length;
        updateSlider();
      }, 5000);
    });
  }

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

  // Smooth Scrolling for anchor links (Already implemented but confirming)
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
        // observer.unobserve(entry.target);
      } else {
        // Optional: Remove 'active' class when element leaves viewport
        // This makes the animation repeat on scroll up/down
        // entry.target.classList.remove('active');
      }
    });
  }, observerOptions);

  animateElements.forEach((element) => {
    observer.observe(element);
  });

  // Apply fade-in animation to hero content when page loads
  // We can add a separate class for initial load
  const heroContentCTA = document.querySelector(".hero-content .hero-cta");
  if (heroContentCTA) {
    heroContentCTA.classList.add("active"); // Directly apply active class to hero CTA
  }
  const heroContentH1 = document.querySelector(".hero-content h1");
  if (heroContentH1) {
    heroContentH1.classList.add("active");
  }
  const heroContentP = document.querySelector(".hero-content p");
  if (heroContentP) {
    heroContentP.classList.add("active");
  }
  const heroImageMockup = document.querySelector(".hero-image-mockup");
  if (heroImageMockup) {
    heroImageMockup.classList.add("active");
  }

  // FAQ Accordion Functionality
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling; // The div containing the answer

      // Toggle active class on the clicked question
      question.classList.toggle("active");

      // Toggle max-height and padding for the answer
      if (answer.classList.contains("active")) {
        answer.classList.remove("active");
      } else {
        // Close all other open answers before opening the new one
        document
          .querySelectorAll(".faq-answer.active")
          .forEach((openAnswer) => {
            openAnswer.classList.remove("active");
            openAnswer.previousElementSibling.classList.remove("active"); // Remove active from question
          });
        answer.classList.add("active");
      }
    });
  });
});
