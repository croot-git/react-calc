import React, { useState, useEffect } from 'react';
import CalcButton from 'components/CalcButton'
import './App.css';

function isNumber(text) {
    if( undefined !== text && null !== text ) {
        return (/^[0-9]$/g).test(text.toString().trim());
    } else {
        return false
    }
}

function App() {

    const [ result, setResult ] = useState(0);
    const [ display, setDisplay ] = useState([]);
    const [ input, setInput ] = useState(null);
    const [ displayResult, setDisplayResult ] = useState(false);
    const [ inputReset, setInputReset ] = useState(false);

    useEffect(()=>{
        setDisplayResult(false)
    },[input])

    useEffect(()=>{
        setDisplayResult(true)
    },[result])
    
    function append(value) {
        if( isNumber(value) ) {
            if( null === input || inputReset ) {
                setInput(value.toString())
            } else {
                setInput(input + value.toString())
            }
            setInputReset(false)
        }
    }
    function plus() {
        if( inputReset ) {
            if( false === isNumber(display[display.length-1]) ) {
                const newDisplay = display;
                newDisplay.pop();
                setDisplay([...newDisplay, "+"])
            }
            return;
        }
        
        if( null !== input ) {
            if( isNumber(display[display.length-1]) ) {
                setDisplay([...display, "+", input])
            } else {
                setDisplay([...display, input, "+"])
            }
            setResult(Number(result) + Number(input))
        }

        setInputReset(true)
    }

    function minus() {
        if( inputReset ) {
            if( false === isNumber(display[display.length-1]) ) {
                const newDisplay = display;
                newDisplay.pop();
                setDisplay([...newDisplay, "-"])
            }
            return;
        }

        if( isNumber(display[display.length-1]) ) {
            setDisplay([...display, "-", input])
        } else {
            setDisplay([...display, input, "-"])
        }
        setResult(Number(result) - Number(input))

        setInputReset(true)
    }

    function divide() {
        console.log('divide')
        if( false === isNumber(display[display.length-1]) ) {
            display.push(input)
        }
        display.push("/")

        if( result !== 0 && input !== 0 ){
            setResult(result / input)
        } else {
            setResult(input)
        }

        setInputReset(true)
        console.log(result)
    }

    function multiply() {
        if( null !== input ) {
            display.push(input)
            display.push("*")
        }

        if( result !== 0 ){
            setResult(result * input)
        } else {
            setResult(input)
        }
        
        setDisplayResult(true)
    }

    function clear() {
        setResult(0)
        setInput(null)
        setInputReset(true)
        setDisplay([])
        setDisplayResult(false)
    }
    
    function calculate() {
        if( isNumber(display[display.length-1]) ) {
            
        } else {
            switch(display[display.length-1]) {
                case "+":
                    setResult(Number(result) + Number(input))
                    break;
                case "-":
                        setResult(Number(result) - Number(input))
                    break;
                case "*":
                        setResult(Number(result) * Number(input))
                    break;
                case "/":
                    if( Number(input) !== 0 ) {
                        setResult(Number(result) / Number(input))
                    }
                    break;
            }
            display.push(input)
            console.log(result)
        }
    }

    return (
        <div className="App">
            <table className="calculator">
                <tbody>
                <tr>
                    <td colSpan="4">
                        <p className="calc-display">{ display.join(' ') } </p>
                    </td>
                </tr>
                <tr>
                    <td colSpan="4">
                        <p className="calc-display">{ (displayResult)? result : input }</p>
                    </td>
                </tr>
                <tr>
                    <td colSpan="3"><CalcButton text="AC" onClick={clear} /></td>
                    <td><CalcButton text="/" onClick={divide} /></td>
                </tr>
                <tr>
                    <td><CalcButton text="7" onClick={(event)=>append(7)} /></td>
                    <td><CalcButton text="8" onClick={(event)=>append(8)} /></td>
                    <td><CalcButton text="9" onClick={(event)=>append(9)} /></td>
                    <td><CalcButton text="*" onClick={multiply} /></td>
                </tr>
                <tr>
                    <td><CalcButton text="4" onClick={(event)=>append(4)} /></td>
                    <td><CalcButton text="5" onClick={(event)=>append(5)} /></td>
                    <td><CalcButton text="6" onClick={(event)=>append(6)} /></td>
                    <td><CalcButton text="-" onClick={minus} /></td>
                </tr>
                <tr>
                    <td><CalcButton text="1" onClick={(event)=>append(1)} /></td>
                    <td><CalcButton text="2" onClick={(event)=>append(2)} /></td>
                    <td><CalcButton text="3" onClick={(event)=>append(3)} /></td>
                    <td><CalcButton text="+" onClick={plus} /></td>
                </tr>
                <tr>
                    <td colSpan="2"><CalcButton text="0" onClick={(event)=>append(0)} style={{width: "70px"}}/></td>
                    <td><CalcButton text="." onClick={(event)=>append(".")} /></td>
                    <td><CalcButton text="=" onClick={calculate} /></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default App;
