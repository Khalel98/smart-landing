function translateContent(language) {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = i18next.t(key, { lng: language });
  });
}

function setActiveLanguageButton(language) {
  const buttons = document.querySelectorAll(".language-btn");
  buttons.forEach((button) => {
    if (button.id === `${language}-btn`) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

function setLanguageAndTranslate(language) {
  i18next.changeLanguage(language, (err, t) => {
    if (err) return console.log("something went wrong loading", err);
    localStorage.setItem("currentLanguage", language);
    translateContent(language);
    setActiveLanguageButton(language); // Update the active class for the selected button
  });
}

const kazakhBtn = document.getElementById("kz-btn");
const russianBtn = document.getElementById("ru-btn");

kazakhBtn.addEventListener("click", () => {
  setLanguageAndTranslate("kz");
});

russianBtn.addEventListener("click", () => {
  setLanguageAndTranslate("ru");
});

document.addEventListener("DOMContentLoaded", () => {
  const storedLanguage = localStorage.getItem("currentLanguage");
  const defaultLanguage = storedLanguage || "kz";
  setLanguageAndTranslate(defaultLanguage);
});
