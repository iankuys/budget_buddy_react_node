import React from 'react';

const Balance: React.FC<{ balance: number; date: string }> = ({ balance, date }) => {
    return (
        <div className='balanceContainer rounded'>
            <h3>Balance: ${balance}</h3>
            <p>Date: {date}</p>
        </div>
    );
};

export default Balance;