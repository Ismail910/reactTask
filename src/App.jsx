import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(5);
  const [formData, setFormData] = useState({});
  const [prevData, setPrevData] = useState({});
  const ref = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    setPrevData(formData);
  };

  const addNewInput = () => {
    setCount(() => count + 1);
  };

  const renderInputFields = () => {
    const inputFields = [];
    for (let i = 0; i < count; i++) {
      inputFields.push(
        <div key={i}>
          <input
            type='text'
            placeholder='_'
            className='text_box'
            name={`${i}`}
            value={formData[`${i}`] || ''}
            onChange={(e) => handleChange(e)}
          />
          <span onClick={addNewInput}>|</span>
        </div>
      );
    }
    return inputFields;
  };

  useEffect(() => {
    const values = Object.values(prevData);
    const concatenatedValue = values.join('');
    ref.current.innerText = concatenatedValue;
  }, [prevData]);


  return (
    <>
      <div>
        <form onSubmit={submitForm}>
          <div className='flex'>
            {renderInputFields()}
          </div>
          <button type='submit'>Submit</button>
        </form>
        <div className='res' ref={ref}></div>
      </div>
    </>
  );
}

export default App;
