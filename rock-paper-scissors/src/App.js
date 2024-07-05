import React, { useState } from 'react';
import Lobby from './components/Lobby';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';
import WaitingList from './components/WaitingList';
import './styles.css';
const App = () => {
    const [players, setPlayers] = useState([]);
    const [currentGame, setCurrentGame] = useState(null);
    const [waitingList, setWaitingList] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);

    // Function to add a new player to the game
    const handleAddPlayer = (username) => {
        if (!players.find(player => player.username === username)) {
            const newPlayer = { username, score: 0 };
            setPlayers([...players, newPlayer]);
            setLeaderboard([...leaderboard, newPlayer]);
        }
    };
    // Function to add a player to the waiting list
    const handleJoinWaitingList = (player) => {
        if (!waitingList.find(p => p.username === player.username)) {
            setWaitingList([...waitingList, player]);
        }
    };

    // Function to start a new game
    const handleStartGame = () => {
        if (waitingList.length >= 2) {
            const player1 = waitingList[0];
            const player2 = waitingList[1];
            setCurrentGame({ player1, player2 });
            setWaitingList(waitingList.slice(2));
        }
    };

    // Function to handle game end and update scores
    const handleGameEnd = (winner) => {
        // Update players' scores
        const updatedPlayers = players.map(player => {
            if (player.username === winner.username) {
                return { ...player, score: player.score + 1 };
            } else {
                return player;
            }
        });

        // Update leaderboard based on updated scores
        const updatedLeaderboard = [...updatedPlayers].sort((a, b) => b.score - a.score);

        // Update state with new scores and leaderboard
        setPlayers(updatedPlayers);
        setLeaderboard(updatedLeaderboard);
        setCurrentGame(null); // End the current game
    };

    return (
        <div className="container">
            <h1>Rock-Paper-Scissors Multiplayer</h1>
            <Lobby
                players={players}
                onAddPlayer={handleAddPlayer}
                onJoinWaitingList={handleJoinWaitingList}
                onStartGame={handleStartGame}
                waitingList={waitingList}
            />
            {currentGame ? (
                <Game
                    player1={currentGame.player1}
                    player2={currentGame.player2}
                    onGameEnd={handleGameEnd}
                />
            ) : (
                <p>No ongoing game. Select two players to start a game.</p>
            )}
            <Leaderboard leaderboard={leaderboard} />
            <WaitingList waitingList={waitingList} />
        </div>
    );
};

export default App;

