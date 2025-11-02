const btnGeneratorColors = document.getElementById("js-btn-generator-color");
const newCard = document.getElementById("js-btn-new-card");
const cards = document.getElementById("js-cards");

const generateRandomHex = () => {
  let randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
  return `#${randomHex.padStart(6, "0")}`;
};

const createCard = () => {
  const randomHex = generateRandomHex();

  const card = document.createElement("li");
  card.classList.add("card");
  card.setAttribute("tabindex", "0");

  card.innerHTML = `
    <header 
      class="color-box" 
      aria-label="Cor hexadecimal ${randomHex}" 
      style="background-color: ${randomHex};">
    </header>
    <span class="text" aria-live="polite">${randomHex}</span>
  `;

  card.addEventListener("click", () => copyColor(randomHex, card));

  card.addEventListener("keypress", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      copyColor(randomHex, card);
    }
  });

  cards.appendChild(card);
};

const generatePalette = () => {
  const allCards = cards.querySelectorAll(".card");

  allCards.forEach((card) => {
    const newColor = generateRandomHex();
    const colorBox = card.querySelector(".color-box");
    const text = card.querySelector(".text");

    colorBox.style.backgroundColor = newColor;
    colorBox.setAttribute("aria-label", `Cor hexadecimal ${newColor}`);
    text.textContent = newColor;

    card.onclick = () => copyColor(newColor, card);
  });
};

const copyColor = async (color, card) => {
  try {
    await navigator.clipboard.writeText(color);

    const feedback = document.createElement("div");
    feedback.classList.add("copied-message");
    feedback.textContent = "Copiado!";
    card.appendChild(feedback);

    setTimeout(() => feedback.remove(), 2000);
  } catch (error) {
    console.error("Falha ao copiar cor:", error);
  }
};

newCard.addEventListener("click", createCard);
btnGeneratorColors.addEventListener("click", generatePalette);
