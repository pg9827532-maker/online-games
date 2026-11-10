const games = [
  {
    id: 'sky-rush',
    name: 'Sky Rush',
    tags: ['action', 'arcade', 'racing'],
    rating: 4.9,
    players: '120K',
    desc: 'Neon flight challenge with instant action.',
    description: 'Dodge incoming barriers, collect power-ups, and survive a relentless neon sky run.',
    difficulty: 'Medium'
  },
  {
    id: 'pixel-puzzle',
    name: 'Pixel Puzzle',
    tags: ['puzzle', 'logic', 'brain'],
    rating: 4.8,
    players: '82K',
    desc: 'Match colorful tiles to solve each board.',
    description: 'Line up glowing tiles and trigger combos to clear each puzzle board with logic and speed.',
    difficulty: 'Easy'
  },
  {
    id: 'speed-circuit',
    name: 'Speed Circuit',
    tags: ['racing', 'sports', 'speed'],
    rating: 4.7,
    players: '91K',
    desc: 'Fast laps and split-second decisions.',
    description: 'Burn through checkpoints and beat your best time in a slick racing sprint.',
    difficulty: 'Hard'
  },
  {
    id: 'goal-zone',
    name: 'Goal Zone',
    tags: ['sports', 'skill', 'action'],
    rating: 4.6,
    players: '74K',
    desc: 'Precision shots and quick reactions.',
    description: 'Challenge your aim with timed shots and increasingly tricky goals.',
    difficulty: 'Medium'
  },
  {
    id: 'arena-duel',
    name: 'Arena Duel',
    tags: ['multiplayer', 'battle', 'action'],
    rating: 4.9,
    players: '138K',
    desc: 'Battle in a fast arena showdown.',
    description: 'Read your opponent, strike at the right moment, and win the arena duel.',
    difficulty: 'Hard'
  },
  {
    id: 'memory-match',
    name: 'Memory Match',
    tags: ['puzzle', 'memory', 'brain'],
    rating: 4.8,
    players: '68K',
    desc: 'Flip and match cards before the timer ends.',
    description: 'Reveal hidden cards and match pairs to complete the full memory board.',
    difficulty: 'Easy'
  },
  {
    id: 'tic-tac-battle',
    name: 'Tic Tac Battle',
    tags: ['multiplayer', 'strategy', 'classic'],
    rating: 4.7,
    players: '58K',
    desc: 'Classic board game with a challenge twist.',
    description: 'Take on the computer and line up three in a row before your rival does.',
    difficulty: 'Medium'
  },
  {
    id: 'rock-paper',
    name: 'Rock Paper Fire',
    tags: ['action', 'quick', 'arcade'],
    rating: 4.5,
    players: '64K',
    desc: 'Quick duel with a fiery twist.',
    description: 'Pick your move and beat the computer in a fast arcade showdown.',
    difficulty: 'Easy'
  },
  {
    id: 'number-guess',
    name: 'Number Guess',
    tags: ['puzzle', 'logic', 'guessing'],
    rating: 4.6,
    players: '51K',
    desc: 'Read the hints and guess the hidden number.',
    description: 'Use the clues to narrow down the answer and keep a clean streak alive.',
    difficulty: 'Medium'
  },
  {
    id: 'reaction-rush',
    name: 'Reaction Rush',
    tags: ['action', 'speed', 'challenge'],
    rating: 4.9,
    players: '115K',
    desc: 'Test your timing under pressure.',
    description: 'Wait for the signal, then click as fast as you can and chase a better score.',
    difficulty: 'Hard'
  },
  {
    id: 'block-fall',
    name: 'Block Fall',
    tags: ['puzzle', 'arcade', 'skill'],
    rating: 4.7,
    players: '70K',
    desc: 'Stack, match, and survive the falling blocks.',
    description: 'Build your combo and stay alive as the pace picks up and the pressure builds.',
    difficulty: 'Medium'
  },
  {
    id: 'race-run',
    name: 'Race Run',
    tags: ['racing', 'arcade', 'speed'],
    rating: 4.8,
    players: '96K',
    desc: 'Slip through traffic and chase a record run.',
    description: 'Beat the traffic, time your boosts, and set a new top score on every run.',
    difficulty: 'Hard'
  }
];

const tagMeta = {
  all: 'All games',
  action: 'Action',
  arcade: 'Arcade',
  puzzle: 'Puzzle',
  racing: 'Racing',
  sports: 'Sports',
  multiplayer: 'Multiplayer',
  logic: 'Logic',
  brain: 'Brain',
  speed: 'Speed',
  strategy: 'Strategy',
  challenge: 'Challenge',
  classic: 'Classic'
};

