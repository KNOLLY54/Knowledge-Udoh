
      // Theme Switcher
      const themeSwitch = document.querySelector(".theme-switch");
      const themeOptions = document.querySelectorAll(".theme-option");
      const body = document.body;
      // Check for saved theme preference
      const savedTheme = localStorage.getItem("theme") || "light";
      setTheme(savedTheme);
      themeOptions.forEach((option) => {
        option.addEventListener("click", () => {
          const theme = option.getAttribute("data-theme");
          setTheme(theme);
          localStorage.setItem("theme", theme);
        });
      });
      function setTheme(theme) {
        document.body.className = `theme-${theme}`;
      }
      // Mobile Menu Toggle
      const hamburger = document.querySelector(".hamburger");
      const mobileMenu = document.querySelector(".mobile-menu");
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        mobileMenu.classList.toggle("active");
      });
      // Close mobile menu when clicking a link
      const mobileLinks = document.querySelectorAll(".mobile-menu a");
      mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
          hamburger.classList.remove("active");
          mobileMenu.classList.remove("active");
        });
      });
      // Scroll Reveal Animation
      function revealOnScroll() {
        const reveals = document.querySelectorAll(".reveal");
        reveals.forEach((element) => {
          const windowHeight = window.innerHeight;
          const elementTop = element.getBoundingClientRect().top;
          const elementVisible = 150;

          // Add 'active' class when the element is in view
          if (elementTop < windowHeight - elementVisible) {
            element.classList.add("active");
          } else {
            // Remove 'active' class when the element is out of view
            element.classList.remove("active");
          }
        });
      }

      // Attach the function to scroll and load events
      window.addEventListener("scroll", revealOnScroll);
      window.addEventListener("load", revealOnScroll);
      // Smooth Scrolling
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const targetId = this.getAttribute("href");
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: "smooth",
            });
          }
        });
      });
      // Custom Checkbox
      const checkbox = document.getElementById("agreement");
      const checkMark = document.querySelector(".check-mark");
      checkbox.addEventListener("change", function () {
        if (this.checked) {
          checkMark.style.opacity = 1;
          checkMark.previousElementSibling.style.backgroundColor = "#6366f1";
          checkMark.previousElementSibling.style.borderColor = "#6366f1";
        } else {
          checkMark.style.opacity = 0;
          checkMark.previousElementSibling.style.backgroundColor = "";
          checkMark.previousElementSibling.style.borderColor = "";
        }
      });
      // Project Filtering
      const filterButtons = document.querySelectorAll(".project-filter");
      const projectCards = document.querySelectorAll(".project-card");
      filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
          // Update active filter button
          filterButtons.forEach((btn) => {
            btn.classList.remove("bg-primary", "text-white");
            btn.classList.add("hover:bg-primary/10");
          });
          button.classList.add("bg-primary", "text-white");
          button.classList.remove("hover:bg-primary/10");
          const filter = button.getAttribute("data-filter");
          projectCards.forEach((card) => {
            if (
              filter === "all" ||
              card.getAttribute("data-category").includes(filter)
            ) {
              card.style.display = "block";
            } else {
              card.style.display = "none";
            }
          });
        });
      });
      // Animate skill progress on scroll
      function animateSkillProgress() {
        const skillCircles = document.querySelectorAll(".skill-progress");
        skillCircles.forEach((circle) => {
          const value =
            100 -
            parseInt(
              circle.parentElement.parentElement.querySelector("span")
                .textContent
            );
          const circumference = 2 * Math.PI * 45;
          const offset = circumference * (value / 100);
          if (isElementInViewport(circle)) {
            circle.style.strokeDashoffset = offset;
          }
        });
      }
      function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
        );
      }
      window.addEventListener("scroll", animateSkillProgress);
      window.addEventListener("load", animateSkillProgress);
      // Create particles for hero section
      function createParticles() {
        const particlesContainer = document.querySelector(
          ".particles-container"
        );
        const particleCount = 40;
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement("div");
          particle.classList.add("particle");
          // Random size
          const size = Math.random() * 40 + 10;
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          // Random position
          particle.style.left = `${Math.random() * 100}%`;
          particle.style.top = `${Math.random() * 100}%`;
          // Random animation duration and delay
          const duration = Math.random() * 25 + 10;
          const delay = Math.random() * 8;
          particle.style.animationDuration = `${duration}s`;
          particle.style.animationDelay = `${delay}s`;
          // Random opacity
          particle.style.opacity = Math.random() * 0.3 + 0.1;
          particlesContainer.appendChild(particle);
        }
      }
      createParticles();
      // Typing effect for hero heading
      function typeEffect() {
        const texts = [
          "Hello and Welcome",
          "Hi, I'm Knowledge",
          "I build experiences",
          "I create solutions",
          "I design interfaces",
          "Web developer",
          "Frontend developer",
          "UI/UX designer",
        ];
        const typingElement = document.querySelector(".typing-text");
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100; // Typing speed in milliseconds
        const deletingSpeed = 60; // Deleting speed in milliseconds
        const pauseBetweenTexts = 2000; // Pause before starting the next text
        const pauseBeforeDeleting = 1000; // Pause before deleting the text

        function type() {
          const currentText = texts[textIndex];

          if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
          } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
          }

          if (!isDeleting && charIndex === currentText.length) {
            // Pause before deleting
            isDeleting = true;
            setTimeout(type, pauseBeforeDeleting);
          } else if (isDeleting && charIndex === 0) {
            // Move to the next text
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, typingSpeed);
          } else {
            setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
          }
        }

        // Start typing effect
        type();
      }

      typeEffect();
    