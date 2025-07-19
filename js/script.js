document.querySelector(".icon-menu").addEventListener("click", function (event) {
  event.preventDefault();
  document.body.classList.toggle("menu-open");
});

// Hide header on scroll down, show on scroll up
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
  // Make sure we're not at the top of the page
  if (currentScroll <= 0) {
    header.style.transform = 'translateY(0)';
    lastScrollTop = 0;
    return;
  }
  
  // Add a small threshold to prevent tiny scroll fluctuations from triggering the effect
  if (Math.abs(lastScrollTop - currentScroll) <= 5) {
    return;
  }
  
  if (currentScroll > lastScrollTop) {
    // Scrolling down
    header.style.transform = 'translateY(-100%)';
  } else {
    // Scrolling up
    header.style.transform = 'translateY(0)';
  }
  
  lastScrollTop = currentScroll;
});

// Add custom scroll behavior for navbar links
document.querySelectorAll('.menu__link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      // Calculate position that will place the section exactly at the top of the viewport
      const sectionTop = targetSection.getBoundingClientRect().top;
      const currentScroll = window.pageYOffset;
      const targetScroll = currentScroll + sectionTop;
      
      // Smooth scroll to position
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  });
});

const spollerButtons = document.querySelectorAll("[data-spoller] .spollers-faq__button");

spollerButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const currentItem = button.closest("[data-spoller]");
    const content = currentItem.querySelector(".spollers-faq__text");

    const parent = currentItem.parentNode;
    const isOneSpoller = parent.hasAttribute("data-one-spoller");

    if (isOneSpoller) {
      const allItems = parent.querySelectorAll("[data-spoller]");
      allItems.forEach((item) => {
        if (item !== currentItem) {
          const otherContent = item.querySelector(".spollers-faq__text");
          item.classList.remove("active");
          otherContent.style.maxHeight = null;
        }
      });
    }

    if (currentItem.classList.contains("active")) {
      currentItem.classList.remove("active");
      content.style.maxHeight = null;
    } else {
      currentItem.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});
