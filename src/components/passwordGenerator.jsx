import React, { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import CheckBox from './checkbox';
import InputBox from './inputbox';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState('');
  const [loading, setLoading] = useState(false);
  const [isUpperCase, setIsUpperCase] = useState(0);
  const [isNumeric, setIsNumeric] = useState(0);
  const [isSymbol, setIsSymbol] = useState(0);

  const updateUpperCaseCheckbox = () => setIsUpperCase(1 - isUpperCase);
  const updateNumericCheckbox = () => setIsNumeric(1 - isNumeric);
  const updateSymbolCheckbox = () => setIsSymbol(1 - isSymbol);
  const updateLength = ({ target }) => setLength(Number(target.value));

  async function generatePassword() {
    setLoading(true);
    const requestParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ length, isUpperCase, isNumeric, isSymbol }),
    };
    const URL = 'https://password-gen-backend.herokuapp.com/password-gen/';
    try {
      const response = await fetch(URL, requestParams);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setPassword(data.message);
    }
    catch(error) {
      alert(error);
    }
    setLoading(false);
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
      <BeatLoader css={'margin: 10px 0 0 0;'} loading={loading} />
    </div>
  );
}