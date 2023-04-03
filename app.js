const warningOne = document.querySelector("#warningOne");
const warningTwo = document.querySelector("#warningTwo");
const yes = document.querySelector("#yes");
const no = document.querySelector("#no");
const warningWinner = document.querySelector("#warningWinner");
const winner = document.querySelector("#winner");

const counter = document.querySelector("#counter");
const maxScore = document.querySelector("#maxscore");

const reset = document.querySelector("#resetBtn");

let counterTwo = 0;
let countMax;

const playerOne = {
    playerNum: 1,
    count: 0,
    score: document.querySelector("#scoreOne"),
    button: document.querySelector("#playerOne")
}

const playerTwo = {
    playerNum: 2,
    count: 0,
    score: document.querySelector("#scoreTwo"),
    button: document.querySelector("#playerTwo")
}

const clickFunc = function (player, opponent) {
    maxScore.setAttribute('disabled', '');
    player.count++;
    if (player.count < countMax && opponent.count < countMax) {
        player.score.remove();
        player.score = document.createElement('span');
        player.score.innerText = player.count;
        if (player.playerNum === 1) {
            counter.insertAdjacentElement('afterbegin', player.score);
        } else {
            counter.insertAdjacentElement('beforeend', player.score);
        }
    } else {
        player.score.innerText = player.count;
        disablePlayerButtons();
        player.score.classList.add("winner");
        opponent.score.classList.add("loser");
        winner.innerText = player.playerNum;
        warningWinner.classList.remove('hideMe');
    }
}

for (let i = 1; i <= 10; i++) {
    const newOption = document.createElement('option');
    newOption.value = i;
    newOption.innerText = i;
    maxScore.append(newOption);
}

maxScore.addEventListener("change", function () {
    if (this.value === 'default') {
        warningOne.classList.remove('hideMe');
        disableAllButtons();
    } else {
        warningOne.classList.add('hideMe');
        enableAllButtons();
        countMax = parseInt(this.value);
    }

})

playerOne.button.addEventListener("click", function () {
    clickFunc(playerOne, playerTwo);
})

playerTwo.button.addEventListener("click", function () {
    clickFunc(playerTwo, playerOne);
})

resetBtn.addEventListener("click", function () {
    if (playerOne.count === countMax || playerTwo.count === countMax) {
        resetFunc();
    } else {
        warningOne.setAttribute('hidden', '');
        warningWinner.setAttribute('hidden', '');
        warningTwo.classList.remove('hideMe');

        disableAllButtons();
        maxScore.setAttribute('disabled', '');

        yes.addEventListener("click", resetFunc);

        no.addEventListener("click", function () {
            warningOne.removeAttribute('hidden', '');
            warningWinner.removeAttribute('hidden', '');
            warningTwo.classList.add('hideMe');
            enableAllButtons();
            maxScore.removeAttribute('disabled', '');
        })
    }
})

const resetFunc = () => {
    warningWinner.classList.add('hideMe');
    warningWinner.removeAttribute('hidden', '');
    warningOne.classList.remove('hideMe');
    warningOne.removeAttribute('hidden', '');
    warningTwo.classList.add('hideMe');

    maxScore.value = 'default';
    maxScore.removeAttribute('disabled', '');

    for (player of [playerOne, playerTwo]) {
        player.score.innerText = 0;
        player.score.classList.remove("winner", "loser");
        player.count = 0;
    }

    disableAllButtons();
}

const disablePlayerButtons = function () {
    playerOne.button.setAttribute('disabled', '');
    playerTwo.button.setAttribute('disabled', '');
}

const disableAllButtons = function () {
    disablePlayerButtons();
    resetBtn.setAttribute('disabled', '');
}

const enablePlayerButtons = function () {
    playerOne.button.removeAttribute('disabled', '');
    playerTwo.button.removeAttribute('disabled', '');
}

const enableAllButtons = function () {
    enablePlayerButtons();
    resetBtn.removeAttribute('disabled', '');
}

const makeRandColorMuted = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    const newColor = `rgba(${r}, ${g}, ${b}, 0.05)`;

    return newColor;
}

setInterval(() => {
    document.body.style.backgroundColor = makeRandColorMuted();
    resolve();
}, 1500)