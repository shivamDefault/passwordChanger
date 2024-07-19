import React, { useState, useCallback ,useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    
    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*()-_=+[]{}|;:,.<>?';

    for (let i = 0; i < length; i++) {

      pass += str.charAt(Math.floor(Math.random() * str.length +1));

    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  

  const handleLengthChange = (e) => {
    setLength(e.target.value);
    passwordGenerator();
  };

  const handleNumbersChange = () => {
    setNumberAllowed(!numberAllowed);
    passwordGenerator();
  };

  const handleCharactersChange = () => {
    setCharAllowed(!charAllowed);
    passwordGenerator();
  };
useEffect(()=>{passwordGenerator()},[numberAllowed,length,charAllowed,passwordGenerator])
  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-500">
      <h1 className="text-6xl text-center text-white mb-8">Password Generator</h1>
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-4">
          <input 
            type="text" 
            placeholder='PASSWORD'
            value={password} 
            readOnly 
            className="w-full p-2 text-lg text-gray-800 rounded bg-gray-200"
            ref={passwordRef} 
          />
          <button 
          onClick={()=>{window.navigator.clipboard.writeText(password)
            passwordRef.current?.select()
          }}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded" 
            
          >
            copy
          </button>
        </div>
        <div className="flex items-center mb-4">
          <label className="text-white mr-4">Length: {length}</label>
          <input 
            type="range" 
            min="8" 
            max="32" 
            value={length} 
            onChange={handleLengthChange} 
            className="w-full" 
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="text-white mr-2">Numbers</label>
          <input 
            type="checkbox" 
            checked={numberAllowed} 
            onChange={handleNumbersChange} 
            className="form-checkbox"
          />
          <label className="text-white ml-4 mr-2">Characters</label>
          <input 
            type="checkbox" 
            checked={charAllowed} 
            onChange={handleCharactersChange} 
            className="form-checkbox"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
