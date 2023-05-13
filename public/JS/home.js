// Navbar Position
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  const section2 = document.querySelector('.section-2');
  const section2Top = section2.offsetTop;
  
  if (window.pageYOffset >= section2Top - 1) {
    navbar.classList.add('nav-scroll');
  } else {
    navbar.classList.remove('nav-scroll');
  }
});
// End of Navbar Position

// Banner Swiper
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  effect: "fade",
  loop: true,
  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
  },
});

// End of Banner Swiper

// Dynamic Navbar
// Get all the links in the navbar
const navbarLinks = document.querySelectorAll(".nav-link a");

// Loop through each link and add an event listener
navbarLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    // Prevent default behavior
    event.preventDefault();

    // Get the section ID from the href attribute
    const sectionId = link.getAttribute("href");

    // Scroll to the section
    document.querySelector(sectionId).scrollIntoView({
      behavior: "smooth",
    });

    setTimeout(() => {
      document.querySelector(".navbar").classList.remove("show");
      if(document.body.style.overflow === "hidden") {
        document.body.style.overflow = "scroll";
      }
    }, 150);
  });
});

// Add an event listener to the window object that listens for scroll events
window.addEventListener("scroll", (event) => {
  // Get the current scroll position
  const scrollPosition =
    window.pageYOffset || document.documentElement.scrollTop;

  // Loop through each section and check if it's visible on the screen
  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollPosition >= sectionTop - sectionHeight / 8) {
      // Get the section ID
      const sectionId = section.getAttribute("id");

      // Remove the active class from all the links in the navbar
      navbarLinks.forEach((link) => {
        link.parentElement.classList.remove("active");
      });

      // Add the active class to the link that corresponds to the current section
      document
        .querySelector(`.nav-link a[href="#${sectionId}"]`)
        .parentElement.classList.add("active");
    }
  });
});

// End of Dynamic Navbar

// Sidebar
const menuBtn = document.querySelector(".burger");

menuBtn.addEventListener("click", () => {
  document.querySelector(".navbar").classList.toggle("show");
  if(document.querySelector(".navbar").classList.contains("show")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "scroll"
  }
});
// End of Sidebar

// Deliver Message
// Get the status parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const status = urlParams.get('deliverStatus');

// Display a message based on the status
if (status === 'success') {
  document.getElementById("message").style.display = 'block'
  document.getElementById("message").style.background = '#74c69d'
  document.querySelector("#message p").innerHTML = "Message delivered successfully.";
} else if (status === 'error') {
  document.getElementById("message").style.display = 'block'
  document.getElementById("message").style.background = '#ffd6a5'
  document.querySelector("#message p").innerHTML = "Error delivering message. Please try again.";
}

document.querySelector('.btn-close-msg').addEventListener('click', () => {
  document.getElementById("message").style.display = 'none'
})
// End of Deliver Message
