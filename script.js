document.addEventListener('DOMContentLoaded', () => {
    const computerChoiceDisplay = document.getElementById('computer-choice');
    const userChoiceDisplay = document.getElementById('user-choice');
    const possibleChoices = document.querySelectorAll('button');
    const resultsDisplay = document.getElementById('results');
    const totalWinsDisplay = document.getElementById('total-wins');
    const totalLossesDisplay = document.getElementById('total-losses');
    const resetButton = document.getElementById('reset'); 

    let computerChoice;
    let userChoice;
    let results;
    let totalWins = 0;
    let totalLosses = 0;
    const winningScore = 5;  // made a new variable 

    possibleChoices.forEach(possibleChoice => 
        possibleChoice.addEventListener('click', (e) => {
            if (totalWins < winningScore && totalLosses < winningScore) {
                userChoice = e.target.id;
                userChoiceDisplay.textContent = userChoice;
                generateComputerChoice();
                getResults();
                updateScores();
            }
        })
    );

    function generateComputerChoice() {
        const randomNumber = Math.floor(Math.random() * 3) + 1;

        if (randomNumber === 1) computerChoice = 'rock';
        if (randomNumber === 2) computerChoice = 'paper';
        if (randomNumber === 3) computerChoice = 'scissors';

        computerChoiceDisplay.textContent = computerChoice;
    }

    function getResults() {
        if (computerChoice === userChoice) {
            results = 'draw';
        } else if (
            (computerChoice === 'rock' && userChoice === 'paper') || 
            (computerChoice === 'paper' && userChoice === 'scissors') ||
            (computerChoice === 'scissors' && userChoice === 'rock')
        ) {
            results = 'round won!';
            totalWins++;
        } else {
            results = 'round lost!';
            totalLosses++;
        }
    
        resultsDisplay.textContent = results;
    }

    function updateScores() {
        totalWinsDisplay.textContent = totalWins;
        totalLossesDisplay.textContent = totalLosses;

        // Check if game is over
        if (totalWins === winningScore) {
            resultsDisplay.textContent = "You won the game!";
            disableButtons();
        } else if (totalLosses === winningScore) {
            resultsDisplay.textContent = "You lost the game!";
            disableButtons();
        }
    }

    function disableButtons() {
        possibleChoices.forEach(button => button.disabled = true);
        resetButton.style.display = "block"; // Show reset button
				resetButton.disabled = false;
    }

    function resetGame() {
        totalWins = 0;
        totalLosses = 0;
        results = "";
        totalWinsDisplay.textContent = totalWins;
        totalLossesDisplay.textContent = totalLosses;
        resultsDisplay.textContent = "";
        computerChoiceDisplay.textContent = "";
        userChoiceDisplay.textContent = "";
        
        possibleChoices.forEach(button => button.disabled = false);
        resetButton.style.display = "none"; // Hide reset button
    }

    resetButton.addEventListener("click", resetGame);
});