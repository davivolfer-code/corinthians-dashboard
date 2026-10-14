(function () {
  if (new URLSearchParams(window.location.search).get("secao") !== "noticias") return;

  const list = document.querySelector("#news-list");
  const status = document.querySelector("#news-status");
  const updated = document.querySelector("#news-updated");
  const refresh = document.querySelector("#news-refresh");
  let loading = false;

  function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Data não informada";
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  }

  function renderNews(items) {
    list.replaceChildren();
    if (!items.length) {
      const empty = document.createElement("p");
      empty.className = "news-empty";
      empty.textContent = "Nenhuma notícia disponível neste momento.";
      list.append(empty);
      return;
    }

    items.forEach((item) => {
      const article = document.createElement("article");
      article.className = "news-item";
      const meta = document.createElement("div");
      meta.className = "news-item-meta";
      const source = document.createElement("span");
      source.textContent = item.source || "UOL Esporte";
      const date = document.createElement("time");
      date.textContent = formatDate(item.publishedAt);
      if (item.publishedAt) date.dateTime = item.publishedAt;
      meta.append(source, date);

      const title = document.createElement("a");
      title.className = "news-title";
      title.textContent = item.title || "Abrir notícia";
      try {
        const url = new URL(item.url);
        if (url.protocol === "https:") {
          title.href = url.href;
          title.target = "_blank";
          title.rel = "noopener noreferrer";
        }
      } catch (_) {
        /* Ignora links inválidos do feed. */
      }

      article.append(meta, title);
      if (item.summary) {
        const summary = document.createElement("p");
        summary.className = "news-summary";
        summary.textContent = item.summary;
        article.append(summary);
      }
      list.append(article);
    });
  }

  async function loadNews() {
    if (loading) return;
    loading = true;
    refresh.disabled = true;
    status.textContent = "Buscando as notícias mais recentes…";
    try {
      const response = await fetch(`noticias.json?v=${Date.now()}`, {
        cache: "no-store",
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const feed = await response.json();
      const items = Array.isArray(feed.items) ? feed.items : [];
      renderNews(items);
      status.textContent = `${items.length} ${items.length === 1 ? "notícia" : "notícias"} no feed`;
      updated.textContent = feed.updatedAt
        ? formatDate(feed.updatedAt)
        : "aguardando primeira coleta";
    } catch (_) {
      status.textContent = "Não foi possível carregar o feed agora.";
      updated.textContent = "Tente novamente em instantes";
      if (!list.children.length) {
        const fallback = document.createElement("p");
        fallback.className = "news-empty";
        fallback.textContent =
          "O feed automático aparecerá assim que a coleta do repositório for executada.";
        list.append(fallback);
      }
    } finally {
      loading = false;
      refresh.disabled = false;
    }
  }

  refresh.addEventListener("click", loadNews);
  loadNews();
  window.setInterval(loadNews, 10 * 60 * 1000);
})();
