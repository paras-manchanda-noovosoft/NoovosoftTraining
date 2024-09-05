import React from 'react';

const WithAuth = (Component) => {
    const isAuth = true; // This should ideally come from context or props

    return (props) => {
        if (isAuth) {
            return <Component {...props} />;
        } else {
            return <p>Please login to access</p>;
        }
    };
};

export default WithAuth;
