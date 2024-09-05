import React, { useState, useMemo } from 'react';

function ExpensiveComponent({ number }) {
    const computeExpensiveValue = (num) => {
        console.log('Computing expensive value');
        let result = 0;
        for (let i = 0; i < 100; i++) {
            result += num;
        }
        return result;
    };

    // Use useMemo to memoize the result of the expensive computation
    const memoizedValue = useMemo(() => computeExpensiveValue(number),[number]);

    return <div>Computed Value: {memoizedValue}</div>;
}

export default function Computation() {
    const [count, setCount] = useState(0);
    const [number, setNumber] = useState(1);
    return (
        <div className='App'>
            <ExpensiveComponent number={number} />
            <button onClick={() => setNumber(number + 1)}>Increment Number</button>
            <button onClick={() => setCount(count + 1)}>Increase Count</button>
            <p>Count: {count}</p>
        </div>
    );
}
