const characters = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
  "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B",
  "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P",
  "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3",
  "4", "5", "6", "7", "8", "9", "~", "`", "!", "@", "#", "$", "%", "^",
  "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|",
  ":", ";", "<", ">", ".", "?", "/"
];

const lengthValue = document.querySelector("#length-value");
const lengthSelector = document.querySelector("#length-selector");
const options = document.querySelectorAll("#option-item input");
const generateButton = document.querySelector("#generate-btn");
const randomPassword = document.querySelector("#random-pass-input");
const copyIcon = document.querySelector("#copy-icon");

/* Functions */
const renderLengthValue = () => {
  lengthValue.textContent = lengthSelector.value;

  if (lengthSelector.value <= 10) {
    lengthValue.style.color = "#F83B3A";
  } else if (lengthSelector.value <= 15) {
    lengthValue.style.color = "#EBDF64";
  } else {
    lengthValue.style.color = "#62DE6D";
  }
};

const generatePassword = () => {
  randomPassword.value = "";

  const allCharacters = {
    lowercase: characters.slice(0, 26),
    uppercase: characters.slice(26, 52),
    numbers: characters.slice(52, 62),
    symbols: characters.slice(62, 91),
  };

  let charactersArr = allCharacters.lowercase;
  let removeDuplicate = false;
  let randomIndex;
  let randomCharacter;
  let passwordResult = "";

  options.forEach((option) => {
    if (option.checked) {
      if (option.id != "duplicate") {
        charactersArr.push(...allCharacters[option.id]);
      } else {
        removeDuplicate = true;
      }
    }
  });

  for (let i = 0; i < lengthSelector.value; i++) {
    randomIndex = Math.floor(Math.random() * charactersArr.length);
    randomCharacter = charactersArr[randomIndex];

    if (removeDuplicate) {
      !passwordResult.includes(randomCharacter)
      ? passwordResult += randomCharacter
      : i--;
    } else {
      passwordResult += randomCharacter;
    }
    randomPassword.value = passwordResult;
  }
};

const copyPassword = () => {
  navigator.clipboard.writeText(randomPassword.value);
  copyIcon.classList.replace("bx-copy", "bx-check");

  setTimeout(() => {
    copyIcon.classList.replace("bx-check", "bx-copy");
  }, 1500);
};

renderLengthValue();

/* Event Listeners */
lengthSelector.addEventListener("input", () => {
  renderLengthValue();
  generatePassword();
});

generateButton.addEventListener("click", generatePassword);
copyIcon.addEventListener("click", copyPassword);
