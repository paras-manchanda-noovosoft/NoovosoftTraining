import React,{useState} from "react";

export default function MovingDot() {
    const [position, setPosition] = useState({
        x: 0,
        y: 0
    });
    return (
        <>
        <div
            onPointerMove={e => {
                setPosition({
                    x: e.clientX,
                    y: e.clientY
                });
            }}
            style={{
                position: 'relative',
                width: '100vw',
                height: '50vh',
                backgroundColor:'lightgray'

            }}>
            <div className="move-dot" style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                top:-300,
                width: 20,
                height: 20,
            }} />
        </div>
      </>
    );
}
