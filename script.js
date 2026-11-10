const games = [
  {
    id: 'sky-rush',
    name: 'Sky Rush',
    category: 'action',
    rating: '4.9',
    tags: ['Arcade', 'Fast'],
    difficulty: 'Medium',
    short: 'Fly through neon tunnels and survive the rush.',
    description: 'A colorful arcade challenge where every second counts. Dodge incoming barriers, collect boosts, and push your score higher than ever before.'
  },
  {
    id: 'pixel-puzzle',
    name: 'Pixel Puzzle',
    category: 'puzzle',
    rating: '4.8',
    tags: ['Logic', 'Brain'],
    difficulty: 'Easy',
    short: 'Match patterns and clear the board.',
    description: 'Connect glowing tiles to clear each puzzle board. More combos mean more points and a bigger challenge.'
  },
  {
    id: 'speed-circuit',
    name: 'Speed Circuit',
    category: 'racing',
    rating: '4.7',
    tags: ['Racing', 'Timer'],
    difficulty: 'Hard',
    short: 'Tight laps, sharp turns, and big speed.',
    description: 'Jump into a quick racing challenge and beat your own time. Every lap rewards precision and timing.'
  },
  {
    id: 'goal-zone',
    name: 'Goal Zone',
    category: 'sports',
    rating: '4.6',
    tags: ['Sports', 'Skill'],
    difficulty: 'Medium',
    short: 'Score from every angle in a slick sports duel.',
    description: 'Test your aim and reflexes as you take on different challenge shots. Every goal counts toward your score streak.'
  },
  {
    id: 'arena-duel',
    name: 'Arena Duel',
    category: 'multiplayer',
    rating: '4.9',
    tags: ['PvP', 'Battle'],
    difficulty: 'Hard',
    short: 'Take the arena by storm with smart moves.',
    description: 'Quick-fire battle mode built for showdowns. Read your opponent, time your attack, and win the round.'
  },
  {
    id: 'memory-match',
    name: 'Memory Match',
    category: 'puzzle',
    rating: '4.8',
    tags: ['Memory', 'Pairs'],
    difficulty: 'Easy',
    short: 'Flip cards and match every pair.',
    description: 'Reveal hidden cards and match identical icons before the timer runs out. Focus and patience unlock the perfect run.'
  },
  {
    id: 'tic-tac-battle',
    name: 'Tic Tac Battle',
    category: 'multiplayer',
    rating: '4.7',
    tags: ['Classic', 'Strategy'],
    difficulty: 'Medium',
    short: 'Outsmart your rival and claim three in a row.',
    description: 'The classic board game with a fresh arcade twist. Play against the computer and chase a winning line.'
  },
  {
    id: 'rock-paper',
    name: 'Rock Paper Fire',
    category: 'action',
    rating: '4.5',
    tags: ['Quick', 'Luck'],
    difficulty: 'Easy',
    short: 'Challenge the system in a rapid duel.',
    description: 'A speed-focused twist on a classic game. Challenge the computer, read the pattern, and win the series.'
  },
  {
    id: 'number-guess',
    name: 'Number Guess',
    category: 'puzzle',
    rating: '4.6',
    tags: ['Guessing', 'Logic'],
    difficulty: 'Medium',
    short: 'Track clues and find the hidden number.',
    description: 'A logic challenge where high and low clues help you narrow the answer. Keep your guesses tight and your streak alive.'
  },
  {
    id: 'reaction-rush',
    name: 'Reaction Rush',
    category: 'action',
    rating: '4.9',
    tags: ['Reflex', 'Speed'],
    difficulty: 'Hard',
    short: 'Test your timing under pressure.',
    description: 'Press the button as fast as you can once the challenge begins. The faster your reaction, the better your score.'
  }
];

const featuredGames = document.getElementById('featuredGames');
const allGames = document.getElementById('allGames');
const searchInput = document.getElementById('searchInput');
const playFeaturedBtn = document.getElementById('playFeaturedBtn');
const browseAllBtn = document.getElementById('browseAllBtn');
const modal = document.getElementById('gameModal');
const modalContent = document.getElementById('modalContent');
const categoryButtons = [...document.querySelectorAll('.category-item')];

let selectedCategory = 'all';

function getGameBackground(index) {
  const colors = [
    'linear-gradient(135deg, rgba(124,92,255,0.44), rgba(70,215,255,0.32))',
    'linear-gradient(135deg, rgba(66,211,146,0.28), rgba(124,92,255,0.22))',
    'linear-gradient(135deg, rgba(255,130,104,0.38), rgba(255,204,92,0.22))',
    'linear-gradient(135deg, rgba(70,215,255,0.26), rgba(124,92,255,0.28))',
    'linear-gradient(135deg, rgba(247,87,123,0.28), rgba(255,202,97,0.18))'
  ];
  return colors[index % colors.length];
}