const tagFilters = document.getElementById('tagFilters');
const topTags = document.getElementById('topTags');
const gamesGrid = document.getElementById('gamesGrid');
const resultCount = document.getElementById('resultCount');
const modal = document.getElementById('gameModal');
const modalContent = document.getElementById('modalContent');

const state = {
  activeTag: 'all',
  sort: 'popular'
};

function getTagButtons() {
  return Object.entries(tagMeta).map(([key, label]) => ({ key, label }));
}

function renderTagFilters() {
  tagFilters.innerHTML = getTagButtons()
    .map(
      ({ key, label }) => `
        <button class="tag-btn ${state.activeTag === key ? 'active' : ''}" data-tag="${key}">${label}</button>
      `
    )
    .join('');

  tagFilters.querySelectorAll('.tag-btn').forEach(button => {
    button.addEventListener('click', () => {
      state.activeTag = button.dataset.tag;
      renderTagFilters();
      renderGames();
    });
  });
}

function renderTopTags() {
  const popular = ['action', 'puzzle', 'racing', 'sports', 'multiplayer', 'arcade'];
  topTags.innerHTML = popular
    .map(
      tag => `
        <button class="tag-btn ${state.activeTag === tag ? 'active' : ''}" data-tag="${tag}">${tagMeta[tag]}</button>
      `
    )
    .join('');

  topTags.querySelectorAll('.tag-btn').forEach(button => {
    button.addEventListener('click', () => {
      state.activeTag = button.dataset.tag;
      renderTagFilters();
      renderTopTags();
      renderGames();
    });
  });
}

function getVisibleGames() {
  let filtered = games.filter(game => {
    if (state.activeTag === 'all') return true;
    return game.tags.includes(state.activeTag);
  });

  if (state.sort === 'newest') {
    filtered = [...filtered].reverse();
  }

  return filtered;
}

