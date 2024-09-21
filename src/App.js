import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate and submit the JSON input to the backend
      const parsedInput = JSON.parse(jsonInput);
      const response = await axios.post('http://localhost:5000/bfhl', { data: parsedInput.data });
      setResponseData(response.data);
    } catch (error) {
      alert('Invalid JSON or Server Error');
    }
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOptions(
      selectedOptions.includes(value)
        ? selectedOptions.filter(opt => opt !== value)
        : [...selectedOptions, value]
    );
  };

  const renderResponse = () => {
    if (!responseData) return null;

    const result = [];
    if (selectedOptions.includes('Numbers')) result.push(<p key="numbers">Numbers: {responseData.numbers.join(', ')}</p>);
    if (selectedOptions.includes('Alphabets')) result.push(<p key="alphabets">Alphabets: {responseData.alphabets.join(', ')}</p>);
    if (selectedOptions.includes('Highest Alphabet')) result.push(<p key="highest">Highest Alphabet: {responseData.highest_alphabet.join(', ')}</p>);

    return result;
  };

  return (
    <div className="App">
      <h1>BFHL Challenge</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          placeholder='Enter JSON (e.g. { "data": ["A", "1", "B"] })'
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {responseData && (
        <div>
          <h2>Select Data to Display:</h2>
          <div>
            <label>
              <input
                type="checkbox"
                value="Numbers"
                onChange={handleOptionChange}
              /> Numbers
            </label>
            <label>
              <input
                type="checkbox"
                value="Alphabets"
                onChange={handleOptionChange}
              /> Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                value="Highest Alphabet"
                onChange={handleOptionChange}
              /> Highest Alphabet
            </label>
          </div>

          <div className="result">
            <h3>Result:</h3>
            {renderResponse()}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

