import React, { useState, useEffect } from 'react';
import './CalcButton.css'

function CalcButton(props) {

    return (
        <div className="calc-button">
            <button className="button calc-button-item" onClick={props.onClick} style={props.style}>
                {props.text}
            </button>
        </div>
    )
}

export default CalcButton;