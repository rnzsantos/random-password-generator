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
const lengthValue = document.querySelector(".pass-length__value"),
  lengthIndicator = document.querySelector(".pass-length__indicator"),
  lengthInput = document.querySelector(".pass-length__input"),
  option = document.querySelector(".option"),
  optionInputs = document.querySelectorAll(".option__item input"),
  generateButton = document.querySelector(".generate__btn"),
  randomPassword = document.querySelector(".random-pass__input"),
  copyIcon = document.querySelector(".copy-icon");

/* FUNCTIONS */
const renderLengthValue = (isTrue) => {
  let [num1, num2, classModifier] = [10, 15];
  if (isTrue) (num1 = 4), (num2 = 7);

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
    if (option.id != "duplicate" && option.checked)
      option.disabled = checkedOptions <= 1 ? true : false;
  });
};
countCheckedOptions();

const checkOptionInput = (e) => {
  const [elementId, isChecked] = [e.target.id, e.target.checked];

  if (elementId != "duplicate" && isChecked === true) {
    checkedOptions += 1;
    generatePassword();
  } else if (elementId != "duplicate" && isChecked === false) {
    checkedOptions -= 1;
    generatePassword();
  } else if (elementId === "duplicate") {
    generatePassword();
  }
  countCheckedOptions();
};

const generatePassword = () => {
  randomPassword.value = "";

  let [
    charactersArr,
    passwordResult,
    removeDuplicate,
    randomIndex,
    randomCharacter,
  ] = [[], "", false];

  optionInputs.forEach((option) => {
    if (option.checked)
      option.id != "duplicate"
        ? charactersArr.push(...allCharacters[option.id])
        : (removeDuplicate = true);
  });

  const isTrue = removeDuplicate && charactersArr.length <= 10;
  lengthInput.min = isTrue ? 1 : 6;
  lengthInput.max = isTrue ? 10 : 20;

  for (let i = 0; i < lengthInput.value; i++) {
    randomIndex = Math.floor(Math.random() * charactersArr.length);
    randomCharacter = charactersArr[randomIndex];

    removeDuplicate
      ? !passwordResult.includes(randomCharacter)
        ? (passwordResult += randomCharacter)
        : i--
      : (passwordResult += randomCharacter);

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