function renderGameTile(game, index, compact = false) {
  const tile = document.createElement('article');
  tile.className = 'game-tile';
  tile.innerHTML = `
    <div class="game-thumb" style="background:${getGameBackground(index)}">
      <span class="game-badge">${game.category}</span>
      <span class="game-rating">★ ${game.rating}</span>
      <span class="game-thumb-label">${game.name.split(' ')[0]}</span>
    </div>
    <div class="game-meta">
      <h3>${game.name}</h3>
      <p>${game.short}</p>
      <div class="game-tag-row">
        <div class="game-tags">
          ${game.tags.slice(0, 2).map(tag => `<span class="game-tag">${tag}</span>`).join('')}
        </div>
      </div>
      <div class="game-bottom-row">
        <span class="game-difficulty">${game.difficulty}</span>
        <button class="game-play-btn" data-game-id="${game.id}">Play Now</button>
      </div>
    </div>
  `;

  if (compact) {
    tile.querySelector('.game-play-btn').style.padding = '8px 10px';
  }

  return tile;
}

function renderGames() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = games.filter(game => {
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
    const searchableText = `${game.name} ${game.category} ${game.tags.join(' ')}`.toLowerCase();
    const matchesQuery = searchableText.includes(query);
    return matchesCategory && matchesQuery;
  });

  featuredGames.innerHTML = '';
  allGames.innerHTML = '';

  const featuredList = filtered.slice(0, 4);
  featuredList.forEach((game, index) => featuredGames.appendChild(renderGameTile(game, index, true)));
  filtered.forEach((game, index) => allGames.appendChild(renderGameTile(game, index)));

  if (!filtered.length) {
    const emptyBox = document.createElement('div');
    emptyBox.className = 'game-tile';
    emptyBox.innerHTML = `
      <div class="game-meta">
        <h3>No games found</h3>
        <p>Try another term or change the selected category.</p>
      </div>
    `;
    allGames.appendChild(emptyBox);
  }

  bindGameButtons();
}

function bindGameButtons() {
  document.querySelectorAll('.game-play-btn').forEach(button => {
    button.onclick = () => openGameModal(button.dataset.gameId);
  });
}

function openGameModal(gameId) {
  const game = games.find(item => item.id === gameId);
  if (!game) return;

  const meta = [
    `<span>${game.category}</span>`,
    `<span>★ ${game.rating}</span>`,
    `<span>${game.difficulty}</span>`
  ].join('');

  const html = `
    <div class="modal-head">
      <h2 id="modalTitle">${game.name}</h2>
      <button class="primary-btn" data-close="true">Close</button>
    </div>
    <div class="modal-meta">${meta}</div>
    <div class="game-content">
      <div class="game-description">${game.description}</div>
      <div class="game-panel">
        ${renderGameModule(game)}
      </div>
    </div>
  `;

  modalContent.innerHTML = html;
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
    cards = deck.map((symbol, index) => ({ id: index, symbol, matched: false, visible: false }));
    board.innerHTML = '';
    cards.forEach(card => {
      const button = document.createElement('button');
      button.className = 'memory-card';
      button.dataset.id = card.id;
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

    card.visible = true;
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
          const elementId = Number(element.dataset.id);
          const matchCard = cards.find(item => item.id === elementId);
          if (matchCard.matched) {
            element.classList.add('matched');
          }
        });
        flipped = [];
        locked = false;

        if (matches === 8) {
          matchesNode.textContent = '8 / 8';
          setTimeout(() => alert('You won! Great memory run.'), 100);
        }
      } else {
        setTimeout(() => {
          const buttons = board.querySelectorAll('.memory-card');
          buttons.forEach(element => {
            const elementId = Number(element.dataset.id);
            if (flipped.includes(elementId)) {
              const currentCard = cards.find(item => item.id === elementId);
              if (!currentCard.matched) {
                element.textContent = '?';
                element.classList.remove('revealed');
              }
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
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
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

  function resetBoard() {
    grid = Array(9).fill('');
    current = 'X';
    status.textContent = 'Player X';
    renderBoard();
  }

  resetBtn.addEventListener('click', resetBoard);
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
      const text = `You picked ${player}. Computer picked ${bot}. ${outcomes[player][bot]}`;
      result.textContent = text;
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

searchInput.addEventListener('input', renderGames);

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    categoryButtons.forEach(item => item.classList.toggle('active', item === button));
    selectedCategory = button.dataset.category;
    renderGames();
  });
});

playFeaturedBtn.addEventListener('click', () => openGameModal('reaction-rush'));
browseAllBtn.addEventListener('click', () => {
  document.getElementById('all-games').scrollIntoView({ behavior: 'smooth' });
});

renderGames();
