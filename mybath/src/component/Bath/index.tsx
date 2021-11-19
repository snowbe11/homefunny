import React from 'react'
import "./style.css"

const Bath = () => {
    const initial_date = new Date("2021-11-19").toLocaleDateString();
    const name = "james";

    return (
        <div className="bath-app">
            <div>{initial_date}</div>
            <div>{name}</div>            
        </div>
    );
};

export default Bath;
