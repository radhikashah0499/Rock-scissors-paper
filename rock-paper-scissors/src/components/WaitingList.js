import React from 'react';

const WaitingList = ({ waitingList }) => {
    return (
        <div className="waiting-list">
            <h2>Waiting List</h2>
            <ul>
                {waitingList.map((player, index) => (
                    <li key={index}>{player.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default WaitingList;
