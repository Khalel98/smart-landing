$(document).ready(function () {
  //TOGGLE MENU
  $(".hamburger-menu").click(function () {
    $(".hamburger-menu").toggleClass("humClicked");
    $("#menu_content").toggleClass("closed-menu", "open-menu");
  });

  //ANIMATE STATISTICS
  $(".section__statistics__item__count").each(function () {
    var size = $(this).text().split(".")[1]
      ? $(this).text().split(".")[1].length
      : 0;
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).text(),
        },
        {
          duration: 5000,
          step: function (func) {
            $(this).text(parseFloat(func).toFixed(size));
          },
        }
      );
  });
});

//ANIMATION OF FEATURES ITEMS
$(function () {
  var timelineBlocks = $(".timeline-item"),
    offset = 0.8;

  //hide timeline blocks which are outside the viewport
  hideBlocks(timelineBlocks, offset);

  //on scolling, show/animate timeline blocks when entering the viewport
  $(window).on("scroll", function () {
    !window.requestAnimationFrame
      ? setTimeout(function () {
          showBlocks(timelineBlocks, offset);
        }, 100)
      : window.requestAnimationFrame(function () {
          showBlocks(timelineBlocks, offset);
        });
  });

  function hideBlocks(blocks, offset) {
    blocks.each(function () {
      $(this).offset().top >
        $(window).scrollTop() + $(window).height() * offset &&
        $(this).find(".timeline-icon, .timeline-content").addClass("is-hidden");
    });
  }

  function showBlocks(blocks, offset) {
    blocks.each(function () {
      $(this).offset().top <=
        $(window).scrollTop() + $(window).height() * offset &&
        $(this).find(".timeline-icon").hasClass("is-hidden") &&
        $(this)
          .find(".timeline-icon, .timeline-content")
          .removeClass("is-hidden")
          .addClass("animate-it");
    });
  }
});

//SWIPER SLIDER
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 5500,
    disableOnInteraction: false,
  },

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  //navigation: {
  //  nextEl: ".swiper-button-next",
  //  prevEl: ".swiper-button-prev",
  //},

  // And if we need scrollbar
  //scrollbar: {
  //  el: ".swiper-scrollbar",
  //},
});

//SMOOTH SLIDE TO NEEDED SECTION
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav a");

  for (const link of navLinks) {
    link.addEventListener("click", smoothScroll);
  }

  function smoothScroll(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute("href");
    const targetPosition = document.querySelector(targetId).offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000; // Adjust the duration (in milliseconds) as needed

    let start = null;

    function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Easing function
    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }
});

//INITIALIZE WOW
var wow = new WOW();
wow.init();
