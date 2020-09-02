import React, { useEffect, useState } from 'react';
import CurrencyRow from './currencyRow.js';
import './App.css';

const apiurl = "https://api.exchangeratesapi.io/latest";

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [toCurrency, setToCurrency] = useState();
  const [fromCurrency, setFromCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  var toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = fromAmount * exchangeRate
  }else {
    toAmount = amount
    fromAmount = toAmount / exchangeRate
  }

  useEffect(() => {
    fetch(apiurl)
    .then(res => res.json())
    .then(data => {
      var firstCurrency = Object.keys(data.rates)[0]
      setCurrencyOptions([data.base, ...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(firstCurrency)
      setExchangeRate(data.rates[firstCurrency])
    })
  }, []);

  useEffect(() => {
    if(fromCurrency != null && toCurrency != null){
      fetch(`${apiurl}?base=${fromCurrency}&symbols${toCurrency}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency]);





  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }
  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }



  return (
    <div>

      <h3>Currency converter</h3>

      <CurrencyRow
      currencyOptions={currencyOptions}
      selectedCurrency={fromCurrency}
      onChangeCurrency={e => setFromCurrency(e.target.value)}
      onChangeAmount={handleFromAmountChange}
      amount={fromAmount}/>

      <div className="equal">=</div>

      <CurrencyRow
      currencyOptions={currencyOptions}
      selectedCurrency={toCurrency}
      onChangeCurrency={e => setToCurrency(e.target.value)}
      onChangeAmount={handleToAmountChange}
      amount={toAmount}/>

    </div>
  );
}

export default App;
