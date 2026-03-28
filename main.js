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

const blurFocusedElementInsideModal = (modal) => {
  const activeElement = document.activeElement;
  if (activeElement && modal.contains(activeElement)) {
    activeElement.blur();
    document.body.focus();
  }
};


document.querySelectorAll('.modal').forEach((modal) => {
  modal.addEventListener('hide.bs.modal', () => {
  blurFocusedElementInsideModal(modal);
  });

  modal.addEventListener('hidden.bs.modal', () => {
    blurFocusedElementInsideModal(modal);
  });
});

document.addEventListener('click', (event) => {
  const dismissButton = event.target.closest('[data-bs-dismiss="modal"]');
  if (dismissButton instanceof HTMLElement) {
    dismissButton.blur();
  }
});
