function initI18n() {
	const languageSwitcher = document.getElementById("language-select");
	const currentLanguageSpan = document.getElementById("current-language");

	if (!languageSwitcher) {
		console.warn("Language selector not found.");
		return;
	}
	async function loadTranslations(lang) {
		try {
			const response = await fetch(`./locales/${lang}.json` || `/repo-name/locales/${lang}.json`);
			const translations = await response.json();
			applyTranslations(translations);
			updateLanguageLabel(lang);
		} catch (error) {
			console.error("Translation loading error:", error);
		}
	}

	function applyTranslations(translations) {
		document.querySelectorAll("[data-i18n]").forEach((el) => {
			const key = el.getAttribute("data-i18n");
			if (translations[key]) {
				el.textContent = translations[key];
			}
		});
	}

	function updateLanguageLabel(lang) {
		const names = { en: "English", fr: "Français" };
		if (currentLanguageSpan) {
			currentLanguageSpan.textContent = names[lang] || lang;
		}
	}

	function getInitialLang() {
		const saved = localStorage.getItem("lang");
		if (saved) return saved;
		const browserLang = navigator.language.slice(0, 2);
		return ["en", "fr"].includes(browserLang) ? browserLang : "en";
	}

	const initialLang = getInitialLang();

	// Safely wait for selector to be present
	if (languageSwitcher) {
		languageSwitcher.value = initialLang;
		languageSwitcher.addEventListener("change", (e) => {
			const selectedLang = e.target.value;
			localStorage.setItem("lang", selectedLang);
			loadTranslations(selectedLang);
		});
	}

	loadTranslations(initialLang);
}
