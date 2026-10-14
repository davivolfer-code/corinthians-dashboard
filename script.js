(function () {
  const dialog = document.querySelector("#detail-dialog");
  const title = document.querySelector("#detail-title");
  const kicker = document.querySelector("#detail-kicker");
  const content = document.querySelector("#detail-content");
  const source = document.querySelector("#detail-source");
  const navItems = [...document.querySelectorAll("[data-nav]")];

  function openDetails(type, index) {
    const details = window.DashboardDetails.build(type, Number(index));
    title.textContent = details.title;
    kicker.textContent = details.kicker;
    content.innerHTML = details.body;
    source.innerHTML = details.source;
    if (!dialog.open) dialog.showModal();
  }

  document.addEventListener("click", (event) => {
    const closeButton = event.target.closest("[data-close-dialog]");
    if (closeButton) {
      dialog.close();
      return;
    }

    const detailControl = event.target.closest("[data-detail]");
    if (detailControl) {
      event.preventDefault();
      openDetails(detailControl.dataset.detail, detailControl.dataset.index);
      const navKey = detailControl.dataset.nav;
      if (navKey) {
        navItems.forEach((item) => item.classList.toggle("active", item.dataset.nav === navKey));
      }
      return;
    }

    const overview = event.target.closest('[data-nav="overview"]');
    if (overview) {
      event.preventDefault();
      navItems.forEach((item) => item.classList.toggle("active", item === overview));
      document.querySelector("#inicio").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
})();
