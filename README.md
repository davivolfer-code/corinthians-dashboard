# Fiel em Dados — Dashboard do Corinthians

Dashboard de futebol desenvolvido como projeto de portfólio para explorar dados do Corinthians com uma interface responsiva e interativa. A aplicação reúne campanhas do Brasileirão Série A, Copa do Brasil, Libertadores e Paulistão 2026, artilharia da temporada, elenco e calendário, com fontes e datas de referência visíveis.

> Projeto front-end estático: HTML semântico, CSS e JavaScript nativo, sem dependências de build. Estatísticas e elenco são retratos documentados; as notícias recebem atualização automática via RSS.

## Destaques para portfólio

- Navegação por visões detalhadas sem dependências externas ou etapa de compilação.
- Indicadores, resultados e atletas abrem detalhes contextuais; elenco e artilharia têm busca e filtros.
- Separação entre camada de dados (`data.js`), renderização (`renderers.js`) e conteúdo detalhado (`details.js`).
- Interface adaptável a telas menores, estados de foco para teclado e suporte à preferência por movimento reduzido.
- Alternância entre temas claro e escuro, respeitando o sistema na primeira visita e salvando a preferência entre páginas e visitas.
- Feed de notícias do Corinthians atualizado por GitHub Actions, sem chave de API no navegador.
- Fontes, recortes temporais e limitações documentados para tornar a leitura dos números verificável.

## Executar localmente

Abra `index.html` diretamente no navegador ou sirva esta pasta com qualquer servidor estático. Não há instalação de pacotes nem etapa de build. As fontes tipográficas vêm do Google Fonts; sem internet, o navegador usa as fontes de reserva do sistema.

## Repositório e publicação

