import React, { useState, useEffect } from 'react';
import CalcButton from 'components/CalcButton'
import './App.css';

// 숫자 확인 함수
function isNumber(text) {
    if( undefined !== text && null !== text ) {
        return (/^[\d]+$/g).test(text.toString().trim());
    } else {
        return false
    }
}

// 사칙연산 변환 및 계산 함수
function _calculating(target, oper, input) {
    let result = target;
    switch(oper) {
        case "+":
            result = Number(target) + Number(input);
            break;
        case "-":
            result = Number(target) - Number(input);
            break;
        case "*":
            result = Number(target) * Number(input);
            break;
        case "/":
            if( Number(input) !== 0 ) {
                result = Number(target) / Number(input);
            }
            break;
    }
    return result
}

function App() {

    //화면 변수
    const [ result, setResult ] = useState(0); //(Number)
    const [ display, setDisplay ] = useState([]); //(String)
    const [ input, setInput ] = useState(null); //(String)
    const [ displayResult, setDisplayResult ] = useState(false);
    //메모리 변수
    const [ tmpInput, setTmpInput ] = useState(null); //(Number)
    const [ tmpOper, setTmpOper ] = useState(null); //(String)

    useEffect(()=>{ //=> setTmpOper
        let newDisplay = [...display];

        if( null === tmpOper) {
            return
        } else if( "=" === tmpOper ) { //등호 예외처리
            if( false === isNumber(newDisplay[newDisplay.length - 1]) ) {
                newDisplay.push( tmpInput )
                setDisplayResult(true)
            }
        } else { //사칙연산 경우
            //연산 대상이 없을 경우 (숫자 선택한적 없는 경우)
            if( newDisplay.length === 0 ) {
                console.log(tmpInput)
                if( isNumber(tmpInput) ) {
                    newDisplay.push(tmpInput)
                } else {
                    return;
                }
            }

            //마지막이 연산자일 경우 교체
            if( false === isNumber(newDisplay[newDisplay.length - 1]) ) {
                if( null !== tmpInput ) {
                    newDisplay.push(tmpInput)
                } else {
                    newDisplay.pop();
                }
            }

            newDisplay.push(tmpOper)
        }
        
        setDisplay([...newDisplay])
        setTmpInput(null)
        
    }, [tmpOper])

    useEffect(()=>{ //=> setDisplay
        calculate()
    }, [display])

    useEffect(()=>{ //=> setTmpInput
        if( tmpInput !== null ) {
            if( false === isNumber(display[display.length - 1]) ) {
                setInput( tmpInput.toString() )
            }

            setTmpOper(null)
        }

    }, [tmpInput])

    useEffect(()=>{ //=> setResult
        if( result !== null ) {
            setDisplayResult(true)
            setTmpInput(null)
            setTmpOper(null)
        }
        
    }, [result])

    useEffect(()=>{//=> setInput
        if( input !== null ) {
            setDisplayResult(false)
        }
        
    }, [input])
    
    // 코어 연산
    function calculate() {
        let calcArr = [ ...display ]

        //연산자로 끝난 경우 입력숫자 추가
        if( false === isNumber(calcArr[calcArr.length-1]) ) {
            if( null !== tmpInput ) {
                calcArr.push(tmpInput)
            } else {
                calcArr.pop()
            }
        }

        let newResult = 0
        let tmpOper
        calcArr.forEach((value, index) => {
            console.log(newResult, tmpOper, value)
            if( isNumber(value) ) {
                if( tmpOper ) {
                    newResult = _calculating(newResult, tmpOper, value)
                    tmpOper = undefined
                } else {
                    newResult = value
                }
            } else {
                tmpOper = value
            }
        })

        setResult(newResult)
        setTmpOper(null)
        console.log('calculate newResult :' + newResult)
    }

    //숫자 입력 시
    function appendNumber(value) {
        if( null === tmpInput ) {
            setTmpInput(value)
        } else {
            setTmpInput(Number(tmpInput + "" + value))
        }
    }

    //연산자 입력 시
    function appendOperator(operator) {
        setTmpOper( operator )
    }

    function clear() {
        if( null === tmpInput ) {
            allClear()
        } else {
            setTmpInput(Number(tmpInput.toString().slice(0,-1)))
        }
    }

    function allClear() {
        setResult(0)
        setDisplay([])
        setInput(null)
        setTmpInput(null)
        setTmpOper(null)
        setDisplayResult(false)
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
                    <td><CalcButton text="AC" onClick={allClear} /></td>
                    <td colSpan="2"><CalcButton text="Clear" onClick={clear} style={{width: "100px"}} /></td>
                    <td><CalcButton text="/" onClick={(event)=>appendOperator("/")} /></td>
                </tr>
                <tr>
                    <td><CalcButton text="7" onClick={(event)=>appendNumber(7)} /></td>
                    <td><CalcButton text="8" onClick={(event)=>appendNumber(8)} /></td>
                    <td><CalcButton text="9" onClick={(event)=>appendNumber(9)} /></td>
                    <td><CalcButton text="*" onClick={(event)=>appendOperator("*")} /></td>
                </tr>
                <tr>
                    <td><CalcButton text="4" onClick={(event)=>appendNumber(4)} /></td>
                    <td><CalcButton text="5" onClick={(event)=>appendNumber(5)} /></td>
                    <td><CalcButton text="6" onClick={(event)=>appendNumber(6)} /></td>
                    <td><CalcButton text="-" onClick={(event)=>appendOperator("-")} /></td>
                </tr>
                <tr>
                    <td><CalcButton text="1" onClick={(event)=>appendNumber(1)} /></td>
                    <td><CalcButton text="2" onClick={(event)=>appendNumber(2)} /></td>
                    <td><CalcButton text="3" onClick={(event)=>appendNumber(3)} /></td>
                    <td><CalcButton text="+" onClick={(event)=>appendOperator("+")} /></td>
                </tr>
                <tr>
                    <td colSpan="2"><CalcButton text="0" onClick={(event)=>appendNumber(0)} style={{width: "100px"}}/></td>
                    <td><CalcButton text="." onClick={(event)=>appendNumber(".")} /></td>
                    <td><CalcButton text="=" onClick={(event)=>appendOperator("=")} /></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default App;
