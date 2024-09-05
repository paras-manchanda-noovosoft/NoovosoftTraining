import React from 'react';
import WithAuth from "./withAuth";

const Dashboard = () => {
    return <h1 style={{ color: '#000000' }}>Your Dashboard</h1>;
};
console.log("hello");
const AuthBoard = WithAuth(Dashboard);
export default AuthBoard;