- Repositório público: [davivolfer-code/corinthians-dashboard](https://github.com/davivolfer-code/corinthians-dashboard).
- Dashboard publicado: [davivolfer-code.github.io/corinthians-dashboard](https://davivolfer-code.github.io/corinthians-dashboard/).
- O GitHub Pages publica a raiz da branch `main`; novos commits nessa branch atualizam o site.
- O workflow de notícias está no repositório. Para permitir que ele grave manchetes atualizadas, habilite **Settings → Actions → General → Workflow permissions → Read and write permissions** e execute uma vez **Actions → Atualizar notícias do Corinthians → Run workflow**.

Como os arquivos usam caminhos relativos, o site também funciona em repositório de projeto, cujo endereço inclui o nome do repositório. Antes de divulgar, revise os créditos e direitos de uso de imagens, escudo e dados.

## O que funciona

- Menu lateral abre páginas próprias de Desempenho, Elenco, Artilharia e Jogos na mesma aba. As páginas de análise ficam em `pagina.html?secao=...`.
- O seletor de campeonato alterna entre Brasileirão, Copa do Brasil, Libertadores e Paulistão 2026; campanha e partidas acompanham a competição selecionada. Elenco e artilharia permanecem como recortes da temporada quando os dados não estão separados por torneio.
- O seletor de temporada alterna entre 2025 e 2026; a lista de competições muda conforme o ano e mantém os números de cada recorte separados.
- A visão geral compara vitórias, empates, derrotas e gols nas quatro competições; selecionar um cartão troca o recorte ativo.
- Cartões de indicadores abrem os cálculos e o contexto do dado.
- Cada resultado recente abre uma ficha com data, horário, estádio, escalação inicial do Corinthians e linha do tempo de gols, quando esses dados estão disponíveis.
- No painel inicial, cada jogador em destaque abre um painel com seus gols e participação no total do recorte.
- A página Elenco mostra os jogadores cadastrados, permite busca por nome e filtro por posição e abre idade, nascimento, naturalidade, formação e trajetória profissional em ordem cronológica ao clicar em um atleta.
- A página Artilharia permite buscar e ordenar os jogadores por gols ou nome.
- A página Jogos alterna entre próximos compromissos e resultados recentes sem sair da página.
- Últimas notícias reúne manchetes do RSS do UOL Esporte, com data, resumo, fonte e link para o artigo original; a coleta agendada roda a cada 30 minutos.
- Cartões, listas, filtros e números têm estados visuais animados, com suporte à configuração de movimento reduzido do sistema.
- Próximos jogos abrem detalhes de data, horário, estádio e cidade. Resultados e compromissos também são clicáveis na página Jogos.
- A janela de detalhes fecha pelo botão, clicando fora dela ou com a tecla `Esc`.
- Os controles são acessíveis por teclado e têm foco visível.

## Dados exibidos

- Temporada 2025: Brasileirão (13º, 47 pontos, 42 gols marcados e 47 sofridos), Paulistão (campeão), Copa do Brasil (campeão), Libertadores e Sul-Americana. As campanhas agregadas vêm do histórico sazonal do O Gol; alguns recortes de mata-mata foram conferidos com CBF e Federação Paulista. Os resultados exibidos em cada página são uma seleção de partidas, não o calendário completo.

- Classificação e campanha: consulta de 13/10/2026. Corinthians em 16º, com 32 pontos em 30 jogos (8 vitórias, 8 empates e 14 derrotas), 31 gols marcados e 38 sofridos.
- Copa do Brasil: campanha encerrada nas oitavas contra o Internacional; resultados e retrospecto conferidos com a CBF e bases de calendário em 2026.
- Libertadores: campanha encerrada nas quartas contra o Estudiantes; resultados das fases de grupos e eliminatórias consolidados a partir do balanço da CONMEBOL.
- Paulistão: campanha encerrada na semifinal contra o Novorizontino; fase final conferida com a Federação Paulista e bases de resultados.
- Últimos oito resultados do Brasileirão: de 16/08 a 11/10/2026.
- Próximos jogos do Brasileirão: agenda consultada em 13/10/2026. Horários de Brasília.
- Artilharia do Corinthians na temporada em todas as competições: recorte publicado em 24/09/2026. O artigo de referência registra 57 gols em 54 partidas do time e os três goleadores exibidos no painel.
- Elenco: nomes e posições consultados em 13/10/2026. Números de gols seguem o recorte de artilharia de 24/09/2026. Trajetórias mostram os clubes profissionais em ordem cronológica, identificam empréstimos quando informados e separam a formação de base. A lista pode não registrar passagens por equipes amadoras ou períodos sem vínculo profissional.

As competições encerradas são retratos documentados com fontes e datas próprias. A agenda do Brasileirão é um snapshot; o feed de notícias tem atualização automática. Confira as fontes antes de atualizar dados em `data.js` ou `competitions.js`.

## Fontes consultadas

- Classificação e estatísticas do Brasileirão: [Classificação Geral — Brasileirão Série A 2026](https://classificacaogeral.com.br/analises-e-estatisticas/brasileirao/2026). Consulta em 13/10/2026.
- Agenda e resultados: [Agenda EC — Corinthians](https://agendaec.com.br/time/corinthians/). Consulta em 13/10/2026.
- Copa do Brasil 2026: histórico de partidas do Corinthians na [CBF](https://www.cbf.com.br/futebol-brasileiro/times/copa-do-brasil/profissional/2026/20001?tab=historico-de-partidas).
- Temporada 2025: [O Gol — histórico da temporada do Corinthians](https://www.ogol.com.br/equipe/corinthians?epoca_id=154), [O Gol — Brasileirão 2025](https://www.ogol.com.br/edicao/brasileirao-serie-a-2025/194851), [CBF — título da Copa do Brasil](https://www.cbf.com.br/futebol-brasileiro/noticias/undefined/boa-x-ponte-preta/corinthians-vence-vasco-e-conquista-seu-quarto-titulo-da-copa-do-brasil) e [FPF — título do Paulistão](https://www.futebolpaulista.com.br/Noticias/Detalhe.aspx?Noticia=29006).
- Libertadores 2026: resultados consolidados pela [CONMEBOL](https://gol.conmebol.com/libertadores/pt-br/news/corinthians-na-conmebol-libertadores-2026-resultados-elenco-e-calendario); eliminação nas quartas confirmada na ficha do [confronto com o Estudiantes](https://libertadores.com.br/jogos/estudiantes-x-corinthians/).
- Paulistão 2026: jogos do Corinthians no [O Gol](https://www.ogol.com.br/equipe/corinthians/todos-os-jogos?ano=2026&grp=1); eliminação na semifinal confirmada pela [Federação Paulista](https://www.futebolpaulista.com.br/Noticias/Detalhe.aspx?Noticia=32063).
- Fichas, escalações e cronologias das partidas: [CBF — partidas da Série A 2026](https://www.cbf.com.br/futebol-brasileiro/jogos/campeonato-brasileiro/serie-a/2026), [ge — Brasileirão](https://ge.globo.com/futebol/brasileirao-serie-a/) e [UOL Esporte — Corinthians](https://www.uol.com.br/esporte/futebol/corinthians/). A interface liga cada resultado à ficha consultada para conferir os detalhes.
- Artilharia geral do elenco: [ge — números do ataque do Corinthians](https://ge.globo.com/futebol/times/corinthians/noticia/2026/09/24/zagueiro-vice-artilheiro-e-memphis-em-baixa-marcas-expoem-problema-ofensivo-do-corinthians.ghtml). Publicado em 24/09/2026.
- Cadastro de atletas para validar a futura página de elenco: [CBF — Corinthians, Série A 2026](https://www.cbf.com.br/futebol-brasileiro/times/campeonato-brasileiro/serie-a/2026/20001).
- Lista de atletas e posições para a página Elenco: [Sofascore — Corinthians](https://www.sofascore.com/pt/football/team/corinthians/1957). A lista deve ser reconferida com o clube antes de uma publicação definitiva.
- Datas de nascimento, naturalidades e elenco na página Elenco: [FootballSquads — Corinthians 2026](https://www.footballsquads.co.uk/brazil/2026/seriea/corinth.htm) e [CBF — Corinthians, Série A 2026](https://www.cbf.com.br/futebol-brasileiro/times/campeonato-brasileiro/serie-a/2026/20001). As idades são calculadas no retrato de 13/10/2026.
- Históricos de clubes foram confrontados com páginas de carreira e perfis individuais: [WorldFootball — Memphis Depay](https://www.worldfootball.net/person/pe253540/), [WorldFootball — Jesse Lingard](https://www.worldfootball.net/person/pe269112/jesse-lingard/), [WorldFootball — Hugo Souza](https://www.worldfootball.net/player_summary/hugo-souza_2/), [CBF — Raniele](https://portal.premiumleague.com.br/pt/Jogador/Raniele/2egav2gjkm644itzc97aabxl), [Liverpool — Allan](https://www.liverpoolfc.com/news/first-team/273923-allan-joins-apollon-limassol-on-loan), [Pedro Raul](https://en.wikipedia.org/wiki/Pedro_Raul), [Matheus Pereira](https://en.wikipedia.org/wiki/Matheus_Pereira_%28footballer,_born_1998%29), [André Ramalho](https://www.worldfootball.net/person/pe239263/), [Pedro Milans](https://en.wikipedia.org/wiki/Pedro_Milans), [Matheuzinho](https://en.wikipedia.org/wiki/Matheuzinho_%28footballer,_born_2000%29), [Matheus Bidu](https://en.wikipedia.org/wiki/Matheus_Bidu), [Gustavo Henrique](https://en.wikipedia.org/wiki/Gustavo_Henrique_%28footballer,_born_1993%29), [Fabrizio Angileri](https://en.wikipedia.org/wiki/Fabrizio_Angileri), [Alex Santana](https://en.wikipedia.org/wiki/Alex_Santana), [Charles](https://en.wikipedia.org/wiki/Charles_%28footballer,_born_1996%29), [Hugo](https://en.wikipedia.org/wiki/Hugo_%28footballer,_born_1997%29), [Léo Mana — ge](https://ge.globo.com/futebol/times/corinthians/noticia/2026/07/31/leo-mana-volta-ao-corinthians-apos-emprestimo-e-treinara-separado-do-elenco.ghtml) e [João Pedro Tchoca](https://en.wikipedia.org/wiki/Jo%C3%A3o_Pedro_%28footballer,_born_December_2003%29). Os registros de formação juvenil aparecem separados da carreira profissional.
- Logo do painel: imagem fornecida para o projeto, salva em `images/corinthians-logo-original.png`; a versão tratada com fundo transparente usada na interface é `images/corinthians-logo.png`.
- Referência visual e créditos de fotografias: [Agência Corinthians](https://agencia.corinthians.com.br/). A agência informa que a reprodução de suas fotografias depende de autorização; por isso, fotos oficiais de jogadores não foram incorporadas ao repositório.

## Como visualizar

Abra `index.html` em um navegador. O escudo e as fontes tipográficas dependem de conexão com a internet.

## Organização do código

- `.prettierrc.json`: padrão de formatação compartilhado para manter recuos e quebras de linha consistentes.
- `index.html`: dashboard inicial e janela modal.
- `pagina.html`: estrutura compartilhada das páginas internas; o parâmetro `secao` escolhe a visão.
- `styles.css`: tema, layout responsivo, estados de interação e estilos da janela de detalhes.
- `data.js`: snapshot dos dados e datas de referência.
- `competitions.js`: seleção global e recortes de campanha por campeonato.
- `renderers.js`: montagem dos cartões de resultados, artilharia e agenda.
- `details.js`: conteúdo detalhado de cada seção e item.
- `script.js`: eventos da janela de detalhes no dashboard.
- `section-page.js`: montagem das visões internas, incluindo escalação em campo tático.
- `section-pages.css`: estilos das visões detalhadas.
- `news.js`: carregamento periódico do snapshot de notícias no navegador.
- `theme.js`: alternância e persistência da preferência de tema claro ou escuro.
- `atualizar-noticias.py` e `.github/workflows/atualizar-noticias.yml`: coleta do RSS e atualização agendada de `noticias.json`.

### Ativar atualização automática de notícias

O workflow está configurado para buscar o feed do [UOL Esporte — Corinthians](https://rss.esporte.uol.com.br/futebol/clubes/corinthians.xml) a cada 30 minutos e publicar as alterações em `noticias.json`. Para ativá-lo, publique o conteúdo desta pasta na branch padrão do repositório e permita que GitHub Actions grave conteúdo no repositório. A primeira execução pode ser iniciada em **Actions → Atualizar notícias do Corinthians → Run workflow**. O GitHub pode atrasar execuções agendadas em períodos de alta carga; ao abrir a página, o navegador busca o snapshot mais recente e tenta novamente a cada 10 minutos.

## Melhorias futuras

1. Adicionar fotografias de atletas com autorização e créditos adequados.
2. Ampliar os perfis com números e estatísticas individuais depois de validar cada dado em fontes confiáveis.
3. Integrar uma API de futebol para atualizar automaticamente resultados e classificação, com estados claros de carregamento e falha.
4. Preparar a apresentação do projeto e uma demonstração para o LinkedIn.

## Licença

A licença do código ainda precisa ser definida. Confira separadamente os direitos dos dados, do escudo e das fontes antes de publicar.
