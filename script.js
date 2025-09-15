// Progress bar
window.onscroll = function () {
  progressFunction();
  navFunction();
};

function progressFunction() {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
}

// Navbar scroll effect
function navFunction() {
  const navbar = document.getElementById("navbar");
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

// Mobile menu toggle
document.getElementById("menuToggle").addEventListener("click", function () {
  document.querySelector(".nav-links").classList.toggle("active");
  this.classList.toggle("active");
});

// Skill bars animation
document.addEventListener("DOMContentLoaded", function () {
  const skillLevels = document.querySelectorAll(".skill-level");

  // Initialize skill levels to 0
  skillLevels.forEach((level) => {
    level.style.width = "0";
  });

  // Animate skill bars when in viewport
  const skillsSection = document.getElementById("skills");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillLevels.forEach((level) => {
            const width = level.getAttribute("data-level");
            level.style.width = width + "%";
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(skillsSection);
});

// Theme toggle functionality - Default to dark mode
const themeToggle = document.querySelector('.bb8-toggle__checkbox');

// Always set dark mode as default, unless light mode is explicitly saved
if (localStorage.getItem("theme") === "light") {
  document.documentElement.setAttribute("data-theme", "light");
  if (themeToggle) themeToggle.checked = false;
} else {
  document.documentElement.setAttribute("data-theme", "dark");
  if (themeToggle) themeToggle.checked = true;
  // Ensure dark mode is saved as preference
  localStorage.setItem("theme", "dark");
}

if (themeToggle) {
  themeToggle.addEventListener("change", function () {
    if (this.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  });
}

// Form submission
// Get the form and result elements
        const form = document.getElementById('contactForm');
        const result = document.getElementById('result');
        const submitBtn = document.getElementById('submitBtn');
        
        // Form submission handler
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate email
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            const email = emailInput.value.trim();
            
            // Simple email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(email)) {
                emailError.style.display = "block";
                emailInput.classList.add("error-field");
                return false;
            }
            
            // If validation passes, show loading state
            const btnText = submitBtn.querySelector('span');
            const originalText = btnText.textContent;
            btnText.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Capture form data
            const formData = new FormData(form);
            
            // Send form data to Web3Forms
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(async (response) => {
                let json = await response.json();
                
                if (response.status === 200) {
                    // Success
                    result.className = 'notification success';
                    result.innerHTML = json.message;
                    form.reset();
                } else {
                    // Error
                    console.log(response);
                    result.className = 'notification error';
                    result.innerHTML = json.message || 'Sorry, there was an error sending your message. Please try again later.';
                }
            })
            .catch(error => {
                console.log(error);
                result.className = 'notification error';
                result.innerHTML = 'Sorry, there was an error sending your message. Please try again later.';
            })
            .finally(function() {
                // Show result
                result.classList.remove('hidden');
                
                // Reset button
                btnText.textContent = originalText;
                submitBtn.disabled = false;
                
                // Hide result after 5 seconds
                setTimeout(() => {
                    result.classList.add('hidden');
                }, 5000);
            });
        });
        
        // Clear email error when user starts typing
        document.getElementById("email").addEventListener("input", function() {
            document.getElementById("emailError").style.display = "none";
            this.classList.remove("error-field");
        });

// Enhanced carousel functionality for skills section
document.addEventListener("DOMContentLoaded", function () {
  const carouselContainer = document.querySelector(
    ".skills-carousel-container"
  );
  const carousel = document.querySelector(".skills-carousel");

  if (!carousel) return;

  // Clone the carousel items for seamless looping
  const items = carousel.querySelectorAll(".skill-item");
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    carousel.appendChild(clone);
  });

  // Pause animation on hover
  carouselContainer.addEventListener("mouseenter", () => {
    carousel.style.animationPlayState = "paused";
  });

  carouselContainer.addEventListener("mouseleave", () => {
    carousel.style.animationPlayState = "running";
  });

  // Adjust animation duration based on number of items
  const totalItems = items.length * 2;
  const duration = totalItems * 1; 
  carousel.style.animationDuration = `${duration}s`;
});
