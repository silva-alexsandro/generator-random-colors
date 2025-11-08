import { btnClose, modal } from './domElements.js';

export function handleModal() {
  modal.style.display = 'block';
  btnClose.onclick = () => (modal.style.display = 'none');

  window.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  };
}
