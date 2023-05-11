// Navbar Position
$(document).ready(function () {
    $(window).scroll(function () {
      var scroll = $(window).scrollTop();
      if (scroll >= 100) {
        $(".navbar").addClass("nav-scroll");
      } else {
        $(".navbar").removeClass("nav-scroll");
      }
    });
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
  
  // Sidebar
  const menuBtn = document.querySelector(".burger");
  
  menuBtn.addEventListener("click", () => {
    document.querySelector(".navbar").classList.toggle("show");
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
    document.querySelector("#message p").innerHTML = "Application submitted successfully!";
  } else if (status === 'error') {
    document.getElementById("message").style.display = 'block'
    document.getElementById("message").style.background = '#ffd6a5'
    document.querySelector("#message p").innerHTML = "Something went wrong!";
  }
  
  document.querySelector('.btn-close-msg').addEventListener('click', () => {
    document.getElementById("message").style.display = 'none'
  })
  // End of Deliver Message