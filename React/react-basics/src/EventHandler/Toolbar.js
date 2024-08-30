import React from 'react';

function Button({onClick,children}){
    return(
        <>
            <button onClick={onClick}>
                {children}
            </button>
        </>
    )
}
export default function Toolbar({onPlayMovie, onUploadImage}) {
    return (
        <>
            <Button onClick={onPlayMovie}>
                Play Movie
            </Button>
            <Button onClick={onUploadImage}>
                Upload Image
            </Button>
        </>
    )
};