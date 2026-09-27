const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if(!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }
    formStatus.textContent = 'Your details are valid. The form is not connected to email yet.';
});
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function () {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});