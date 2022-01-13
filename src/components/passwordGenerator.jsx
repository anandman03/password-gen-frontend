import React, { useState } from 'react';
import CheckBox from './checkbox';

import InputBox from './inputbox';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState('');
  const [isUpperCase, setIsUpperCase] = useState(0);
  const [isNumeric, setIsNumeric] = useState(0);
  const [isSymbol, setIsSymbol] = useState(0);

  function updateUpperCaseCheckbox() {
    setIsUpperCase(1 - isUpperCase);
  }

  function updateNumericCheckbox() {
    setIsNumeric(1 - isNumeric);
  }

  function updateSymbolCheckbox() {
    setIsSymbol(1 - isSymbol);
  }

  function updateLength(event) {
    setLength(Number(event.target.value));
  }

  function generatePassword() {
    fetch('https://password-gen-backend.herokuapp.com/password-gen/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ length, isUpperCase, isNumeric, isSymbol }),
    })
    .then(response => {
      if (response.ok) return response.json();
      return response.text().then(error => { throw new Error(error) });
    })
    .then(data => {
      console.log(data.message);
      setPassword(data.message);
    })
    .catch(error => alert(error.message))
  }

  return(
    <div className='app'>
      <h1 className='app-header'>Password Generator</h1>
      <InputBox 
        length={length}
        updateLength={updateLength}
      />
      <CheckBox
        label='Uppercase'
        value={Boolean(isUpperCase)}
        updateValue={updateUpperCaseCheckbox}
      />
      <CheckBox
        label='Numeric'
        value={Boolean(isNumeric)}
        updateValue={updateNumericCheckbox}
      />
      <CheckBox
        label='Symbol'
        value={Boolean(isSymbol)}
        updateValue={updateSymbolCheckbox}
      />
      <button
        className='app-btn'
        onClick={() => generatePassword()}
      >
        Submit
      </button>
      <div className='display-screen'>
        {password}
      </div>
    </div>
  );
}