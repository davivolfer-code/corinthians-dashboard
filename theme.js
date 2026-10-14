(function () {
  const root = document.documentElement;
  const buttons = document.querySelectorAll("[data-theme-toggle]");
  const themeColor = document.querySelector('meta[name="theme-color"]');

  function renderTheme(theme) {
    const isLight = theme === "light";

    if (isLight) {
      root.dataset.theme = "light";
    } else {
      delete root.dataset.theme;
    }

    if (themeColor) themeColor.content = isLight ? "#f2f3f5" : "#0d0f12";

    buttons.forEach((button) => {
      const label = button.querySelector("[data-theme-label]");
      const icon = button.querySelector(".theme-toggle-icon");
      const nextLabel = isLight ? "Escuro" : "Claro";

      button.setAttribute("aria-label", `Ativar tema ${isLight ? "escuro" : "claro"}`);
      button.setAttribute("aria-pressed", String(isLight));
      if (label) label.textContent = nextLabel;

      if (icon) {
        icon.innerHTML = isLight
          ? '<path d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z"></path>'
          : '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path>';
      }
    });
  }

  // Eu mantenho a escolha do tema entre páginas e visitas ao dashboard.
  let currentTheme = root.dataset.theme === "light" ? "light" : "dark";
  renderTheme(currentTheme);

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      currentTheme = currentTheme === "dark" ? "light" : "dark";
      renderTheme(currentTheme);

      try {
        localStorage.setItem("fiel-em-dados-theme", currentTheme);
      } catch {
        // Eu aplico o tema nesta página mesmo quando o armazenamento local não está disponível.
      }
    });
  });
})();
