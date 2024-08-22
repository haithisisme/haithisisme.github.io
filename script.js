const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;
const totalPairs = cards.length / 2;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if (isMatch) {
        disableCards();
        matchedPairs++;
        showCongratulation();

        if (matchedPairs === totalPairs) {
            setTimeout(() => {
                triggerUrgentAlert();
            }, 500);
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function showCongratulation() {
    const congratsMessage = document.createElement('div');
    congratsMessage.classList.add('congrats-message');
    congratsMessage.innerText = `Congratulations! You've found a pair!`;

    document.body.appendChild(congratsMessage);

    setTimeout(() => {
        congratsMessage.remove();
    }, 2000);
}

function triggerUrgentAlert() {
    // Play an alarming sound
    const alertSound = new Audio('alert.mp3'); // Replace 'alert.mp3' with your sound file
    alertSound.play();

    // Flash the screen
    document.body.classList.add('urgent-alert');
    setTimeout(() => {
        document.body.classList.remove('urgent-alert');
    }, 2000);

    // Show alert
    setTimeout(() => {
        alert("Congrats, you got hacked!");
    }, 1500);
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
