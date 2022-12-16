"use strict";

import allCharacters from "./characters.js";

/* SELECTORS */
const lengthText = document.querySelector(".pass-length__value");
const lengthIndicator = document.querySelector(".pass-length__indicator");
const lengthInput = document.querySelector(".pass-length__input");
const option = document.querySelector(".option");
const optionInputs = document.querySelectorAll(".option__item input");
const isDuplicate = document.querySelector("#duplicate");
const generateButton = document.querySelector(".generate__btn");
const randomPassword = document.querySelector(".random-pass__input");
const copyButton = document.querySelector(".copy-icon");

/* EVENT LISTENERS */
lengthInput.addEventListener("input", updateAndRender);
option.addEventListener("change", disableUpdateAndRender);
generateButton.addEventListener("click", renderPassword);
copyButton.addEventListener("click", copyPassword);

/* FUNCTIONS */
function updateAndRender() {
  updateInputValue();
  updateLengthText();
  updateIndicator();
  renderPassword();
}

function disableUpdateAndRender() {
  disableOption();
  updateAndRender();
}

function updateInputValue() {
  const passwordLength = filterCharacters().length;
  const isTrue = isDuplicate.checked && passwordLength < 11;
  lengthInput.min = isTrue ? 1 : 6;
  lengthInput.max = isTrue ? 10 : 20;
}

function updateLengthText() {
  lengthText.textContent = lengthInput.value;
}

function updateIndicator() {
  const passwordLength = filterCharacters().length;
  const isTrue = isDuplicate.checked && passwordLength < 11;
  const num1 = isTrue ? 5 : 11;
  const num2 = isTrue ? 8 : 16;

  const strengthModifier =
    lengthInput.value < num1
      ? "weak"
      : lengthInput.value < num2
      ? "good"
      : "strong";

  lengthIndicator.classList.remove(lengthIndicator.classList[1]);
  lengthIndicator.classList.add(`pass-length__indicator--${strengthModifier}`);
  lengthIndicator.textContent = strengthModifier;
}

function renderPassword() {
  randomPassword.value = getPassword();
}

function getPassword() {
  const characters = filterCharacters();
  let password = "";

  for (let i = 0; i < lengthInput.value; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const doesInclude = password.includes(characters[randomIndex]);

    if (isDuplicate.checked)
      doesInclude ? i-- : (password += characters[randomIndex]);
    else password += characters[randomIndex];
  }

  return password;
}

function filterCharacters() {
  let characters = "";

  optionInputs.forEach((option) => {
    if (option.checked) characters += allCharacters[option.id].join("");
  });

  return characters;
}

function disableOption() {
  const checkedOptions = countCheckedOptions();

  optionInputs.forEach((option) => {
    if (option.checked) option.disabled = checkedOptions < 2 ? true : false;
  });
}

function countCheckedOptions() {
  let checkedOptions = 0;

  optionInputs.forEach((option) => {
    if (option.checked) checkedOptions++;
  });

  return checkedOptions;
}

function copyPassword() {
  navigator.clipboard.writeText(randomPassword.value);
  copyButton.classList.replace("bx-copy", "bx-check");
  setTimeout(() => copyButton.classList.replace("bx-check", "bx-copy"), 500);
}

renderPassword();
