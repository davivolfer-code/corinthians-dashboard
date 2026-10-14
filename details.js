(function () {
  const data = window.dashboardData;
  // Eu centralizo as fichas aqui para reaproveitar os mesmos detalhes no painel.
  const sources = {
    table:
      '<a href="https://classificacaogeral.com.br/analises-e-estatisticas/brasileirao/2026" target="_blank" rel="noreferrer">Fonte: classificação do Brasileirão ↗</a>',
    schedule:
      '<a href="https://agendaec.com.br/time/corinthians/" target="_blank" rel="noreferrer">Fonte: agenda e resultados ↗</a>',
    scorers:
      '<a href="https://ge.globo.com/futebol/times/corinthians/noticia/2026/09/24/zagueiro-vice-artilheiro-e-memphis-em-baixa-marcas-expoem-problema-ofensivo-do-corinthians.ghtml" target="_blank" rel="noreferrer">Fonte: ge · recorte de 24/09/2026 ↗</a>',
  };

  function metric(label, value, note) {
    return `<div class="detail-stat"><span>${label}</span><strong>${value}</strong><small>${note}</small></div>`;
  }

  function matchLine(match) {
    const home = match.venue === "Casa" ? "Corinthians" : match.opponent;
    const away = match.venue === "Casa" ? match.opponent : "Corinthians";
    const [homeScore, awayScore] =
      match.venue === "Casa" ? match.score.split("–") : match.score.split("–").reverse();
    return `<tr><td>${match.date}</td><td>${home}</td><td class="score-cell">${homeScore} × ${awayScore}</td><td>${away}</td></tr>`;
  }

  function fixtureLine(fixture) {
    const home = fixture.home ? "Corinthians" : fixture.opponent;
    const away = fixture.home ? fixture.opponent : "Corinthians";
    return `<div class="detail-fixture"><span class="date"><b>${fixture.date.split(" ")[0]}</b><span>${fixture.date.split(" ")[1]}</span></span><div><strong>${home} <i>×</i> ${away}</strong><small>${fixture.competition}</small></div><b class="fixture-time">${fixture.time}</b></div>`;
  }

  function scorerRow(player, index) {
    const percentage = (player.goals / data.scoringContext.goals) * 100;
    return `<div class="detail-scorer"><span class="rank">${String(index + 1).padStart(2, "0")}</span><div class="detail-scorer-main"><strong>${player.name}</strong><span class="detail-scorer-bar"><i style="width:${(player.goals / data.scorers[0].goals) * 100}%"></i></span></div><b>${player.goals}<small> gols</small></b><small class="share">${percentage.toFixed(1).replace(".", ",")}% dos gols</small></div>`;
  }

  function build(type, index) {
    const s = data.stats;
    const totalMatches = data.scoringContext.matches;
    const shared = (title, body, source, kicker = `TEMPORADA ${data.season} · DETALHES`) => ({
      title,
      body,
      source,
      kicker,
    });

    if (type === "campaign") {
      if (data.currentCompetition.id !== "brasileirao") {
        const balance = s.goalsFor - s.goalsAgainst;
        return shared(
          `Campanha · ${data.currentCompetition.shortName}`,
          `
          <div class="detail-stat-grid">${metric("Partidas", s.matches, data.currentCompetition.stage)}${metric("Campanha", `${s.wins}V · ${s.draws}E · ${s.losses}D`, "vitórias · empates · derrotas")}${metric("Gols marcados", s.goalsFor, `${(s.goalsFor / s.matches).toFixed(2).replace(".", ",")} por jogo`)}${metric("Saldo de gols", balance > 0 ? `+${balance}` : String(balance).replace("-", "−"), `${s.goalsAgainst} sofridos`)}</div>
          <p class="detail-note">${data.currentCompetition.status}. Os resultados por partida e o estágio final estão documentados na página da competição.</p>`,
          `<a href="${data.currentCompetition.source}" target="_blank" rel="noreferrer">Fonte: ${data.currentCompetition.shortName} ${data.season} ↗</a>`,
        );
      }
      const pointsPercentage = ((s.points / (s.matches * 3)) * 100).toFixed(1).replace(".", ",");
      const balance = s.goalsFor - s.goalsAgainst;
      const remaining = Math.max(0, 38 - s.matches);
      return shared(
        `Campanha no Brasileirão ${data.season}`,
        `
        <div class="detail-stat-grid">${metric("Posição", `${s.position}º`, "classificação geral")}${metric("Pontos", s.points, `${s.matches} partidas`)}${metric("Aproveitamento", `${pointsPercentage}%`, "pontos conquistados")}${metric("Saldo", balance > 0 ? `+${balance}` : String(balance).replace("-", "−"), `${s.goalsFor} gols pró · ${s.goalsAgainst} contra`)}</div>
        <div class="detail-section"><h3>Resultados</h3><div class="detail-stat-grid compact">${metric("Vitórias", s.wins, "3 pontos cada")}${metric("Empates", s.draws, "1 ponto cada")}${metric("Derrotas", s.losses, "sem pontos")}</div></div>
        <div class="detail-callout"><span class="callout-icon">i</span><div><strong>${remaining ? `${remaining} rodadas restantes` : "Temporada encerrada"}</strong><p>A temporada teve 38 rodadas. ${remaining ? `Há ${remaining} partidas restantes no recorte.` : `O Corinthians terminou em ${s.position}º lugar, com ${s.points} pontos.`}</p></div></div>`,
        `<a href="${data.currentCompetition.source}" target="_blank" rel="noreferrer">Fonte: Brasileirão ${data.season} ↗</a>`,
      );
    }

    if (type === "goalsFor" || type === "goalsAgainst") {
      const scored = type === "goalsFor";
      const count = scored ? s.goalsFor : s.goalsAgainst;
      const avg = (count / s.matches).toFixed(2).replace(".", ",");
      if (data.currentCompetition.id !== "brasileirao") {
        return shared(
          scored ? "Gols marcados" : "Gols sofridos",
          `
          <div class="detail-feature"><strong>${count}</strong><span>${scored ? "gols marcados" : "gols sofridos"} em ${s.matches} partidas da ${data.currentCompetition.shortName}</span></div>
          <div class="detail-stat-grid compact">${metric("Média por partida", avg, "por jogo")}${metric("Campanha", `${s.wins}V · ${s.draws}E · ${s.losses}D`, "vitórias · empates · derrotas")}${metric("Saldo de gols", s.goalsFor - s.goalsAgainst, "gols pró menos gols contra")}</div>
          <p class="detail-note">${data.currentCompetition.stage}</p>`,
          `<a href="${data.currentCompetition.source}" target="_blank" rel="noreferrer">Fonte: ${data.currentCompetition.shortName} ↗</a>`,
        );
      }
      return shared(
        scored ? "Gols marcados" : "Gols sofridos",
        `
        <div class="detail-feature"><strong>${count}</strong><span>${scored ? "gols marcados" : "gols sofridos"} em ${s.matches} rodadas</span></div>
        <div class="detail-stat-grid compact">${metric("Média por jogo", avg, "por partida")}${metric("Campanha", `${s.wins}V · ${s.draws}E · ${s.losses}D`, "Brasileirão Série A")}${metric("Saldo de gols", s.goalsFor - s.goalsAgainst, `${s.goalsFor} pró e ${s.goalsAgainst} contra`)}</div>
        <p class="detail-note">Recorte da classificação consultada em ${data.updatedAt}.</p>`,
        `<a href="${data.currentCompetition.source}" target="_blank" rel="noreferrer">Fonte: Brasileirão ${data.season} ↗</a>`,
      );
    }

    if (type === "recent") {
      if (data.currentCompetition.id !== "brasileirao") {
        return shared(
          `Resultados · ${data.currentCompetition.shortName}`,
          `
          <div class="detail-callout"><span class="callout-icon">i</span><div><strong>${data.currentCompetition.status}</strong><p>${data.currentCompetition.stage}. O recorte abaixo apresenta as partidas transcritas para o dashboard.</p></div></div>
          ${data.recentMatches.length ? `<div class="detail-table-wrap"><table class="detail-table"><thead><tr><th>DATA</th><th>MANDANTE</th><th>PLACAR</th><th>VISITANTE</th></tr></thead><tbody>${data.recentMatches.map(matchLine).join("")}</tbody></table></div>` : '<p class="detail-note">O retrospecto geral está cadastrado, mas ainda não há fichas de partidas transcritas para este recorte.</p>'}`,
          `<a href="${data.currentCompetition.source}" target="_blank" rel="noreferrer">Fonte: ${data.currentCompetition.shortName} ${data.season} ↗</a>`,
        );
      }
      return shared(
        "Histórico recente",
        `
        <div class="detail-callout"><span class="callout-icon">i</span><div><strong>${data.currentCompetition.status}</strong><p>Resultados do Brasileirão ${data.season} incluídos no recorte.</p></div></div>
        <div class="detail-table-wrap"><table class="detail-table"><thead><tr><th>DATA</th><th>MANDANTE</th><th>PLACAR</th><th>VISITANTE</th></tr></thead><tbody>${data.recentMatches.map(matchLine).join("")}</tbody></table></div>`,
        `<a href="${data.currentCompetition.scheduleSource}" target="_blank" rel="noreferrer">Fonte: jogos e resultados ${data.season} ↗</a>`,
      );
    }

    if (type === "match") {
      const match = data.recentMatches[index];
      const home = match.venue === "Casa" ? "Corinthians" : match.opponent;
      const away = match.venue === "Casa" ? match.opponent : "Corinthians";
      const displayedScore =
        match.venue === "Casa" ? match.score : match.score.split("–").reverse().join("–");
      const goals = (match.goals || [])
        .map(
          (goal) =>
            `<li class="match-event"><span class="match-event-time">${goal.minute === "N/D" ? "Minuto N/D" : goal.minute}</span><span><strong>${goal.scorer}</strong><small>${goal.team}${goal.scorer.includes("(contra)") ? " · gol contra" : ""}</small></span></li>`,
        )
        .join("");
      const lineup = match.lineup?.corinthians?.length
        ? `<div class="detail-section"><h3>Escalação do Corinthians</h3><ol class="lineup-list">${match.lineup.corinthians.map((player) => `<li>${player}</li>`).join("")}</ol></div>`
        : `<p class="detail-note">A escalação inicial do Corinthians não está transcrita neste recorte. Consulte a ficha da partida no link abaixo.</p>`;
      const goalDetails = goals
        ? `<div class="detail-section"><h3>Gols da partida</h3><ol class="match-events">${goals}</ol></div>`
        : `<div class="detail-callout"><span class="callout-icon">i</span><div><strong>Gols e minutagem</strong><p>A cronologia completa não foi transcrita para este recorte. Consulte a súmula da partida no link abaixo.</p></div></div>`;
      return shared(
        `${home} × ${away}`,
        `
        <div class="match-detail-score"><span>${home}</span><strong>${displayedScore.replace("–", " × ")}</strong><span>${away}</span></div>
        <div class="detail-stat-grid">${metric("Data", match.date, data.currentCompetition.shortName + " " + data.season)}${metric("Horário", match.time || "Não informado", "horário local informado")}${metric("Estádio", match.stadium || "Não informado", match.city || "")}${metric("Mandante", match.venue === "Casa" ? "Corinthians" : match.opponent, "partida oficial")}${match.decidedBy ? metric("Desempate", match.decidedBy, "fase eliminatória") : ""}</div>
        ${lineup}${goalDetails}`,
        match.source
          ? `<a href="${match.source}" target="_blank" rel="noreferrer">Fonte: ficha e lances da partida ↗</a>`
          : data.currentCompetition.scheduleSource,
        `JOGO · ${data.currentCompetition.shortName.toLocaleUpperCase("pt-BR")} ${data.season}`,
      );
    }

    if (type === "scorers") {
      if (data.season !== data.individualDataSeason) {
        return shared(
          `Artilharia · ${data.season}`,
          '<p class="detail-note">A artilharia individual desta temporada ainda não foi cadastrada. Os números de outro ano não são reutilizados.</p>',
          `<a href="${data.currentCompetition.source}" target="_blank" rel="noreferrer">Fonte: campanha de ${data.currentCompetition.shortName} ↗</a>`,
        );
      }
      return shared(
        "Artilharia do Corinthians",
        `
        <div class="detail-feature scorer-feature"><strong>${data.scoringContext.goals}</strong><span>gols do Corinthians em ${totalMatches} jogos, em todas as competições, no recorte de 24/09.</span></div>
        <div class="detail-section"><h3>Maiores goleadores</h3><div class="detail-scorers">${data.scorers.map(scorerRow).join("")}</div></div>
        <p class="detail-note">Os gols individuais e o total do time vêm do mesmo recorte publicado em 24/09/2026. A barra compara os três destaques exibidos.</p>`,
        sources.scorers,
      );
    }

    if (type === "player") {
      const player = data.scorers[index];
      const share = (player.goals / data.scoringContext.goals) * 100;
      return shared(
        player.name,
        `
        <div class="player-detail-hero"><span class="player-avatar">${String(index + 1).padStart(2, "0")}</span><div><strong>${player.goals} gols</strong><small>Temporada 2026 · todas as competições</small></div></div>
        <div class="detail-stat-grid compact">${metric("Gols", player.goals, "no recorte publicado")}${metric("Participação", `${share.toFixed(1).replace(".", ",")}%`, `do total de ${data.scoringContext.goals} gols do time`)}</div>
        <p class="detail-note">O recorte individual é de 24/09/2026; a página não atribui assistências ou minutos sem uma fonte correspondente.</p>`,
        sources.scorers,
        "JOGADOR · TEMPORADA 2026",
      );
    }

    if (type === "fixtures") {
      if (!data.fixtures.length) {
        return shared(
          `Agenda · ${data.currentCompetition.shortName}`,
          `
          <div class="detail-callout"><span class="callout-icon">i</span><div><strong>${data.currentCompetition.status}</strong><p>${data.currentCompetition.stage}. Não há próximos jogos cadastrados neste recorte.</p></div></div>`,
          `<a href="${data.currentCompetition.scheduleSource}" target="_blank" rel="noreferrer">Fonte: calendário da competição ↗</a>`,
        );
      }
      return shared(
        "Próximos jogos",
        `
        <p class="detail-note intro-note">Agenda consultada em ${data.updatedAt}. Horários de Brasília, sujeitos à confirmação da organização da competição.</p>
        <div class="detail-fixtures">${data.fixtures.map(fixtureLine).join("")}</div>`,
        sources.schedule,
      );
    }

    if (type === "fixture") {
      const fixture = data.fixtures[index];
      const home = fixture.home ? "Corinthians" : fixture.opponent;
      const away = fixture.home ? fixture.opponent : "Corinthians";
      return shared(
        `${home} × ${away}`,
        `
        <div class="match-detail-score upcoming"><span>${home}</span><strong>VS</strong><span>${away}</span></div>
        <div class="detail-stat-grid">${metric("Data", fixture.date, `Brasileirão ${data.season}`)}${metric("Horário", fixture.time, "horário de Brasília")}${metric("Estádio", fixture.stadium || fixture.competition.split("·").pop().trim(), fixture.city || "")}${metric("Mandante", fixture.home ? "Corinthians" : fixture.opponent, "fase regular")}</div>
        <p class="detail-note">A data e o horário podem mudar por decisão da organização da competição.</p>`,
        data.currentCompetition.scheduleSource,
        `AGENDA · BRASILEIRÃO ${data.season}`,
      );
    }

    return shared(
      "Sobre este recorte",
      `
      <div class="detail-callout"><span class="callout-icon">i</span><div><strong>Temporada 2026</strong><p>Campanha e calendário referem-se ao Brasileirão Série A. Artilharia usa gols do elenco em todas as competições e tem referência própria: 24/09/2026.</p></div></div>
      <div class="detail-stat-grid compact">${metric("Classificação consultada", data.updatedAt, "Brasileirão Série A")}${metric("Artilharia publicada", data.scoringContext.publishedAt, "todas as competições")}</div>`,
      `${sources.table}<br>${sources.scorers}`,
    );
  }

  window.DashboardDetails = { build };
})();
