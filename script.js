import characters from "./characters.js";

/* GLOBAL VARIABLES */
const allCharacters = {
  lowercase: characters.slice(0, 26),
  uppercase: characters.slice(26, 52),
  numbers: characters.slice(52, 62),
  symbols: characters.slice(62, 91),
};

let checkedOptions = 1;

/* QUERY SELECTORS */
const lengthValue = document.querySelector(".pass-length__value");
const lengthIndicator = document.querySelector(".pass-length__indicator");
const lengthInput = document.querySelector(".pass-length__input");
const option = document.querySelector(".option");
const optionInputs = document.querySelectorAll(".option__item input");
const generateButton = document.querySelector(".generate__btn");
const randomPassword = document.querySelector(".random-pass__input");
const copyIcon = document.querySelector(".copy-icon");

/* FUNCTIONS */
const renderLengthValue = (isTrue) => {
  let num1, num2, classModifier;
  isTrue ? ((num1 = 4), (num2 = 7)) : ((num1 = 10), (num2 = 15));

  classModifier =
    lengthInput.value <= num1
      ? "weak"
      : lengthInput.value <= num2
      ? "good"
      : "strong";

  lengthIndicator.classList.remove(lengthIndicator.classList[1]);
  lengthIndicator.classList.add(`pass-length__indicator--${classModifier}`);
  lengthIndicator.textContent = classModifier;
  lengthValue.style.color = `var(--${classModifier})`;
  lengthValue.textContent = lengthInput.value;
};
renderLengthValue();

const countCheckedOptions = () => {
  optionInputs.forEach((option) => {
    if (option.id != "duplicate" && option.checked === true) {
      checkedOptions <= 1
        ? (option.disabled = true)
        : (option.disabled = false);
    }
  });
};
countCheckedOptions();

const checkOptionInput = (e) => {
  const element = e.target;
  const checked = element.checked;

  if (element.id != "duplicate" && checked === true) {
    checkedOptions += 1;
    generatePassword();
  } else if (element.id != "duplicate" && checked === false) {
    checkedOptions -= 1;
    generatePassword();
  } else if (element.id === "duplicate") {
    generatePassword();
  }
  countCheckedOptions();
};

const generatePassword = () => {
  randomPassword.value = "";

  let charactersArr = [];
  let passwordResult = "";
  let removeDuplicate = false;
  let randomIndex, randomCharacter;

  optionInputs.forEach((option) => {
    if (option.checked) {
      if (option.id != "duplicate") {
        charactersArr.push(...allCharacters[option.id]);
      } else {
        removeDuplicate = true;
      }
    }
  });

  const isTrue = removeDuplicate === true && charactersArr.length <= 10;
  isTrue
    ? ((lengthInput.min = 1), (lengthInput.max = 10))
    : ((lengthInput.min = 6), (lengthInput.max = 20));

  for (let i = 0; i < lengthInput.value; i++) {
    randomIndex = Math.floor(Math.random() * charactersArr.length);
    randomCharacter = charactersArr[randomIndex];

    if (removeDuplicate) {
      !passwordResult.includes(randomCharacter)
        ? (passwordResult += randomCharacter)
        : i--;
    } else {
      passwordResult += randomCharacter;
    }
    randomPassword.value = passwordResult;
  }

  isTrue ? renderLengthValue(isTrue) : renderLengthValue();
};

const copyPassword = () => {
  navigator.clipboard.writeText(randomPassword.value);
  copyIcon.classList.replace("bx-copy", "bx-check");

  setTimeout(() => {
    copyIcon.classList.replace("bx-check", "bx-copy");
  }, 1500);
};

/* EVENT LISTENERS */
lengthInput.addEventListener("input", () => {
  renderLengthValue();
  generatePassword();
});
option.addEventListener("click", checkOptionInput);
generateButton.addEventListener("click", generatePassword);
copyIcon.addEventListener("click", copyPassword);
