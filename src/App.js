import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Add any custom styles here

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate and submit the JSON input to the backend
      const parsedInput = JSON.parse(jsonInput);
      const response = await axios.post('https://backend-eight-delta-78.vercel.app/bfhl', { data: parsedInput.data });
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
    <div className="container mt-5">
      <h1 className="text-center mb-4">BFHL Challenge</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label htmlFor="jsonInput">Enter JSON Data:</label>
          <textarea
            className="form-control"
            id="jsonInput"
            rows="5"
            placeholder='Enter JSON (example -> { "data": ["A", "1", "B"] })'
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />
        </div>
        <h3 className="text-center mb-4"> </h3>
        <button type="Submit" className="btn btn-primary btn-block">Submit</button>
      </form>

      {responseData && (
        <div>
          <h2>Select Data to Display:</h2>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="Numbers"
              id="numbersCheck"
              onChange={handleOptionChange}
            />
            <label className="form-check-label" htmlFor="numbersCheck">
              Numbers
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="Alphabets"
              id="alphabetsCheck"
              onChange={handleOptionChange}
            />
            <label className="form-check-label" htmlFor="alphabetsCheck">
              Alphabets
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="Highest Alphabet"
              id="highestCheck"
              onChange={handleOptionChange}
            />
            <label className="form-check-label" htmlFor="highestCheck">
              Highest Alphabet
            </label>
          </div>

          <div className="mt-4">
            <h3>Result:</h3>
            <div className="p-3 border bg-light">
              {renderResponse()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;


