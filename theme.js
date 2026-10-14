(function () {
  const root = document.documentElement;
  const themeOptions = document.querySelectorAll("[data-theme-option]");
  const themeColor = document.querySelector('meta[name="theme-color"]');

  function renderTheme(theme) {
    const isLight = theme === "light";

    if (isLight) {
      root.dataset.theme = "light";
    } else {
      delete root.dataset.theme;
    }

    if (themeColor) themeColor.content = isLight ? "#f2f3f5" : "#0d0f12";

    themeOptions.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.themeOption === theme));
    });
  }

  // Eu mantenho a escolha do tema entre páginas e visitas ao dashboard.
  let currentTheme = root.dataset.theme === "light" ? "light" : "dark";
  renderTheme(currentTheme);

  themeOptions.forEach((button) => {
    button.addEventListener("click", () => {
      currentTheme = button.dataset.themeOption;
      renderTheme(currentTheme);

      try {
        localStorage.setItem("fiel-em-dados-theme", currentTheme);
      } catch {
        // Eu aplico o tema nesta página mesmo quando o armazenamento local não está disponível.
      }
    });
  });
})();
