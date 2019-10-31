import React, { useEffect } from 'react';
import './CalcButton.css'

function CalcButton(props) {
    //키보드 입력 이벤트 핸들러
    function keyEventHandler(event){
        if( event.key === props.text) {
            props.onClick(event)
        } else if( props.triggerKey ) {
            props.triggerKey.forEach((key)=>{
                if( event.keyCode === key || event.key === key ) {
                    props.onClick(event)
                }
            })
        }
    }

    useEffect(()=>{
        document.addEventListener('keydown', keyEventHandler)

        return ()=>{
            document.removeEventListener('keydown', keyEventHandler)
        }
    }, [props])

    return (
        <div className="calc-button">
            <button className="button calc-button-item" onClick={props.onClick} style={props.style}>
                {props.text}
            </button>
        </div>
    )
}

export default CalcButton;