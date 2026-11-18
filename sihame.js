const translations = {
  nl: {
    metaDescription: "Eva Gebbinck als Charlene in de KRO-NCRV-serie Sihame. Lees over haar rol en bekijk de officiële seriepagina op NPO Start.",
    pageTitle: "Eva Gebbinck als Charlene in Sihame",
    skipToContent: "Ga naar de inhoud",
    homeLabel: "Eva Gebbinck, naar de hoofdpagina",
    navigationLabel: "Paginanavigatie",
    backToWork: "Terug naar werk",
    languageLabel: "Taal kiezen",
    switchDutch: "Schakel naar Nederlands",
    switchEnglish: "Schakel naar Engels",
    seriesKicker: "Televisie · 2022",
    roleLine: "Eva Gebbinck als Charlene",
    sectionStory: "De rol",
    storyEyebrow: "Een dramaserie van KRO-NCRV",
    storyHeading: "Een rol in een<br><em>rauw verhaal.</em>",
    storyDescription: "In 2022 speelde Eva Charlene in de achtdelige dramaserie Sihame van KRO-NCRV. De serie volgt Sihame, die na het online verspreiden van een seksvideo op zoek gaat naar wraak. Onder regie van Lisette Donkersloot en Shamira Raphaëla brengt Eva Charlene tot leven in het actuele verhaal over exposing en online shaming.",
    sectionClip: "Fragment",
    clipPending: "Het fragment wordt toegevoegd zodra de scène is gekozen.",
    clipEyebrow: "Bekijk de serie",
    clipHeading: "Sihame op<br><em>NPO Start.</em>",
    sourceDescription: "Bekijk het eerste seizoen via de officiële seriepagina op NPO Start.",
    npoLink: "Bekijk Sihame op NPO Start",
    footerRole: "Actrice · Sihame"
  },
  en: {
    metaDescription: "Eva Gebbinck as Charlene in the KRO-NCRV series Sihame. Read about her role and visit the official series page on NPO Start.",
    pageTitle: "Eva Gebbinck as Charlene in Sihame",
    skipToContent: "Skip to content",
    homeLabel: "Eva Gebbinck, back to the homepage",
    navigationLabel: "Page navigation",
    backToWork: "Back to work",
    languageLabel: "Choose language",
    switchDutch: "Switch to Dutch",
    switchEnglish: "Switch to English",
    seriesKicker: "Television · 2022",
    roleLine: "Eva Gebbinck as Charlene",
    sectionStory: "The role",
    storyEyebrow: "A KRO-NCRV drama series",
    storyHeading: "A role in a<br><em>raw story.</em>",
    storyDescription: "In 2022, Eva played Charlene in Sihame, an eight-part drama series by KRO-NCRV. The series follows Sihame as she seeks revenge after an intimate video of her is shared online. Directed by Lisette Donkersloot and Shamira Raphaëla, the series tells a timely story about non-consensual image sharing and online shaming, with Eva bringing Charlene to life.",
    sectionClip: "Clip",
    clipPending: "The clip will be added once the scene has been selected.",
    clipEyebrow: "Watch the series",
    clipHeading: "Sihame on<br><em>NPO Start.</em>",
    sourceDescription: "Watch the first season on the official NPO Start series page.",
    npoLink: "Watch Sihame on NPO Start",
    footerRole: "Actor · Sihame"
  }
};

const languageOptions = document.querySelectorAll("[data-language-option]");

function getPreferredLanguage() {
  try {
    const savedLanguage = localStorage.getItem("eva-site-language");
    if (Object.hasOwn(translations, savedLanguage)) return savedLanguage;
  } catch {
    // Fall back to the browser language when storage is unavailable.
  }

  const preferences = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const preference of preferences) {
    const language = preference?.toLowerCase().split("-")[0];
    if (Object.hasOwn(translations, language)) return language;
  }
  return "nl";
}

function setLanguage(language) {
  const dictionary = translations[language];
  if (!dictionary) return;

  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = dictionary[element.dataset.i18n];
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    element.innerHTML = dictionary[element.dataset.i18nHtml];
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", dictionary[element.dataset.i18nAriaLabel]);
  });

  const description = document.querySelector('meta[name="description"]');
  description.content = dictionary.metaDescription;
  document.title = dictionary.pageTitle;
  document.querySelector('meta[property="og:title"]').content = dictionary.pageTitle;
  document.querySelector('meta[property="og:description"]').content = dictionary.metaDescription;
  document.querySelector('meta[property="og:locale"]').content = language === "nl" ? "nl_NL" : "en_US";
  document.querySelector('meta[name="twitter:title"]').content = dictionary.pageTitle;
  document.querySelector('meta[name="twitter:description"]').content = dictionary.metaDescription;

  languageOptions.forEach((option) => {
    option.setAttribute("aria-pressed", String(option.dataset.languageOption === language));
  });

  try {
    localStorage.setItem("eva-site-language", language);
  } catch {
    // The language switch still works when browser storage is unavailable.
  }
}

languageOptions.forEach((option) => {
  option.addEventListener("click", () => setLanguage(option.dataset.languageOption));
});

setLanguage(getPreferredLanguage());
