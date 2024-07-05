import React from 'react';

const Leaderboard = ({ leaderboard }) => {
    return (
        <div className="leaderboard">
            <h2>Leaderboard</h2>
            <ul>
                {leaderboard.map((player, index) => (
                    <li key={index}>{player.username} - {player.score}</li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;
