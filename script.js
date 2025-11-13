const passwordEl = document.getElementById("password");
const lengthEl = document.getElementById("length");
const lengthValue = document.getElementById("length-value");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");

const strengthTextEl = document.getElementById("strength-text");
const barFillEl = document.getElementById("bar-fill");

// Caracteres possíveis
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+{}[]<>?/|~";

// === FUNÇÃO PRINCIPAL DE GERAÇÃO ===
function generatePassword() {
  let chars = "";

  if (lowercaseEl.checked) {
    chars += lowercaseChars;
  }
  if (uppercaseEl.checked) {
    chars += uppercaseChars;
  }

  if (numbersEl.checked) {
    chars += numberChars;
  }

  if (symbolsEl.checked) {
    chars += symbolChars;
  }

  const passwordLength = parseInt(lengthEl.value);

  if (chars.length === 0) {
    alert(
      "Por faver, selecione pelo menos um tipo de caractere para gerar a senha."
    );
    passwordEl.value = "";

    updateStenght("", 0);
    return;
  }

  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  passwordEl.value = password;

  checkPasswordStrength(password);
}

// === FUNÇÃO DE CÁLCULO DE FORÇA DA SENHA ===
function checkPasswordStrength(password) {
  const passwordLength = password.length;
  let score = 0;
  let strength = "Nenhuma";

  // 1. Pontuação baseada no comprimento
  if (passwordLength >= 8) {
    score += 20; // Médio
  }

  if (passwordLength >= 12) {
    score += 20; // Bom
  }

  if (passwordLength >= 16) {
    score += 20; // Ótimo
  }

  // 2. Pontuação baseada na inclusão de tipos de caracteres (Complexidade)
  let criterioMet = 0;
  if (/[a-z]/.test(password)) {
    criterioMet++;
  }
  if (/[A-Z]/.test(password)) {
    criterioMet++;
  }
  if (/[0-9]/.test(password)) {
    criterioMet++;
  }
  // Regex símbolos
  if (/[!@#$%^&*()_+{}\[\]<>?/|~]/.test(password)) {
    criterioMet++;
  }

  // Adiciona pontuação baseada na complexidade
  score += criterioMet * 10;

  // Limita o score máximo a 100
  score = Math.min(score, 100);

  // 3. Classificação e cor
  let barColor = "#ccc";

  if (score < 40) {
    strength = "Fraca 😢";
    barColor = "#e74c3c";
  } else if (score < 70) {
    strength = "Regular 🤔";
    barColor = "#f39c12";
  } else if (score < 90) {
    strength = "Boa 👍";
    barColor = "#3498db";
  } else {
    strength = "Forte! 🎉";
    barColor = "#2ecc71";
  }

  updateStenght(strength, score, barColor);
}

// === FUNÇÃO PRINCIPAL DE GERAÇÃO ===
function updateStenght(strengthText, score, color) {
  strengthTextEl.textContent = "Força: " + strengthText;
  barFillEl.style.width = score + "%";
  barFillEl.style.backgroundColor = color;

  // Se a senha estiver vazia, zera o visual
  if (score === 0) {
    strengthTextEl.textContent = "Selecione opções e gere a senha.";
    barFillEl.style.backgroundColor = "#ccc";
  }
}

generateBtn.addEventListener("click", generatePassword);

lengthEl.addEventListener("input", () => {
  lengthValue.textContent = lengthEl.value;

  generatePassword();
});

// Verifica a força da senha sempre que uma opção de checkbox for alterada
document
  .querySelectorAll('.controls input[type="checkbox"]')
  .forEach((checkbox) => {
    checkbox.addEventListener("change", generatePassword);
  });

copyBtn.addEventListener("click", () => {
  const textToCopy = passwordEl.value;

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      copyBtn.textContent = "✅";
      setTimeout(() => (copyBtn.textContent = "📋"), 1000);
    })
    .catch((err) => {
      console.error("Erro ao copiar: ", err);

      copyBtn.textContent = "❌";
      setTimeout(() => {
        copyBtn.textContent = "📋";
      }, 1000);
    });
});

generatePassword();
