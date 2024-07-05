import React, { useEffect, useState } from 'react';

const Game = ({ player1, player2, onGameEnd }) => {
    const [player1Choice, setPlayer1Choice] = useState(null);
    const [player2Choice, setPlayer2Choice] = useState(null);
    const [gameResult, setGameResult] = useState(null);

    // Function to handle player choice selection
    const handlePlayerChoose = (player, choice) => {
        if (player === 'player1') {
            setPlayer1Choice(choice);
        } else if (player === 'player2') {
            setPlayer2Choice(choice);
        }

    };

    useEffect(() => {
        if (player1Choice && player2Choice) {
            determineWinner(player1Choice, player2Choice);
        }
    },[player1Choice,player2Choice])

    // Function to determine the winner based on choices
    const determineWinner = (choice1, choice2) => {
        if (
            (choice1 === 'rock' && choice2 === 'scissors') ||
            (choice1 === 'scissors' && choice2 === 'paper') ||
            (choice1 === 'paper' && choice2 === 'rock')
        ) {
            setGameResult(`${player1.username} wins!`);
        } else if (
            (choice2 === 'rock' && choice1 === 'scissors') ||
            (choice2 === 'scissors' && choice1 === 'paper') ||
            (choice2 === 'paper' && choice1 === 'rock')
        ) {
            setGameResult(`${player2.username} wins!`);
        } else {
            setGameResult('It\'s a draw!');
        }
    };

    // Function to reset the game state for a new round
    const playAgain = () => {
        setPlayer1Choice(null);
        setPlayer2Choice(null);
        setGameResult(null);
    };

    return (
        <div className="game">
            <h2>Game</h2>
            {gameResult ? (
                <div>
                    <p>{player1.username}'s choice: {player1Choice}</p>
                    <p>{player2.username}'s choice: {player2Choice}</p>
                    <p>Result: {gameResult}</p>
                    <button onClick={playAgain}>Play Again</button>
                    {/* Notify parent component (App.js) that the game ended */}
                    {onGameEnd && <button onClick={() => onGameEnd(player1, player2, gameResult)}>End Game</button>}
                </div>
            ) : (
                <div>
                    <h3>{player1.username}'s Turn</h3>
                    <div>
                        <button onClick={() => handlePlayerChoose('player1', 'rock')}>Rock</button>
                        <button onClick={() => handlePlayerChoose('player1', 'paper')}>Paper</button>
                        <button onClick={() => handlePlayerChoose('player1', 'scissors')}>Scissors</button>
                    </div>
                    <h3>{player2.username}'s Turn</h3>
                    <div>
                        <button onClick={() => handlePlayerChoose('player2', 'rock')}>Rock</button>
                        <button onClick={() => handlePlayerChoose('player2', 'paper')}>Paper</button>
                        <button onClick={() => handlePlayerChoose('player2', 'scissors')}>Scissors</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Game;
