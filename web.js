//--------------Menu Functionality------------------
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links ul li a");
  const popupForm = document.getElementById("about-popup");
  const popupOverlay = document.getElementById("popup-overlay");
  const closePopupBtn = document.getElementById("close-popup");

  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");

      // Close nav menu
      document.getElementById("navLinks").classList.remove("show");
      document.getElementById("navWrapper").classList.remove("show");
      document.body.style.overflow = "auto";

      // Contact link (popup)
      if (this.id === "openContactPopup") {
        popupForm.classList.add("active");
        popupOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
      } else {
        // Scroll to section after menu closes
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }, 600);
        }
      }
    });
  });

  // Close popup
  closePopupBtn.addEventListener("click", () => {
    popupForm.classList.remove("active");
    popupOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  });
});



//-----------------SideMenu Functionality--------------------------  

const navWrapper = document.getElementById("navWrapper");
const navLinks = document.getElementById("navLinks");

function showMenu() {
  navWrapper.classList.add("show");
  setTimeout(() => {
    navLinks.classList.add("show");
    document.body.style.overflow = "hidden";
  }, 100); // after swipe
}

function hidemenu() {
  navLinks.classList.remove("show");
  setTimeout(() => {
    navWrapper.classList.remove("show");
    document.body.style.overflow = "auto";
  }, 600);
}


// ---------------Underline Nav Link Functionality ------------------------------
document.querySelectorAll('.nav-links li').forEach(li => {
    li.addEventListener('mouseenter', () => {
        li.classList.remove('hover-out', 'hover-done', 'show-after');
        li.classList.add('hover-in');

        // Delay showing ::after (solid underline) to follow ::before swipe
        setTimeout(() => {
            if (li.classList.contains('hover-in')) {
                li.classList.add('show-after');
            }
        }, 500); // delay must match ::before width transition
    });

    li.addEventListener('mouseleave', () => {
        li.classList.remove('hover-in', 'show-after');
        li.classList.add('hover-out');

        setTimeout(() => {
            li.classList.add('hover-done');
        }, 300); // Let the rainbow finish swipe before removing
    });
});


 //-----------Popup Form Functionality -------------
const aboutBtn = document.querySelector(".home-button");
const popup = document.getElementById("about-popup");
const overlay = document.getElementById("popup-overlay");
const closeBtn = document.getElementById("close-popup");

aboutBtn.addEventListener("click", () => {
  popup.classList.add("active");
  overlay.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  popup.classList.remove("active");
  overlay.classList.remove("active");
});

const nameInput = document.getElementById("name"); // Updated to match the new ID
const emailInput = document.getElementById("email"); // Updated to match the new ID
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send-btn");

function isValidEmail(email) {
  // Basic format: string@string.string
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  const isFormValid = name !== "" && message !== "" && isValidEmail(email);
  sendButton.disabled = !isFormValid;
}

// Listen for input changes
nameInput.addEventListener("input", validateForm);
  emailInput.addEventListener("input", validateForm);
  messageInput.addEventListener("input", validateForm);
  
  document.getElementById("close-popup").addEventListener("click", () => {
    document.getElementById("about-popup").classList.remove("active");
  });
  
  popup.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  
  document.querySelector('.home-button').addEventListener('click', () => {
      const popup = document.getElementById('about-popup');
      popup.classList.add('active');
  });

//-------------Email Functionality for Popup----------------
// Update EmailJS functionality to use sendForm and the provided serviceId
const btn = document.getElementById('send-btn');

// Add event listener to the form
const form = document.getElementById('form');
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    btn.value = 'Sending...'; // Update button text

    const serviceID = 'service_wn290oa'; // Use the provided service ID
    const templateID = 'template_23q7rlg'; // Template ID

    // Use emailjs.sendForm to send the form data
    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.value = 'Send Email'; // Reset button text
            alert('Your Email Has Been Sent!'); // Notify user of success
        }, (err) => {
            btn.value = 'Send Email'; // Reset button text
            alert(JSON.stringify(err)); // Notify user of error
        });
});
// -----------TypeWriter Effect for Section Titles-------------
document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("experienceTitle");
  const textSpan = document.getElementById("experienceText");
  const periodSpan = title.querySelector(".glow-period");
  const fullText = textSpan.textContent;

  textSpan.textContent = ''; // clear the text for typing

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !title.classList.contains("active")) {
        title.classList.add("active");
        startTypewriter(textSpan, fullText, periodSpan, title);
        observer.disconnect(); // stop once triggered
      }
    });
  });

  observer.observe(title);
});

function startTypewriter(span, text, periodSpan, titleEl) {
  let index = 0;
  const speed = 100; // typing speed in ms

  const interval = setInterval(() => {
    span.textContent += text.charAt(index);
    index++;
  }, speed);
}

document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("typewriterProjectsTitle");
  const textSpan = document.getElementById("typewriterProjectsText");
  const periodSpan = title.querySelector(".glow-period");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !title.classList.contains("active")) {
        title.classList.add("active");
        startTypewriter(textSpan, periodSpan);
        observer.disconnect();
      }
    });
  });

  observer.observe(title);
});


//------------Card Swipe Functionality----------------------
 document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 1
    });

    document.querySelectorAll('.experience-card').forEach(card => {
      observer.observe(card);
    });
  });

//-----------Projects Content Reveal------------------
document.addEventListener("DOMContentLoaded", () => {
  const screenWidth = window.innerWidth;
  const thresholdValue = screenWidth < 820 ? 0.1 : 0.3;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target); // trigger only once
      }
    });
  }, {
    threshold: thresholdValue
  });

  const target = document.querySelector(".projects-section");
  if (target) observer.observe(target);
});



//----------Other Projects Reveal-----------------------
document.addEventListener("DOMContentLoaded", () => {
  const screenWidth = window.innerWidth;
  const thresholdValue = screenWidth < 820 ? 0.3 : 0.7;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: thresholdValue
  });

  const target = document.querySelector(".thecollection");
  if (target) observer.observe(target);
});

  //------------------ Load in Page Function-----------------------------
  document.addEventListener("DOMContentLoaded", () => {
    const loaderWrapper = document.getElementById("loader-wrapper");

    // Disable scrolling while loader is active
    document.body.style.overflow = "hidden";

    // Simulate a loading delay (customize this duration)
    setTimeout(() => {
      document.body.classList.add("loaded");

      // Re-enable scrolling
      document.body.style.overflow = "auto";
    }, 2000); // 2 seconds (matches your loader animation)
  });

//-------------Scroll To Top Functionality--------------
document.addEventListener("DOMContentLoaded", () => {
  const scrollToTopBtn = document.getElementById('scrollToTop');
  const topSection = document.getElementById('top');

  if (scrollToTopBtn && topSection) {
    scrollToTopBtn.addEventListener('click', () => {
      topSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
