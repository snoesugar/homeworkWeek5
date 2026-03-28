import './assets/scss/all.scss';
import 'bootstrap'; 
import './GSAP';

document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('.needs-validation');

  Array.prototype.slice.call(forms).forEach((form) => {
    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
});

document.querySelectorAll('.modal').forEach((modal) => {
  modal.addEventListener('hide.bs.modal', () => {
    const activeElement = document.activeElement;
    if (activeElement && modal.contains(activeElement)) {
      activeElement.blur();
    }
  });
});
