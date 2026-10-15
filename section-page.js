(function () {
  const data = window.dashboardData;
  const params = new URLSearchParams(window.location.search);
  const page = params.get("secao") || "desempenho";
  const target = document.querySelector("#section-content");
  const sourceLinks = {
    table:
      '<a href="https://classificacaogeral.com.br/analises-e-estatisticas/brasileirao/2026" target="_blank" rel="noreferrer">Fonte: classificação do Brasileirão ↗</a>',
    schedule:
      '<a href="https://agendaec.com.br/time/corinthians/" target="_blank" rel="noreferrer">Fonte: agenda e resultados ↗</a>',
    scorers:
      '<a href="https://ge.globo.com/futebol/times/corinthians/noticia/2026/09/24/zagueiro-vice-artilheiro-e-memphis-em-baixa-marcas-expoem-problema-ofensivo-do-corinthians.ghtml" target="_blank" rel="noreferrer">Fonte: ge · publicação em 24/09/2026 ↗</a>',
    roster:
      '<a href="https://www.sofascore.com/pt/football/team/corinthians/1957" target="_blank" rel="noreferrer">Elenco e posições: Sofascore ↗</a><a href="https://www.footballsquads.co.uk/brazil/2026/seriea/corinth.htm" target="_blank" rel="noreferrer">Camisas e dados biográficos: FootballSquads ↗</a><a href="https://gol.conmebol.com/libertadores/pt-br/news/corinthians-na-conmebol-libertadores-2026-resultados-elenco-e-calendario" target="_blank" rel="noreferrer">Inscrições e numeração: CONMEBOL ↗</a><a href="https://www.cbf.com.br/futebol-brasileiro/times/campeonato-brasileiro/serie-a/2026/20001" target="_blank" rel="noreferrer">Cadastro da competição: CBF ↗</a><a href="https://atletico.com.br/allan-e-jogador-do-galo/" target="_blank" rel="noreferrer">Naturalidade de Allan: Atlético-MG ↗</a><a href="https://www.espn.com.br/futebol/jogador/_/id/361470/renato-santos" target="_blank" rel="noreferrer">Renato Santos: ESPN ↗</a><a href="https://www.sofascore.com/pt/football/player/leo-mana/1170769" target="_blank" rel="noreferrer">Léo Mana: Sofascore ↗</a>',
  };

  function heading(kicker, title, description, stamp = "") {
    return `<div class="section-heading"><div><div class="eyebrow">${kicker}</div><h1>${title}</h1><p class="section-description">${description}</p></div>${stamp ? `<span class="section-stamp">${stamp}</span>` : ""}</div>`;
  }
  function stat(label, value, note) {
    return `<article class="metric"><div class="metric-head">${label}</div><div class="metric-value">${value}</div><div class="metric-foot">${note}</div></article>`;
  }
  function matchRow(match) {
    const index = data.recentMatches.indexOf(match);
    const [homeGoals, awayGoals] =
      match.venue === "Casa" ? match.score.split("–") : match.score.split("–").reverse();
    const home = match.venue === "Casa" ? "Corinthians" : match.opponent;
    const away = match.venue === "Casa" ? match.opponent : "Corinthians";
    const goals = match.score.split("–").map(Number);
    const result = goals[0] > goals[1] ? "VITÓRIA" : goals[0] < goals[1] ? "DERROTA" : "EMPATE";
    return `<button type="button" class="detail-result clickable-result" data-detail="match" data-index="${index}" aria-label="Ver detalhes de ${home} ${homeGoals} a ${awayGoals} ${away}, ${match.date}"><span class="result-date">${match.date}</span><strong>${home}</strong><span class="result-score">${homeGoals} × ${awayGoals}</span><strong>${away}</strong><span class="result-status result-${result.toLocaleLowerCase("pt-BR")}">${result}</span></button>`;
  }
  function scorerCard(player, index) {
    return `<article class="full-scorer"><span class="rank">${String(index + 1).padStart(2, "0")}</span><span class="scorer-detail-name"><span class="player-avatar">${player.name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join(
        "",
      )}</span><span><strong>${player.name}</strong><small>Sport Club Corinthians Paulista</small></span></span><span class="scorer-number">${player.goals}<small>gols</small></span></article>`;
  }
  function fixtureRow(fixture, index) {
    const home = fixture.home ? "Corinthians" : fixture.opponent;
    const away = fixture.home ? fixture.opponent : "Corinthians";
    return `<button type="button" class="fixture-page-row${index === 0 ? " is-next" : ""}" data-detail="fixture" data-index="${index}" aria-label="Ver detalhes: ${home} contra ${away}, ${fixture.date} às ${fixture.time}"><span class="date"><b>${fixture.date.split(" ")[0]}</b><span>${fixture.date.split(" ")[1]}</span></span><span><span class="fixture-page-name">${home} <span style="color:var(--text-muted)">×</span> ${away}</span><small class="fixture-page-meta">${fixture.competition}</small></span><span class="fixture-time">${fixture.time}</span></button>`;
  }
  function rosterCard(player) {
    const initials = player.name
      .split(/\s+/)
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    const profile = data.rosterProfiles[player.name] || {};
    const portrait = player.photo
      ? `<img class="roster-photo-image" src="${player.photo}" alt="Foto de ${player.name}" loading="lazy">`
      : `<span class="roster-initials" aria-hidden="true">${initials}</span><span class="roster-photo-caption">Foto autorizada pendente</span>`;
    const birthDate = profile.birthDate ? new Date(`${profile.birthDate}T12:00:00`) : null;
    const snapshot = new Date(`${data.rosterUpdatedAt.split("/").reverse().join("-")}T12:00:00`);
    let age = "Não informado";
    if (birthDate) {
      age = snapshot.getFullYear() - birthDate.getFullYear();
      if (
        snapshot.getMonth() < birthDate.getMonth() ||
        (snapshot.getMonth() === birthDate.getMonth() && snapshot.getDate() < birthDate.getDate())
      )
        age -= 1;
      age = `${age} anos`;
    }
    const formattedBirthDate = birthDate
      ? birthDate.toLocaleDateString("pt-BR", { timeZone: "UTC" })
      : "Não informado";
    const trajectory = data.playerTrajectories[player.name] || {
      clubs: ["Corinthians"],
    };
    const career = trajectory.clubs
      .map(
        (club, index) =>
          `<li class="career-step${index === trajectory.clubs.length - 1 ? " current" : ""}"><span class="career-marker" aria-hidden="true"></span><span class="career-club">${club}</span>${index === trajectory.clubs.length - 1 ? '<span class="career-current-label">atual</span>' : ""}</li>`,
      )
      .join("");
    const formation = trajectory.formation?.length
      ? `<div class="career-formation"><span>Formação de base</span><p>${trajectory.formation.join(" · ")}</p></div>`
      : "";
    const profileId = `profile-${data.rosterPlayers.indexOf(player)}`;
    return `<article class="roster-card" data-name="${player.name.toLocaleLowerCase("pt-BR")}" data-position="${player.position}">
      <button class="roster-card-trigger" type="button" aria-expanded="false" aria-controls="${profileId}">
        <span class="roster-photo">${portrait}<span class="roster-shirt-number">${player.number || "—"}</span></span>
        <span class="roster-card-body"><span class="roster-position">${player.position}</span><span class="roster-player-name">${player.name}</span>
          <span class="roster-player-stats"><span><strong>${player.goals}</strong><small>gols*</small></span><span><strong>${player.number || "—"}</strong><small>camisa</small></span></span>
          <span class="roster-more"><span class="roster-more-label">Ver perfil completo</span><span class="roster-chevron" aria-hidden="true">⌄</span></span>
        </span>
      </button>
      <div class="roster-profile" id="${profileId}" hidden>
        <div class="profile-facts"><div><span>Idade em ${data.rosterUpdatedAt}</span><strong>${age}</strong></div><div><span>Data de nascimento</span><strong>${formattedBirthDate}</strong></div><div class="profile-place"><span>Naturalidade</span><strong>${profile.birthplace || "Não informado nas fontes consultadas"}</strong></div></div>
        <div class="profile-career"><span class="profile-label">Trajetória profissional <small>do primeiro clube ao atual</small></span><ol class="career-timeline">${career}</ol>${formation}<small>Passagens profissionais em ordem cronológica; empréstimos estão identificados. Categorias de base aparecem separadamente quando registradas.</small></div>
      </div>
    </article>`;
  }

  const pages = {
    desempenho() {
      const s = data.stats;
      const competition = data.currentCompetition;
      const isLeague = competition.id === "brasileirao";
      const balance = s.goalsFor - s.goalsAgainst;
      document.title = `Desempenho | ${competition.shortName} | Fiel em Dados`;
      return `${heading("ANÁLISE DA TEMPORADA", `Desempenho · ${competition.shortName}`, `${competition.stage}. Campanha e resultados registrados em ${data.season}.`, `Atualizado em ${data.updatedAt}`)}
        <section class="section-summary">${isLeague ? stat("POSIÇÃO", `${s.position}º`, "classificação geral") : stat("FASE", competition.stage.split(" · ")[0], competition.status)}${stat(isLeague ? "PONTOS" : "PARTIDAS", isLeague ? s.points : s.matches, `${s.matches} jogos disputados`)}${stat("CAMPANHA", `${s.wins}V · ${s.draws}E · ${s.losses}D`, "vitórias · empates · derrotas")}${stat("SALDO DE GOLS", balance > 0 ? `+${balance}` : String(balance).replace("-", "−"), `${s.goalsFor} marcados · ${s.goalsAgainst} sofridos`)}</section>
        <section class="section-card"><div class="section-card-head"><div><h2>Campanha</h2><p>Resultados do Corinthians na competição</p></div><span class="source-tag">${s.wins}V · ${s.draws}E · ${s.losses}D</span></div>
          <div class="section-stat-grid"><div class="section-stat"><span>Vitórias</span><strong>${s.wins}</strong><small>${((s.wins / s.matches) * 100).toFixed(1).replace(".", ",")}% dos jogos</small></div><div class="section-stat"><span>Empates</span><strong>${s.draws}</strong><small>${((s.draws / s.matches) * 100).toFixed(1).replace(".", ",")}% dos jogos</small></div><div class="section-stat"><span>Derrotas</span><strong>${s.losses}</strong><small>${((s.losses / s.matches) * 100).toFixed(1).replace(".", ",")}% dos jogos</small></div></div>
        </section>
        <section class="section-card"><div class="section-card-head"><div><h2>Resultados registrados</h2><p>${data.recentMatches.length} jogos apresentados neste recorte</p></div></div><div class="detail-results">${data.recentMatches.length ? data.recentMatches.map(matchRow).join("") : '<p class="page-notice">O retrospecto está consolidado, mas as fichas de partidas ainda não foram cadastradas para este recorte.</p>'}</div><div class="page-notice">${competition.status}. A página inclui os resultados disponíveis para este recorte da competição.</div><div class="source-credit"><a href="${competition.source}" target="_blank" rel="noreferrer">Fonte: campanha e classificação ↗</a></div></section>
        <a class="section-link" href="pagina.html?secao=artilharia">Explorar artilharia <span>↗</span></a>`;
    },
    artilharia() {
      if (data.season !== data.individualDataSeason) {
        document.title = `Artilharia ${data.season} | Fiel em Dados`;
        return `${heading("DADOS EM PREPARAÇÃO", `Artilharia · ${data.season}`, "As estatísticas individuais desta temporada ainda não foram cadastradas.", "Sem dados individuais")}<section class="section-card"><div class="lineup-unavailable"><div class="lineup-unavailable-mark" aria-hidden="true">—</div><div><h2>Recorte individual indisponível</h2><p>Campanha e resultados desta competição estão disponíveis. A página não reutiliza a artilharia de outra temporada.</p><a href="${data.currentCompetition.source}" target="_blank" rel="noreferrer">Consultar a fonte da competição ↗</a></div></div></section>`;
      }
      const total = data.scoringContext.goals;
      document.title = "Artilharia | Fiel em Dados";
      return `${heading("NÚMEROS DO ELENCO", "Artilharia do Corinthians", `Gols marcados pelos jogadores em todas as competições da temporada ${data.season}.`, `Recorte de ${data.scoringContext.publishedAt}`)}
        <section class="section-summary">${stat("GOLS DO TIME", total, `em ${data.scoringContext.matches} partidas`)}${stat("ARTILHEIRO", data.allScorers[0].goals, data.allScorers[0].name)}${stat("VICE-ARTILHEIRO", data.allScorers[1].goals, data.allScorers[1].name)}${stat(
          "GOLS DO TOP 3",
          data.scorers.reduce((sum, player) => sum + player.goals, 0),
          "somados na temporada",
        )}</section>
        <section class="section-card"><div class="section-card-head"><div><h2>Gols por jogador</h2><p>Jogadores com ao menos um gol no recorte publicado</p></div></div><div class="scorer-tools"><label class="roster-search"><span class="roster-search-icon" aria-hidden="true"></span><input id="scorer-search" type="search" placeholder="Buscar artilheiro..." aria-label="Buscar artilheiro pelo nome"></label><label class="sort-control">Ordenar<select id="scorer-sort" aria-label="Ordenar artilharia"><option value="goals">Mais gols</option><option value="name">Nome</option></select></label><span id="scorer-count" class="roster-count" aria-live="polite"></span></div><div class="full-scorers">${data.allScorers.map(scorerCard).join("")}</div><div class="page-notice">Os números de artilharia foram publicados em 24/09/2026. São gols em todas as competições; o total do Brasileirão está separado na página de desempenho.</div></section>
        <a class="section-link" href="pagina.html?secao=elenco">Ir para o elenco <span>↗</span></a>`;
    },
    jogos() {
      const competition = data.currentCompetition;
      document.title = `Jogos | ${competition.shortName} | Fiel em Dados`;
      const upcoming = data.fixtures.length
        ? `<div class="fixture-page-list">${data.fixtures.map(fixtureRow).join("")}</div>`
        : `<div class="page-notice">${competition.status}. ${competition.stage}.</div>`;
      return `${heading("CALENDÁRIO E RESULTADOS", `Jogos · ${competition.shortName}`, `Consulte os compromissos e placares registrados em ${data.season}. ${competition.stage}.`, `Atualizado em ${data.updatedAt}`)}
        <div class="match-tabs" role="tablist" aria-label="Filtrar jogos"><button id="tab-upcoming" class="match-tab active" type="button" role="tab" aria-controls="view-upcoming" data-match-tab="upcoming" aria-selected="true">${data.fixtures.length ? `Próximos (${data.fixtures.length})` : "Situação"}</button><button id="tab-recent" class="match-tab" type="button" role="tab" aria-controls="view-recent" data-match-tab="recent" aria-selected="false">Resultados (${data.recentMatches.length})</button></div>
        <section id="view-upcoming" class="section-card match-view" role="tabpanel" aria-labelledby="tab-upcoming" data-match-view="upcoming"><div class="section-card-head"><div><h2>${data.fixtures.length ? "Próximos jogos" : "Situação na competição"}</h2><p>${competition.status}</p></div></div>${upcoming}</section>
        <section id="view-recent" class="section-card match-view" role="tabpanel" aria-labelledby="tab-recent" data-match-view="recent" hidden><div class="section-card-head"><div><h2>Resultados recentes</h2><p>${data.recentMatches.length} partidas neste recorte</p></div></div><div class="detail-results">${data.recentMatches.length ? data.recentMatches.map(matchRow).join("") : '<p class="page-notice">A campanha completa está resumida acima. Fichas de partidas deste torneio ainda não foram adicionadas.</p>'}</div></section>
        <a class="section-link" href="pagina.html?secao=desempenho">Ver análise de desempenho <span>↗</span></a>`;
    },
    elenco() {
      if (data.season !== data.individualDataSeason) {
        document.title = `Elenco ${data.season} | Fiel em Dados`;
        return `${heading("DADOS EM PREPARAÇÃO", `Elenco · ${data.season}`, "Os dados de elenco e perfis individuais disponíveis no painel são da temporada 2026.", "Elenco 2026")}<section class="section-card"><div class="lineup-unavailable"><div class="lineup-unavailable-mark" aria-hidden="true">—</div><div><h2>Elenco histórico ainda não cadastrado</h2><p>Essa separação evita apresentar jogadores, idades ou trajetórias de 2026 como se fossem do elenco de 2025.</p></div></div></section>`;
      }
      document.title = "Elenco | Fiel em Dados";
      const positions = ["Todos", "Goleiro", "Defensor", "Meio-campista", "Atacante"];
      const positionLabels = {
        Todos: "Todos",
        Goleiro: "Goleiros",
        Defensor: "Defensores",
        "Meio-campista": "Meio-campistas",
        Atacante: "Atacantes",
      };
      return `${heading("CONHEÇA O TIME", "Elenco do Corinthians", "Perfis rápidos com posição e gols no recorte disponível. Use a busca ou filtre por setor.", `Elenco consultado em ${data.rosterUpdatedAt}`)}
        <section class="roster-tools" aria-label="Filtros do elenco"><label class="roster-search"><span class="roster-search-icon" aria-hidden="true"></span><input id="roster-search" type="search" placeholder="Buscar jogador..." aria-label="Buscar jogador pelo nome"></label><div class="roster-filters" role="group" aria-label="Filtrar jogadores por posição">${positions.map((position, index) => `<button type="button" class="roster-filter${index === 0 ? " active" : ""}" data-filter="${position}" aria-pressed="${index === 0}">${positionLabels[position]}</button>`).join("")}</div><span class="roster-count" id="roster-count" aria-live="polite"></span></section>
        <section class="roster-grid" id="roster-grid" aria-label="Jogadores do Corinthians">${data.rosterPlayers.map(rosterCard).join("")}</section>
        <p class="roster-footnote">* Gols em todas as competições no recorte publicado em ${data.scoringContext.publishedAt}. Idades calculadas em ${data.rosterUpdatedAt}. Abra um perfil para ver a trajetória profissional e a formação de base.</p>
        <div class="source-credit">${sourceLinks.roster}</div>`;
    },
    escalacao() {
      document.title = "Escalação | Fiel em Dados";
      const match = data.recentMatches[data.recentMatches.length - 1];
      if (!match?.lineup?.corinthians?.length) {
        return `${heading(`TIME TITULAR · ${data.season}`, `Escalação · ${data.currentCompetition.shortName}`, `A última partida deste recorte foi ${match?.opponent || data.currentCompetition.shortName}.`, `Fonte consultada em ${data.updatedAt}`)}
          <section class="section-card"><div class="lineup-unavailable"><div class="lineup-unavailable-mark" aria-hidden="true">XI</div><div><h2>Escalação não disponível neste recorte</h2><p>As fontes consultadas confirmam o resultado da partida, mas não trazem a escalação completa em formato verificável para esta página.</p><a href="${match?.source || data.currentCompetition.source}" target="_blank" rel="noreferrer">Consultar fonte da competição ↗</a></div></div></section>`;
      }
      const groups = [
        {
          label: "ATAQUE",
          role: "atacante",
          players: [
            { name: "André Carrillo", position: "Ponta" },
            { name: "Yuri Alberto", position: "Atacante" },
            { name: "Memphis Depay", position: "Atacante" },
          ],
        },
        {
          label: "MEIO-CAMPO",
          role: "meio-campo",
          players: [
            { name: "André", position: "Volante" },
            { name: "Breno Bidon", position: "Meia" },
            { name: "Raniele", position: "Volante" },
          ],
        },
        {
          label: "DEFESA",
          role: "defesa",
          players: [
            { name: "Matheus Bidu", position: "Lateral" },
            { name: "Gabriel Paulista", position: "Zagueiro" },
            { name: "Gustavo Henrique", position: "Zagueiro" },
            { name: "Matheuzinho", position: "Lateral" },
          ],
        },
        {
          label: "GOLEIRO",
          role: "goleiro",
          players: [{ name: "Hugo Souza", position: "Goleiro" }],
        },
      ];
      const starters = match.lineup.corinthians;
      const pitchPlayer = ({ name, position }) => {
        const initials = name
          .split(/\s+/)
          .map((part) => part[0])
          .slice(0, 2)
          .join("")
          .toUpperCase();
        return `<div class="pitch-player" title="${name} · ${position}"><span class="pitch-player-mark">${initials}</span><strong>${name}</strong><small>${position}</small></div>`;
      };
      return `${heading("TIME TITULAR · BRASILEIRÃO 2026", "Escalação do Corinthians", "Visual tático da última escalação registrada. A disposição em campo é uma representação visual baseada nos titulares da partida.", `Formação visual · 4–3–3`)}
        <div class="lineup-layout"><section class="lineup-card"><div class="lineup-card-head"><div><span class="lineup-label">CAMPO TÁTICO</span><h2>Time titular</h2></div><span class="formation-badge">4–3–3</span></div>
          <div class="tactical-pitch" role="img" aria-label="Campo de futebol com a escalação titular do Corinthians organizada em formação visual 4-3-3"><span class="pitch-halfway"></span><span class="pitch-center-circle"></span><span class="pitch-box pitch-box-top"></span><span class="pitch-box pitch-box-bottom"></span>
            ${groups.map((group) => `<div class="pitch-row pitch-row-${group.role}"><span class="pitch-row-label">${group.label}</span>${group.players.map(pitchPlayer).join("")}</div>`).join("")}
          </div><p class="pitch-hint">Os nomes e titulares refletem a escalação publicada para a partida selecionada.</p>
        </section><aside class="lineup-aside"><section class="lineup-card lineup-match-card"><span class="lineup-label">PARTIDA DE REFERÊNCIA</span><h2>${match.opponent}</h2><div class="lineup-score"><strong>Corinthians</strong><b>${match.score.replace("–", " × ")}</b><strong>${match.opponent}</strong></div><div class="lineup-match-meta"><div><span>Data</span><strong>${match.date}</strong></div><div><span>Horário</span><strong>${match.time}</strong></div><div><span>Estádio</span><strong>${match.stadium}</strong></div><div><span>Local</span><strong>${match.city}</strong></div></div></section>
          <section class="lineup-card lineup-roster-card"><div class="lineup-card-head"><div><span class="lineup-label">ONZE INICIAL</span><h2>Jogadores</h2></div><span class="source-tag">${starters.length} titulares</span></div><ol class="lineup-starters">${starters.map((name, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span>${name}</li>`).join("")}</ol></section></aside></div>
        <p class="lineup-source-note">A formação é uma organização visual deste dashboard, não uma confirmação tática oficial. <a href="${match.source}" target="_blank" rel="noreferrer">Consultar fonte da escalação ↗</a></p>`;
    },
    noticias() {
      document.title = "Últimas notícias | Fiel em Dados";
      return `${heading("ACOMPANHE O TIMÃO", "Últimas notícias", "Atualizações sobre o Corinthians reunidas do feed de notícias do UOL Esporte.", "Atualização automática")}
        <section class="section-card news-section"><div class="section-card-head"><div><h2>Notícias do Corinthians</h2><p id="news-status" aria-live="polite">Carregando notícias…</p></div><button class="news-refresh" id="news-refresh" type="button">Atualizar agora</button></div>
          <div id="news-list" class="news-list" aria-live="polite"></div><div class="news-update-line"><span>Feed consultado em</span><strong id="news-updated">—</strong></div>
        </section><p class="news-attribution">As manchetes e os links pertencem aos veículos de origem. A lista atualiza quando a página é aberta e consulta novos dados periodicamente. <a href="https://rss.uol.com.br/" target="_blank" rel="noreferrer">Sobre o RSS do UOL ↗</a></p>`;
    },
  };

  const render = pages[page] || pages.desempenho;
  target.innerHTML = render();
  const activeLink = document.querySelector(`[data-nav="${pages[page] ? page : "desempenho"}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
    activeLink.setAttribute("aria-current", "page");
  }

  const sourceByPage = {
    desempenho: `<a href="${data.currentCompetition.source}" target="_blank" rel="noreferrer">Fonte: ${data.currentCompetition.shortName} ${data.season} ↗</a>`,
    artilharia: data.season === data.individualDataSeason ? sourceLinks.scorers : "",
    jogos: `<a href="${data.currentCompetition.scheduleSource}" target="_blank" rel="noreferrer">Fonte: jogos e resultados · ${data.currentCompetition.shortName} ${data.season} ↗</a>`,
    elenco: data.season === data.individualDataSeason ? sourceLinks.roster : "",
    escalacao: "",
    noticias: "",
  };
  document.querySelector("#section-sources").innerHTML =
    sourceByPage[pages[page] ? page : "desempenho"];
  document.querySelectorAll("#section-sources a").forEach((link) => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noreferrer");
  });
  if (page === "elenco") {
    const search = document.querySelector("#roster-search");
    const cards = [...document.querySelectorAll(".roster-card")];
    const count = document.querySelector("#roster-count");
    let selectedPosition = "Todos";
    function filterRoster() {
      const query = search.value.trim().toLocaleLowerCase("pt-BR");
      let visible = 0;
      cards.forEach((card) => {
        const matches =
          card.dataset.name.includes(query) &&
          (selectedPosition === "Todos" || card.dataset.position === selectedPosition);
        card.hidden = !matches;
        if (matches) visible += 1;
      });
      count.textContent = `${visible} ${visible === 1 ? "jogador" : "jogadores"}`;
    }
    search.addEventListener("input", filterRoster);
    document.querySelectorAll(".roster-filter").forEach((button) =>
      button.addEventListener("click", () => {
        selectedPosition = button.dataset.filter;
        document.querySelectorAll(".roster-filter").forEach((filter) => {
          const active = filter === button;
          filter.classList.toggle("active", active);
          filter.setAttribute("aria-pressed", String(active));
        });
        filterRoster();
      }),
    );
    document.querySelectorAll(".roster-card-trigger").forEach((button) =>
      button.addEventListener("click", () => {
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!expanded));
        document.getElementById(button.getAttribute("aria-controls")).hidden = expanded;
        button.querySelector(".roster-more-label").textContent = expanded
          ? "Ver perfil completo"
          : "Fechar perfil";
      }),
    );
    filterRoster();
  }
  if (page === "artilharia") {
    const list = document.querySelector(".full-scorers");
    const original = [...list.children];
    const search = document.querySelector("#scorer-search");
    const sort = document.querySelector("#scorer-sort");
    const count = document.querySelector("#scorer-count");
    function filterScorers() {
      const query = search.value.trim().toLocaleLowerCase("pt-BR");
      const rows = original.filter((row) =>
        row.textContent.toLocaleLowerCase("pt-BR").includes(query),
      );
      rows.sort((a, b) =>
        sort.value === "name"
          ? a
              .querySelector(".scorer-detail-name strong")
              .textContent.localeCompare(
                b.querySelector(".scorer-detail-name strong").textContent,
                "pt-BR",
              )
          : Number.parseInt(b.querySelector(".scorer-number").textContent, 10) -
            Number.parseInt(a.querySelector(".scorer-number").textContent, 10),
      );
      rows.forEach((row, index) => {
        row.querySelector(".rank").textContent = String(index + 1).padStart(2, "0");
        list.append(row);
      });
      original
        .filter((row) => !rows.includes(row))
        .forEach((row) => {
          row.hidden = true;
        });
      rows.forEach((row) => {
        row.hidden = false;
      });
      count.textContent = `${rows.length} ${rows.length === 1 ? "jogador" : "jogadores"}`;
    }
    search.addEventListener("input", filterScorers);
    sort.addEventListener("change", filterScorers);
    filterScorers();
  }
  if (page === "jogos") {
    document.querySelectorAll("[data-match-tab]").forEach((tab) =>
      tab.addEventListener("click", () => {
        const selected = tab.dataset.matchTab;
        document.querySelectorAll("[data-match-tab]").forEach((item) => {
          const active = item === tab;
          item.classList.toggle("active", active);
          item.setAttribute("aria-selected", String(active));
        });
        document.querySelectorAll("[data-match-view]").forEach((view) => {
          view.hidden = view.dataset.matchView !== selected;
        });
      }),
    );
  }
  document
    .querySelectorAll(".metric-value")
    .forEach((metric) => metric.classList.add("motion-ready"));
})();
