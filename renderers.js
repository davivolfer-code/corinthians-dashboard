(function () {
  const data = window.dashboardData;

  // Eu monto os componentes a partir dos dados para manter o HTML mais limpo.
  function renderRecentMatches() {
    const target = document.querySelector("#recent-results");
    if (!data.recentMatches.length) {
      target.innerHTML =
        '<p class="competition-empty">O retrospecto geral está disponível; partidas individuais deste recorte ainda não foram cadastradas.</p>';
      return;
    }
    target.innerHTML = data.recentMatches
      .map(
        (match, index) => `
      <button class="recent-match" type="button" data-detail="match" data-index="${index}" title="${match.date} · ${match.venue}" aria-label="${match.date}: Corinthians ${match.score} ${match.opponent}">
        <span class="match-date">${match.date}</span>
        <strong>${match.score}</strong>
        <span class="match-opponent">${match.opponent} · ${match.time || "horário N/D"}</span>
        <i class="${Number(match.score.split("–")[0]) > Number(match.score.split("–")[1]) ? "win-marker" : Number(match.score.split("–")[0]) < Number(match.score.split("–")[1]) ? "loss-marker" : "draw-marker"}" aria-label="Resultado da partida"></i>
      </button>`,
      )
      .join("");
  }

  function renderScorers() {
    if (!data.scorers.length) {
      document.querySelector("#scorers").innerHTML =
        '<tr><td colspan="3">Artilharia individual ainda não cadastrada para esta temporada.</td></tr>';
      return;
    }
    const maxGoals = Math.max(...data.scorers.map((player) => player.goals));
    document.querySelector("#scorers").innerHTML = data.scorers
      .map(
        (player, index) => `
      <tr><td><button class="scorer-name" type="button" data-detail="player" data-index="${index}"><span class="player-avatar">${String(index + 1).padStart(2, "0")}</span><b>${player.name}</b></button></td>
      <td><span class="scorer-total">${player.goals}<small> gols</small></span></td>
      <td><span class="scorer-track" role="img" aria-label="${player.goals} gols; referência de ${maxGoals}"><i style="width:${(player.goals / maxGoals) * 100}%"></i></span></td></tr>`,
      )
      .join("");
  }

  function renderFixtures() {
    document.querySelector("#fixtures").innerHTML = data.fixtures.length
      ? data.fixtures
          .map(
            (fixture, index) => `
      <button class="fixture${index === 0 ? " featured" : ""}" type="button" data-detail="fixture" data-index="${index}" aria-label="Detalhes: ${fixture.home ? "Corinthians" : fixture.opponent} contra ${fixture.home ? fixture.opponent : "Corinthians"}, ${fixture.date}, ${fixture.time}">
        <span class="date"><b>${fixture.date.split(" ")[0]}</b><span>${fixture.date.split(" ")[1]}</span></span>
        <span class="fixture-info"><b>${fixture.home ? "Corinthians" : fixture.opponent} <span>×</span> ${fixture.home ? fixture.opponent : "Corinthians"}</b><small>${fixture.competition}</small></span>
        <span class="fixture-time">${fixture.time}</span>
      </button>`,
          )
          .join("")
      : `<p class="competition-empty">${data.currentCompetition.status}. ${data.currentCompetition.stage}.</p>`;
  }

  renderRecentMatches();
  renderScorers();
  renderFixtures();
})();
