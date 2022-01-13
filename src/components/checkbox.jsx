import React from 'react';

export default function CheckBox({ label, value, updateValue }) {
  return(
    <div className='app-element'>
      <label>{label}</label>
      <input
        type='checkbox'
        id='app-checkbox'
        checked={value}
        onChange={() => updateValue()}
      />
    </div>
  );
}