import React from 'react';



function CurrencyRow(props) {

  const { currencyOptions, selectedCurrency, onChangeCurrency,
                                             amount, onChangeAmount } = props;

  return (
    <div>
      <input type="number" min="1" value={amount} onChange={onChangeAmount}/>
      <select value={selectedCurrency} onChange={onChangeCurrency}>
      {currencyOptions.map(option => (
       <option key={option} value={option}>{option}</option>))}
      </select>
    </div>
  );
}

export default CurrencyRow;