function renderGames() {
  const filtered = getVisibleGames();
  resultCount.textContent = `${filtered.length} games`;

  gamesGrid.innerHTML = filtered
    .map((game, index) => {
      const accent = [
        'linear-gradient(135deg, rgba(124,92,255,0.42), rgba(70,215,255,0.28))',
        'linear-gradient(135deg, rgba(255,149,64,0.34), rgba(70,215,255,0.22))',
        'linear-gradient(135deg, rgba(66,211,146,0.28), rgba(124,92,255,0.24))',
        'linear-gradient(135deg, rgba(247,87,123,0.28), rgba(124,92,255,0.24))'
      ][index % 4];

      return `
        <article class="game-card">
          <div class="game-card-art" style="background:${accent}">
            <span class="game-card-label">${game.tags[0]}</span>
            <span class="game-card-rating">★ ${game.rating}</span>
            <span class="game-card-name">${game.name.split(' ')[0]}</span>
          </div>
          <div class="game-card-body">
            <h3 class="game-card-title">${game.name}</h3>
            <p class="game-card-copy">${game.desc}</p>
            <div class="game-card-tags">
              ${game.tags.slice(0, 3).map(tag => `<span class="game-card-tag">${tagMeta[tag] || tag}</span>`).join('')}
            </div>
            <div class="meta-row">
              <small>${game.players} players</small>
              <button class="play-btn" data-game-id="${game.id}">Play</button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  gamesGrid.querySelectorAll('.play-btn').forEach(button => {
    button.addEventListener('click', () => openGameModal(button.dataset.gameId));
  });
}

function renderGameModule(game) {
  switch (game.id) {
    case 'memory-match':
      return `
        <div class="score-row">
          <span>Moves: <strong id="memoryMoves">0</strong></span>
          <span>Matches: <strong id="memoryMatches">0 / 8</strong></span>
        </div>
        <div id="memoryBoard" class="memory-board"></div>
        <div class="control-row">
          <button class="game-action-btn" id="shuffleMemory">Shuffle board</button>
        </div>
      `;
    case 'tic-tac-battle':
      return `
        <div class="score-row">
          <span>Turn: <strong id="tttStatus">Player X</strong></span>
        </div>
        <div id="tttBoard" class="ttt-board"></div>
        <div class="control-row">
          <button class="game-action-btn" id="resetTtt">Restart</button>
        </div>
      `;
    case 'rock-paper':
      return `
        <div class="rps-options">
          <button class="choice-btn" data-choice="rock">✊ Rock</button>
          <button class="choice-btn" data-choice="paper">✋ Paper</button>
          <button class="choice-btn" data-choice="scissors">✌️ Scissors</button>
        </div>
        <div class="status-text" id="rpsResult">Choose your move.</div>
      `;
    case 'number-guess':
      return `
        <div class="guess-panel">
          <label for="guessInput">Enter a number between 1 and 100</label>
          <input id="guessInput" type="number" min="1" max="100" placeholder="Your guess" />
          <div class="control-row">
            <button class="guess-btn" id="submitGuess">Submit guess</button>
            <button class="game-action-btn" id="resetGuess">New round</button>
          </div>
          <div class="status-text" id="guessResult">Start guessing!</div>
        </div>
      `;
    case 'reaction-rush':
      return `
        <div id="reactionBox" class="reaction-box">Press start</div>
        <div class="control-row">
          <button class="reaction-btn" id="startReaction">Start test</button>
        </div>
        <div class="status-text" id="reactionResult">Your result will appear here.</div>
      `;
    default:
      return `
        <div class="game-description">This game is ready to launch. Add more features or style it later.</div>
      `;
  }
}

function openGameModal(gameId) {
  const game = games.find(item => item.id === gameId);
  if (!game) return;

  const meta = [
    `<span>${game.tags[0]}</span>`,
    `<span>★ ${game.rating}</span>`,
    `<span>${game.difficulty}</span>`
  ].join('');

  modalContent.innerHTML = `
    <div class="modal-head">
      <h2 id="modalTitle">${game.name}</h2>
      <button class="primary-btn" data-close="true">Close</button>
    </div>
    <div class="modal-meta">${meta}</div>
    <div class="game-content">
      <div class="game-description">${game.description}</div>
      <div class="game-panel">${renderGameModule(game)}</div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');

  document.querySelectorAll('[data-close="true"]').forEach(button => {
    button.addEventListener('click', closeGameModal);
  });

  if (game.id === 'memory-match') setupMemoryGame();
  if (game.id === 'tic-tac-battle') setupTicTacToe();
  if (game.id === 'rock-paper') setupRpsGame();
  if (game.id === 'number-guess') setupGuessGame();
  if (game.id === 'reaction-rush') setupReactionGame();
}

function closeGameModal() {
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
}

modal.addEventListener('click', event => {
  if (event.target.dataset.close === 'true') {
    closeGameModal();
  }
});

function setupMemoryGame() {
  const symbols = ['🎯', '🚀', '⭐', '🎮', '🔥', '💎', '⚡', '🎲'];
  const board = document.getElementById('memoryBoard');
  const movesNode = document.getElementById('memoryMoves');
  const matchesNode = document.getElementById('memoryMatches');
  const shuffleBtn = document.getElementById('shuffleMemory');

  let cards = [];
  let flipped = [];
  let locked = false;
  let moves = 0;
  let matches = 0;

  function buildBoard() {
    const deck = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    cards = deck.map((symbol, index) => ({ id: index, symbol, matched: false }));
    board.innerHTML = '';

    cards.forEach(card => {
      const button = document.createElement('button');
      button.className = 'memory-card';
      button.dataset.id = String(card.id);
      button.textContent = '?';
      button.addEventListener('click', () => revealCard(card.id, button));
      board.appendChild(button);
    });

    flipped = [];
    moves = 0;
    matches = 0;
    movesNode.textContent = '0';
    matchesNode.textContent = '0 / 8';
  }

  function revealCard(id, button) {
    const card = cards.find(item => item.id === id);
    if (!card || card.matched || flipped.includes(id) || locked) return;

    button.textContent = card.symbol;
    button.classList.add('revealed');
    flipped.push(id);

    if (flipped.length === 2) {
      moves += 1;
      movesNode.textContent = String(moves);
      locked = true;

      const [firstId, secondId] = flipped;
      const firstCard = cards.find(item => item.id === firstId);
      const secondCard = cards.find(item => item.id === secondId);

      if (firstCard.symbol === secondCard.symbol) {
        firstCard.matched = true;
        secondCard.matched = true;
        matches += 1;
        matchesNode.textContent = `${matches} / 8`;
        const buttons = board.querySelectorAll('.memory-card');
        buttons.forEach(element => {
          const matchCard = cards.find(item => item.id === Number(element.dataset.id));
          if (matchCard && matchCard.matched) {
            element.classList.add('matched');
          }
        });
        flipped = [];
        locked = false;
        if (matches === 8) setTimeout(() => alert('You won! Great memory run.'), 100);
      } else {
        setTimeout(() => {
          board.querySelectorAll('.memory-card').forEach(element => {
            const elementId = Number(element.dataset.id);
            if (flipped.includes(elementId)) {
              element.textContent = '?';
              element.classList.remove('revealed');
            }
          });
          flipped = [];
          locked = false;
        }, 600);
      }
    }
  }

  shuffleBtn.addEventListener('click', buildBoard);
  buildBoard();
}

function setupTicTacToe() {
  const board = document.getElementById('tttBoard');
  const status = document.getElementById('tttStatus');
  const resetBtn = document.getElementById('resetTtt');
  const winningLines = [
    [0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]
  ];

  let grid = Array(9).fill('');
  let current = 'X';

  function renderBoard() {
    board.innerHTML = '';
    grid.forEach((value, index) => {
      const btn = document.createElement('button');
      btn.className = 'ttt-cell';
      btn.textContent = value;
      btn.addEventListener('click', () => handleCell(index));
      board.appendChild(btn);
    });
  }

  function handleCell(index) {
    if (grid[index] || checkWinner(grid)) return;
    grid[index] = current;
    const winner = checkWinner(grid);
    if (winner) {
      status.textContent = `Winner: ${winner}`;
      renderBoard();
      return;
    }

    current = current === 'X' ? 'O' : 'X';
    status.textContent = `Player ${current}`;
    renderBoard();
  }

  function checkWinner(boardState) {
    for (const [a, b, c] of winningLines) {
      if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
        return boardState[a];
      }
    }
    return null;
  }

  resetBtn.addEventListener('click', () => {
    grid = Array(9).fill('');
    current = 'X';
    status.textContent = 'Player X';
    renderBoard();
  });

  renderBoard();
}

function setupRpsGame() {
  const result = document.getElementById('rpsResult');
  document.querySelectorAll('.choice-btn').forEach(button => {
    button.addEventListener('click', () => {
      const player = button.dataset.choice;
      const options = ['rock', 'paper', 'scissors'];
      const bot = options[Math.floor(Math.random() * options.length)];
      const outcomes = {
        rock: { rock: 'Draw!', paper: 'You lose!', scissors: 'You win!' },
        paper: { rock: 'You win!', paper: 'Draw!', scissors: 'You lose!' },
        scissors: { rock: 'You lose!', paper: 'You win!', scissors: 'Draw!' }
      };
      result.textContent = `You picked ${player}. Computer picked ${bot}. ${outcomes[player][bot]}`;
    });
  });
}

function setupGuessGame() {
  const guessInput = document.getElementById('guessInput');
  const guessResult = document.getElementById('guessResult');
  const submitGuess = document.getElementById('submitGuess');
  const resetGuess = document.getElementById('resetGuess');
  let target = Math.floor(Math.random() * 100) + 1;

  function updateResult(message) {
    guessResult.textContent = message;
  }

  submitGuess.addEventListener('click', () => {
    const guess = Number(guessInput.value);
    if (Number.isNaN(guess) || guess < 1 || guess > 100) {
      updateResult('Please enter a number from 1 to 100.');
      return;
    }

    if (guess < target) {
      updateResult('Too low! Try a higher number.');
    } else if (guess > target) {
      updateResult('Too high! Try a lower number.');
    } else {
      updateResult(`Correct! ${target} was the hidden number.`);
      target = Math.floor(Math.random() * 100) + 1;
    }
  });

  resetGuess.addEventListener('click', () => {
    target = Math.floor(Math.random() * 100) + 1;
    guessInput.value = '';
    updateResult('New round started. Good luck!');
  });
}

function setupReactionGame() {
  const reactionBox = document.getElementById('reactionBox');
  const reactionResult = document.getElementById('reactionResult');
  const startBtn = document.getElementById('startReaction');

  let timerHandle = null;
  let started = false;
  let beginTime = 0;

  function resetState() {
    reactionBox.textContent = 'Wait...';
    started = false;
    clearTimeout(timerHandle);
  }

  startBtn.addEventListener('click', () => {
    resetState();
    const delay = 1500 + Math.random() * 2200;
    timerHandle = setTimeout(() => {
      reactionBox.textContent = 'CLICK!';
      beginTime = performance.now();
      started = true;
    }, delay);
    reactionResult.textContent = 'When the screen turns blue, click as fast as possible.';
  });

  reactionBox.addEventListener('click', () => {
    if (!started) {
      if (reactionBox.textContent === 'Wait...') {
        reactionResult.textContent = 'Too early! Wait for the prompt.';
        resetState();
      }
      return;
    }

    const reactionTime = Math.round((performance.now() - beginTime) * 10) / 10;
    reactionResult.textContent = `Your reaction time: ${reactionTime} ms`;
    reactionBox.textContent = 'Press start';
    started = false;
  });
}

document.querySelectorAll('.sort-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.sort-btn').forEach(btn => btn.classList.toggle('active', btn === button));
    state.sort = button.textContent.toLowerCase();
    renderGames();
  });
});

renderTagFilters();
renderTopTags();
renderGames();
