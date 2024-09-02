import { useReducer } from "react";

// Define the initial state
const initialState = { count: 0 };

// Define the reducer function
function reducer(state, action) {
    switch (action.type) {
        case "increment":
            return { count: state.count + 1 };
        case "decrement":
            return { count: state.count - 1 };
        case "reset":
            return { count: 0 };
        default:
            throw new Error("Unknown action type");
    }
}

export default function CountHandler() {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Event handler function
    const handleClick = (type) => () => {
        dispatch({ type });
    };

    return (
        <>
            <button onClick={handleClick("increment")}>
                Increment
            </button>
            <button onClick={handleClick("decrement")}>
                Decrement
            </button>
            <button onClick={handleClick("reset")}>
                Reset
            </button>
            <h1>Count: {state.count}</h1>
        </>
    );
}
