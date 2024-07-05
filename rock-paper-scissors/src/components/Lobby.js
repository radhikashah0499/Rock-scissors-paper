import React, { useState } from 'react';

const Lobby = ({ players, onAddPlayer, onJoinWaitingList, onStartGame, waitingList }) => {
    const [username, setUsername] = useState('');
    const [selectedPlayer1, setSelectedPlayer1] = useState(null);
    const [selectedPlayer2, setSelectedPlayer2] = useState(null);

    const handleAddPlayer = () => {
        if (username && !players.find(player => player.username === username)) {
            onAddPlayer(username);
            setUsername('');
        }
    };

    const handleSelectPlayer = (player) => {
        if (!selectedPlayer1) {
            setSelectedPlayer1(player);
        } else if (!selectedPlayer2 && player.username !== selectedPlayer1.username) {
            setSelectedPlayer2(player);
        }
    };

    const handleStartGame = () => {
        if (selectedPlayer1 && selectedPlayer2) {
            onStartGame(selectedPlayer1, selectedPlayer2);
            setSelectedPlayer1(null);
            setSelectedPlayer2(null);
        }
    };

    const handleJoinWaitingList = (player) => {
        if (!waitingList.find(p => p.username === player.username)) {
            onJoinWaitingList(player);
        }
    };

    return (
        <div className="lobby">
            <h2>Lobby</h2>
            <input className="lobby-form"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
            />
            <button onClick={handleAddPlayer}>Add Player</button>
            <div  className="lobby-player-list">
                <ul>
                    {players.map((player, index) => (
                        <li key={index}>
                            {player.username}
                            {selectedPlayer1 && selectedPlayer1.username === player.username ? (
                                <span> - Selected</span>
                            ) : selectedPlayer2 && selectedPlayer2.username === player.username ? (
                                <span> - Selected</span>
                            ) : (
                                <>
                                    <button onClick={() => handleSelectPlayer(player)}>Select</button>
                                    <button onClick={() => handleJoinWaitingList(player)}>Join Waiting List</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            {selectedPlayer1 && selectedPlayer2 && (
                <div>
                    <p>Players Selected: {selectedPlayer1.username} and {selectedPlayer2.username}</p>
                    <button onClick={handleStartGame}>Start Game</button>
                </div>
            )}
        </div>
    );
};

export default Lobby;
