(function () {
  const data = window.dashboardData;
  // Eu mantenho os dados por ano para não misturar campanhas de temporadas diferentes.
  const brasileiro = {
    id: "brasileirao",
    name: "Brasileirão Série A",
    shortName: "Brasileirão",
    status: "Em andamento · 16º lugar",
    stage: "Série A · campanha até a 30ª rodada",
    updatedAt: data.updatedAt,
    source: "https://classificacaogeral.com.br/analises-e-estatisticas/brasileirao/2026",
    scheduleSource: "https://agendaec.com.br/time/corinthians/",
    stats: data.stats,
    recentMatches: data.recentMatches,
    fixtures: data.fixtures,
  };
  const catalogs2026 = {
    brasileirao: brasileiro,
    "copa-do-brasil": {
      id: "copa-do-brasil",
      name: "Copa do Brasil",
      shortName: "Copa do Brasil",
      status: "Eliminado nas oitavas de final",
      stage: "Oitavas de final · Internacional 3 × 2 Corinthians no agregado",
      updatedAt: "07/08/2026",
      source:
        "https://www.cbf.com.br/futebol-brasileiro/times/copa-do-brasil/profissional/2026/20001?tab=historico-de-partidas",
      scheduleSource:
        "https://www.cbf.com.br/futebol-brasileiro/times/copa-do-brasil/profissional/2026/20001?tab=historico-de-partidas",
      stats: {
        matches: 4,
        wins: 3,
        draws: 0,
        losses: 1,
        goalsFor: 4,
        goalsAgainst: 3,
      },
      fixtures: [],
      recentMatches: [
        {
          date: "21 ABR",
          opponent: "Barra-SC",
          score: "1–0",
          venue: "Fora",
          time: "21:30",
          stadium: "Ressacada",
          city: "Florianópolis, SC",
          source:
            "https://www.cbf.com.br/futebol-brasileiro/noticias/selecao-base/a/favoritos-vencem-na-estreia-da-quinta-fase-da-copa-do-brasil",
          goals: [{ team: "Corinthians", scorer: "Jesse Lingard", minute: "N/D" }],
        },
        {
          date: "14 MAI",
          opponent: "Barra-SC",
          score: "1–0",
          venue: "Casa",
          time: "N/D",
          stadium: "Neo Química Arena",
          city: "São Paulo, SP",
          source:
            "https://www.cbf.com.br/futebol-brasileiro/jogos/copa-do-brasil/profissional/2026/corinthians-x-barra-futebol-clube/834036?view=documentos",
        },
        {
          date: "02 AGO",
          opponent: "Internacional",
          score: "0–2",
          venue: "Fora",
          time: "19:30",
          stadium: "Beira-Rio",
          city: "Porto Alegre, RS",
          source:
            "https://www.cbf.com.br/futebol-brasileiro/jogos/copa-do-brasil/masculino/2026/internacional-x-corinthians/834852?view=documentos",
        },
        {
          date: "06 AGO",
          opponent: "Internacional",
          score: "2–1",
          venue: "Casa",
          time: "20:00",
          stadium: "Neo Química Arena",
          city: "São Paulo, SP",
          source:
            "https://www.cbf.com.br/futebol-brasileiro/jogos/copa-do-brasil/profissional/2026/corinthians-x-internacional/834860?view=documentos",
        },
      ],
    },
    libertadores: {
      id: "libertadores",
      name: "CONMEBOL Libertadores",
      shortName: "Libertadores",
      status: "Eliminado nas quartas de final",
      stage: "Quartas de final · Estudiantes 2 × 1 Corinthians no agregado",
      updatedAt: "16/09/2026",
      source:
        "https://gol.conmebol.com/libertadores/pt-br/news/corinthians-na-conmebol-libertadores-2026-resultados-elenco-e-calendario",
      scheduleSource: "https://libertadores.com.br/jogos/estudiantes-x-corinthians/",
      stats: {
        matches: 10,
        wins: 4,
        draws: 4,
        losses: 2,
        goalsFor: 10,
        goalsAgainst: 6,
      },
      fixtures: [],
      recentMatches: [
        {
          date: "09 SET",
          opponent: "Estudiantes",
          score: "1–1",
          venue: "Fora",
          time: "21:30",
          stadium: "Estadio Jorge Luis Hirschi",
          city: "La Plata, Argentina",
          source: "https://libertadores.com.br/jogos/estudiantes-x-corinthians/",
          goals: [
            { team: "Estudiantes", scorer: "Alexis Castro", minute: "4’" },
            { team: "Corinthians", scorer: "Kaio César", minute: "48’" },
          ],
        },
        {
          date: "16 SET",
          opponent: "Estudiantes",
          score: "0–1",
          venue: "Casa",
          time: "21:30",
          stadium: "Neo Química Arena",
          city: "São Paulo, SP",
          source: "https://libertadores.com.br/jogos/estudiantes-x-corinthians/",
          goals: [{ team: "Estudiantes", scorer: "Alexis Castro", minute: "87’" }],
        },
      ],
    },
    paulistao: {
      id: "paulistao",
      name: "Paulistão",
      shortName: "Paulistão",
      status: "Eliminado na semifinal",
      stage: "Semifinal · Novorizontino 1 × 0 Corinthians",
      updatedAt: "28/02/2026",
      source: "https://www.ogol.com.br/equipe/corinthians/todos-os-jogos?ano=2026&grp=1",
      scheduleSource: "https://www.futebolpaulista.com.br/Noticias/Detalhe.aspx?Noticia=32063",
      stats: {
        matches: 10,
        wins: 4,
        draws: 3,
        losses: 3,
        goalsFor: 11,
        goalsAgainst: 8,
      },
      fixtures: [],
      recentMatches: [
        {
          date: "22 FEV",
          opponent: "Portuguesa",
          score: "1–1",
          venue: "Fora",
          time: "20:30",
          stadium: "Canindé",
          city: "São Paulo, SP",
          source: "https://www.futebolpaulista.com.br/Noticias/Detalhe.aspx?Noticia=32024",
          decidedBy: "Corinthians venceu por 8–7 nos pênaltis",
        },
        {
          date: "28 FEV",
          opponent: "Novorizontino",
          score: "0–1",
          venue: "Fora",
          time: "20:30",
          stadium: "Estádio Jorge Ismael de Biasi",
          city: "Novo Horizonte, SP",
          source: "https://www.futebolpaulista.com.br/Noticias/Detalhe.aspx?Noticia=32063",
          goals: [{ team: "Novorizontino", scorer: "Mayk", minute: "N/D" }],
        },
      ],
    },
  };

  const catalogs2025 = {
    brasileirao: {
      id: "brasileirao",
      name: "Brasileirão Série A",
      shortName: "Brasileirão",
      status: "Temporada encerrada · 13º lugar",
      stage: "Série A · temporada completa",
      updatedAt: "07/12/2025",
      source: "https://www.ogol.com.br/edicao/brasileirao-serie-a-2025/194851",
      scheduleSource:
        "https://www.cbf.com.br/futebol-brasileiro/times/campeonato-brasileiro/serie-a/2025/20001?tab=historico-de-partidas",
      stats: {
        matches: 38,
        wins: 12,
        draws: 11,
        losses: 15,
        points: 47,
        position: 13,
        goalsFor: 42,
        goalsAgainst: 47,
      },
      fixtures: [],
      recentMatches: [
        {
          date: "07 DEZ",
          opponent: "Juventude",
          score: "1–1",
          venue: "Casa",
          time: "16:00",
          stadium: "Neo Química Arena",
          city: "São Paulo, SP",
          source:
            "https://www.cbf.com.br/futebol-brasileiro/times/campeonato-brasileiro/serie-a/2025/20001?tab=historico-de-partidas",
        },
      ],
    },
    "copa-do-brasil": {
      id: "copa-do-brasil",
      name: "Copa do Brasil",
      shortName: "Copa do Brasil",
      status: "Campeão · título conquistado sobre o Vasco",
      stage: "Final · Corinthians 2 × 1 Vasco no agregado",
      updatedAt: "21/12/2025",
      source:
        "https://www.cbf.com.br/futebol-brasileiro/noticias/undefined/boa-x-ponte-preta/corinthians-vence-vasco-e-conquista-seu-quarto-titulo-da-copa-do-brasil",
      scheduleSource:
        "https://www.cbf.com.br/futebol-brasileiro/times/copa-do-brasil/masculino/2025/20001?tab=historico-de-partidas",
      stats: {
        matches: 10,
        wins: 8,
        draws: 1,
        losses: 1,
        goalsFor: 12,
        goalsAgainst: 3,
      },
      fixtures: [],
      recentMatches: [
        {
          date: "17 DEZ",
          opponent: "Vasco",
          score: "0–0",
          venue: "Casa",
          time: "21:30",
          stadium: "Neo Química Arena",
          city: "São Paulo, SP",
        },
        {
          date: "21 DEZ",
          opponent: "Vasco",
          score: "2–1",
          venue: "Fora",
          time: "18:00",
          stadium: "Maracanã",
          city: "Rio de Janeiro, RJ",
          goals: [
            { team: "Corinthians", scorer: "Yuri Alberto", minute: "—" },
            { team: "Corinthians", scorer: "Memphis Depay", minute: "—" },
            { team: "Vasco", scorer: "Nuno Moreira", minute: "—" },
          ],
        },
      ],
    },
    libertadores: {
      id: "libertadores",
      name: "Libertadores",
      shortName: "Libertadores",
      status: "Eliminado na fase preliminar",
      stage: "Fase preliminar · campanha encerrada",
      updatedAt: "12/03/2025",
      source: "https://www.ogol.com.br/equipe/corinthians?epoca_id=154",
      scheduleSource: "https://www.ogol.com.br/equipe/corinthians?epoca_id=154",
      stats: {
        matches: 4,
        wins: 2,
        draws: 1,
        losses: 1,
        goalsFor: 6,
        goalsAgainst: 6,
      },
      fixtures: [],
      recentMatches: [],
    },
    paulistao: {
      id: "paulistao",
      name: "Paulistão",
      shortName: "Paulistão",
      status: "Campeão · título conquistado sobre o Palmeiras",
      stage: "Final · Palmeiras 0 × 1 Corinthians no agregado",
      updatedAt: "27/03/2025",
      source: "https://www.futebolpaulista.com.br/Noticias/Detalhe.aspx?Noticia=29006",
      scheduleSource: "https://www.ogol.com.br/equipe/corinthians?edicao_id=192776",
      stats: {
        matches: 16,
        wins: 11,
        draws: 4,
        losses: 1,
        goalsFor: 25,
        goalsAgainst: 14,
      },
      fixtures: [],
      recentMatches: [
        {
          date: "27 MAR",
          opponent: "Palmeiras",
          score: "0–0",
          venue: "Casa",
          time: "21:35",
          stadium: "Neo Química Arena",
          city: "São Paulo, SP",
          source: "https://www.futebolpaulista.com.br/Noticias/Detalhe.aspx?Noticia=29006",
        },
      ],
    },
    sulamericana: {
      id: "sulamericana",
      name: "Copa Sul-Americana",
      shortName: "Sul-Americana",
      status: "Eliminado na fase de grupos",
      stage: "Fase de grupos · 3º lugar do Grupo C",
      updatedAt: "28/05/2025",
      source: "https://www.ogol.com.br/equipe/corinthians?epoca_id=154",
      scheduleSource: "https://www.ogol.com.br/equipe/corinthians?epoca_id=154",
      stats: {
        matches: 6,
        wins: 2,
        draws: 2,
        losses: 2,
        goalsFor: 5,
        goalsAgainst: 5,
      },
      fixtures: [],
      recentMatches: [],
    },
  };
  // A seleção fica salva no navegador e acompanha a pessoa ao trocar de página.
  const selector = document.querySelector("#competition-selector");
  const seasonSelector = document.querySelector("#season-selector");
  let season = "2026";
  try {
    season = localStorage.getItem("fiel-em-dados:temporada") || season;
  } catch (_) {
    /* padrão da página */
  }
  if (!["2025", "2026"].includes(season)) season = "2026";
  let catalogs = season === "2025" ? catalogs2025 : catalogs2026;
  if (seasonSelector) {
    seasonSelector.value = season;
    seasonSelector.addEventListener("change", () => {
      try {
        localStorage.setItem("fiel-em-dados:temporada", seasonSelector.value);
        localStorage.setItem("fiel-em-dados:competicao", "brasileirao");
      } catch (_) {
        /* a seleção ainda vale nesta navegação */
      }
      window.location.reload();
    });
  }
  let selectedId = "brasileirao";
  try {
    selectedId = localStorage.getItem("fiel-em-dados:competicao") || selectedId;
  } catch (_) {
    /* armazenamento pode estar bloqueado */
  }
  if (!catalogs[selectedId]) selectedId = "brasileirao";
  const competition = catalogs[selectedId];
  window.competitionCatalog = catalogs;
  window.currentCompetition = competition;

  data.season = Number(season);
  data.individualDataSeason = 2026;
  if (season !== "2026") {
    data.scorers = [];
    data.allScorers = [];
  }
  // A partir daqui, os outros módulos recebem apenas o recorte escolhido.
  data.currentCompetition = competition;
  data.competition = competition.name;
  data.stats = competition.stats;
  data.recentMatches = competition.recentMatches;
  data.fixtures = competition.fixtures;
  data.updatedAt = competition.updatedAt;
  const sidebarDate = document.querySelector("#snapshot-date");
  if (sidebarDate) sidebarDate.textContent = `Recorte em ${competition.updatedAt}`;
  if (selector) {
    selector.innerHTML = Object.values(catalogs)
      .map((item) => `<option value="${item.id}">${item.shortName} · ${season}</option>`)
      .join("");
    selector.value = selectedId;
    selector.addEventListener("change", () => {
      try {
        localStorage.setItem("fiel-em-dados:competicao", selector.value);
      } catch (_) {
        /* a seleção ainda vale nesta página */
      }
      window.location.reload();
    });
  }

  const clubCaption = document.querySelector("#club-competition");
  if (clubCaption) clubCaption.textContent = `${competition.shortName} · ${season}`;
  const eyebrow = document.querySelector("#competition-eyebrow");
  if (eyebrow)
    eyebrow.textContent = `CENTRO DE ANÁLISE · ${competition.name.toLocaleUpperCase("pt-BR")} ${season}`;

  // Eu atualizo os textos e números da visão geral sem duplicar o HTML por ano.
  function updateOverview() {
    const { stats } = competition;
    const metrics = document.querySelectorAll("#overview-metrics .metric");
    if (!metrics.length) return;
    const league = competition.id === "brasileirao";
    const values = [
      ["PARTIDAS", stats.matches, `na ${competition.shortName}`],
      [
        league ? "PONTOS" : "VITÓRIAS",
        league ? stats.points : stats.wins,
        league
          ? `${stats.position}º lugar · ${stats.wins}V · ${stats.draws}E · ${stats.losses}D`
          : `${stats.draws} empates · ${stats.losses} derrotas`,
      ],
      [
        "GOLS MARCADOS",
        stats.goalsFor,
        `${(stats.goalsFor / stats.matches).toFixed(2).replace(".", ",")} por jogo`,
      ],
      [
        "GOLS SOFRIDOS",
        stats.goalsAgainst,
        `${(stats.goalsAgainst / stats.matches).toFixed(2).replace(".", ",")} por jogo`,
      ],
    ];
    metrics.forEach((card, index) => {
      const [label, value, note] = values[index];
      card.querySelector(".metric-head").textContent = label;
      card.querySelector(".metric-value").textContent = value;
      card.querySelector(".metric-foot").textContent = note;
    });

    const chartTitle = document.querySelector(".chart-panel .panel-head h2");
    if (chartTitle) chartTitle.textContent = `Resultados recentes · ${competition.shortName}`;
    const resultTag = document.querySelector(".chart-panel .source-tag");
    if (resultTag)
      resultTag.innerHTML = `${competition.recentMatches.length} jogos no recorte <span>↗</span>`;
    const chartSummary = document.querySelector(".chart-summary span:first-child");
    if (chartSummary) chartSummary.textContent = `Jogos recentes · ${competition.stage}`;
    const chartStatus = document.querySelector(".chart-summary span:last-child");
    if (chartStatus) chartStatus.textContent = competition.status;
    const chartCaption = document.querySelector(".chart-panel .data-caption");
    if (chartCaption)
      chartCaption.innerHTML = `${competition.name} · ${competition.status}. <button class="caption-action" type="button" data-detail="recent">Abrir histórico</button>`;

    const campaignTitle = document.querySelector(".result-panel .panel-head h2");
    if (campaignTitle) campaignTitle.textContent = `Campanha · ${competition.shortName}`;
    const donut = document.querySelector(".donut");
    if (donut) {
      const wins = (stats.wins / stats.matches) * 100;
      const draws = wins + (stats.draws / stats.matches) * 100;
      donut.style.background = `conic-gradient(var(--red) 0 ${wins}%, #737b85 ${wins}% ${draws}%, #39343a ${draws}% 100%)`;
      donut.querySelector("strong").textContent = stats.matches;
    }
    const legendValues = document.querySelectorAll(".result-legend b");
    [stats.wins, stats.draws, stats.losses].forEach((value, index) => {
      if (legendValues[index]) legendValues[index].textContent = value;
    });
    const saldo = stats.goalsFor - stats.goalsAgainst;
    const balance = document.querySelector(".result-foot b");
    if (balance) balance.textContent = saldo > 0 ? `+${saldo}` : String(saldo).replace("-", "−");
    const footLabel = document.querySelector(".result-foot span");
    if (footLabel) footLabel.textContent = "Saldo de gols";

    const notice = document.querySelector(".notice");
    if (notice) {
      const message = notice.querySelector("strong");
      const detail = notice.querySelector("span + div span");
      if (message) message.textContent = `${competition.shortName} · recorte de ${season}`;
      if (detail) detail.textContent = ` ${competition.status}. ${competition.stage}.`;
    }
    const fixturesPanel = document.querySelector(".fixtures-panel");
    const fixturesTitle = fixturesPanel?.querySelector("h2");
    if (fixturesTitle)
      fixturesTitle.textContent = competition.fixtures.length
        ? "Próximos jogos"
        : "Situação no campeonato";
    const fixtureLink = fixturesPanel?.querySelector(".text-link");
    if (fixtureLink)
      fixtureLink.textContent = competition.fixtures.length
        ? "Ver calendário ↗"
        : "Campanha encerrada";
    const fixtureCaption = fixturesPanel?.querySelector(".data-caption");
    if (fixtureCaption)
      fixtureCaption.textContent = competition.fixtures.length
        ? `Agenda consultada em ${competition.updatedAt}; horários de Brasília.`
        : competition.stage;
    const scorerCaption = document.querySelector(".players-panel .data-caption");
    if (scorerCaption)
      scorerCaption.textContent =
        season === "2026"
          ? "Artilharia do elenco na temporada, em todas as competições; recorte de 24/09/2026."
          : "Artilharia individual de 2025 ainda não cadastrada. Os dados do elenco estão disponíveis para 2026.";
    if (season !== "2026") {
      const scorerBody = document.querySelector("#scorers");
      const scorerTitle = document.querySelector(".players-panel h2");
      const scorerAction = document.querySelector(".players-panel .text-link");
      if (scorerBody)
        scorerBody.innerHTML =
          '<tr><td colspan="3">Estatísticas individuais de 2025 ainda não foram cadastradas.</td></tr>';
      if (scorerTitle) scorerTitle.textContent = "Artilharia de 2025";
      if (scorerAction) {
        scorerAction.textContent = "Sem dados individuais";
        scorerAction.disabled = true;
      }
    }
    const footerLinks = document.querySelectorAll("main#inicio > footer a");
    if (footerLinks[0]) {
      footerLinks[0].href = competition.source;
      footerLinks[0].textContent = competition.shortName.toLocaleLowerCase("pt-BR");
    }
    if (footerLinks[1]) {
      footerLinks[1].href = competition.scheduleSource;
      footerLinks[1].textContent = "jogos";
    }

    const snapshotDate = document.querySelector("#snapshot-date");
    if (snapshotDate) snapshotDate.textContent = `Recorte em ${competition.updatedAt}`;
  }

  // Comparo as campanhas lado a lado e deixo cada cartão selecionar a competição.
  function renderCompetitionComparison() {
    const container = document.querySelector("#competition-comparison");
    if (!container) return;
    const seasonLabel = document.querySelector("#comparison-season");
    const footnote = document.querySelector("#comparison-footnote");
    if (seasonLabel) seasonLabel.textContent = `TEMPORADA ${season}`;
    if (footnote)
      footnote.textContent =
        season === "2026"
          ? "Cada cartão usa o recorte e a data de atualização próprios da competição. O Brasileirão permanece em andamento."
          : "Campanhas encerradas de 2025. Os cartões mostram o retrospecto completo; a lista de partidas é parcial.";
    container.innerHTML = Object.values(catalogs)
      .map((item) => {
        const { wins, draws, losses, matches, goalsFor, goalsAgainst } = item.stats;
        const selected = item.id === competition.id;
        return `<button class="comparison-card${selected ? " is-selected" : ""}" type="button" data-competition="${item.id}" aria-pressed="${selected}">
        <span class="comparison-card-top"><strong>${item.shortName}</strong><small>${item.updatedAt}</small></span>
        <span class="comparison-record"><b>${wins}</b><i>V</i><b>${draws}</b><i>E</i><b>${losses}</b><i>D</i><small>${matches} jogos</small></span>
        <span class="comparison-goals"><span>Gols pró <b>${goalsFor}</b></span><span>Gols contra <b>${goalsAgainst}</b></span></span>
        <span class="comparison-status">${item.status}</span>
      </button>`;
      })
      .join("");
    container.addEventListener("click", (event) => {
      const card = event.target.closest("[data-competition]");
      if (!card || !catalogs[card.dataset.competition]) return;
      try {
        localStorage.setItem("fiel-em-dados:competicao", card.dataset.competition);
      } catch (_) {
        /* atualização vale nesta sessão */
      }
      window.location.reload();
    });
  }
  updateOverview();
  renderCompetitionComparison();
})();
