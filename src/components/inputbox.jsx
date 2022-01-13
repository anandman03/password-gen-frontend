import React from 'react';

export default function InputBox({ length, updateLength }) {
  return(
    <div className='app-element'>
      <label>Length</label>
      <input 
        type='number'
        id='app-inputbox'
        value={length}
        onChange={(event) => updateLength(event)}
      />
    </div>
  );
}