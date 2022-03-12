import axios from 'axios';
import React, { useEffect, useState } from 'react'
const CURRENCY_URL = 'http://data.fixer.io/api/latest?access_key=95eebc0447bb837716e5225c65024147&format=1'

export default function CurrencyRow() {
    const [amountA, setAmountA] = useState(1);
    const [amountB, setAmountB] = useState();
    const [currencyA, setCurrencyA] = useState([]);
    const [currencyB, setCurrencyB] = useState([]);
    const [initialCurrencyA, setInitialCurrencyA] = useState();
    const [initialCurrencyB, setInitialCurrencyB] = useState();

    const GetExchangeData = () => {
        axios.get(CURRENCY_URL)
        .then(res => {          
            setCurrencyA([...Object.keys(res.data.rates)])
            setCurrencyB([...Object.keys(res.data.rates)])
            const base = [...Object.keys(res.data)]
            setInitialCurrencyA(base[2])
            console.log(base)
            setInitialCurrencyB(res.data.rates[0])
        })
    }

    useEffect(() => {
        GetExchangeData();
    }, [])


  return (
  <>
    <div>
        <input type="number" onChange={e => setAmountA(e.target.value)}/>
        <select value={initialCurrencyA}>
            {currencyA.map((item) => {
               return (<option 
                    key={item} value={item} onChange={e => setCurrencyA(e.target.value)}>{item}
                </option>)
        })}
        </select>
    </div>
    <div>
        <input type="number" onChange={e => setAmountB(e.target.value)}/>
        <select defaultValue={initialCurrencyB}>
            {currencyB.map((item) => {
               return (<option
                key={item} value={item} onChange={e => setCurrencyB(e.target.value)}>{item}
            </option>)
        })}
        </select>
    </div>
  </>  
  )
}
