const languageSwitcher = document.getElementById('languageSwitcher');

async function loadTranslations(lang) {
  const response = await fetch(`./locales/${lang}.json`);
  const translations = await response.json();
  applyTranslations(translations);
}

function applyTranslations(translations) {
  document.querySelectorAll('[data-i18n]').forEach(elem => {
    const key = elem.getAttribute('data-i18n');
    if (translations[key]) {
      elem.textContent = translations[key];
    }
  });
}

// Detect or get saved language
function getInitialLanguage() {
  const savedLang = localStorage.getItem('lang');
  if (savedLang) return savedLang;

  const browserLang = navigator.language.slice(0, 2); // e.g., "en-US" → "en"
  return ['en', 'es'].includes(browserLang) ? browserLang : 'en'; // fallback to 'en'
}

// On language change
languageSwitcher.addEventListener('change', (e) => {
  const selectedLang = e.target.value;
  localStorage.setItem('lang', selectedLang);
  loadTranslations(selectedLang);
});

// Initialize
const initialLang = getInitialLanguage();
languageSwitcher.value = initialLang;
loadTranslations(initialLang);