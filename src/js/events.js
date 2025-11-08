import {
  newCard,
  btnGeneratorColors,
  btnUndo,
  btnRedo,
  btnConfig,
  form,
  body,
  palette,
} from './domElements.js';
import { createCard, generatePalette } from './cardManager.js';
import { history } from './main.js';
import { handleModal } from './handleModal.js';

function getInputValue(input) {
  return input.type === 'checkbox' ? input.checked : input.value;
}
function toggleFullscreen(enable) {
  if (enable && !document.fullscreenElement) {
    document.documentElement
      .requestFullscreen()
      .catch((err) =>
        console.error(`Erro ao ativar fullscreen: ${err.message}`)
      );
  } else if (!enable && document.fullscreenElement) {
    document.exitFullscreen();
  }
}

function togglePaletteGap(enable) {
  if (!palette) return;
  palette.classList.toggle('gapped', enable);
}
function applyTheme(theme) {
  body.classList.remove('light', 'dark');

  switch (theme) {
    case 'claro':
      body.classList.add('light');
      break;
    case 'escuro':
      body.classList.add('dark');
      break;
    case 'sistema': {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      body.classList.add(prefersDark ? 'dark' : 'light');
      break;
    }
  }
}
export function setupEvents() {
  // Botão para cores
  newCard.addEventListener('click', createCard);
  btnGeneratorColors.addEventListener('click', generatePalette);

  window.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
      e.preventDefault();
      generatePalette();
    }
  });

  // Botao para desfazer
  btnUndo.addEventListener('click', () => history.undo());
  btnRedo.addEventListener('click', () => history.redo());

  // Modal
  btnConfig.addEventListener('click', handleModal);

  // Forms de configuração
  form.addEventListener('change', (event) => {
    const { name } = event.target;
    const value = getInputValue(event.target);

    switch (name) {
      case 'fullmode':
        toggleFullscreen(value);
        break;
      case 'gapColumns':
        togglePaletteGap(value);
        break;
      case 'theme':
        applyTheme(value);
        break;
    }
  });
}
