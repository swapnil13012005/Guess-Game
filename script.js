const messageEl = document.querySelector('.message');
const numberEl = document.querySelector('.number');
const scoreEl = document.querySelector('.score');
const highscoreEl = document.querySelector('.highscore');
const guessInput = document.querySelector('.guess');
const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.again');
const body = document.querySelector('body');

let secretNumber = Math.trunc(Math.random() * 100) + 1;
let score = 10;
let highscore = Number(localStorage.getItem('highscore')) || 0;
highscoreEl.textContent = highscore;

function displayMessage(msg) {
	messageEl.textContent = msg;
}

function resetGame() {
	score = 10;
	secretNumber = Math.trunc(Math.random() * 100) + 1;
	scoreEl.textContent = score;
	numberEl.textContent = '?';
	numberEl.style.width = '';
	displayMessage('Start guessing...');
	guessInput.value = '';
	body.style.backgroundColor = '';
}

checkBtn.addEventListener('click', function () {
	const guess = Number(guessInput.value);
	if (!guess) {
		displayMessage('⛔ No number!');
		return;
	}

	if (guess === secretNumber) {
		displayMessage('🎉 Correct Number!');
		numberEl.textContent = secretNumber;
		body.style.backgroundColor = '#60b347';
		numberEl.style.width = '30rem';
		if (score > highscore) {
			highscore = score;
			highscoreEl.textContent = highscore;
			localStorage.setItem('highscore', String(highscore));
		}
		return;
	}

	if (score > 1) {
		displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
		score--;
		scoreEl.textContent = score;
	} else {
		displayMessage('💥 You lost the game!');
		score = 0;
		scoreEl.textContent = score;
		numberEl.textContent = secretNumber;
	}
});

againBtn.addEventListener('click', resetGame);

guessInput.addEventListener('keydown', function (e) {
	if (e.key === 'Enter') checkBtn.click();
});

