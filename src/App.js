import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Optional for styling

function App() {
    const [jsonInput, setJsonInput] = useState(''); // State for JSON input
    const [response, setResponse] = useState(null); // State for API response
    const [error, setError] = useState(''); // State for errors
    const [isSubmitted, setIsSubmitted] = useState(false); // State to toggle visibility of checkboxes
    const [selectedOptions, setSelectedOptions] = useState([]); // State for selected options

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const parsedJson = JSON.parse(jsonInput); // Validate JSON
            const res = await axios.post('https://backend-eight-delta-78.vercel.app/bfhl', {data : parsedJson.data}); // Post data to backend
            setResponse(res.data);
            setIsSubmitted(true); // Show options if submission is successful
        } catch (err) {
            setError('Invalid JSON format or server error.');
            setIsSubmitted(false); // Hide options if there is an error
        }
    };

    // Handle checkbox changes
    const handleOptionChange = (e) => {
        const { value } = e.target;
        setSelectedOptions((prev) => 
            prev.includes(value) ? prev.filter(opt => opt !== value) : [...prev, value]
        );
    };

    // Render the filtered response based on selected checkboxes
    const renderResponse = () => {
        if (!response) return null;
        return (
            <div className="response-section">
                {selectedOptions.includes('Alphabets') && <p>Alphabets: {response.alphabets.join(', ')}</p>}
                {selectedOptions.includes('Numbers') && <p>Numbers: {response.numbers.join(', ')}</p>}
                {selectedOptions.includes('Highest Lowercase Alphabet') && <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}</p>}
            </div>
        );
    };

    return (
        <div className="App">
            <h1>BFHL Challenge</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder='Enter valid JSON input'
                    rows={5}
                    cols={50}
                />
                <br />
                <button type='submit'>Submit</button>
            </form>

            {error && <p className="error">{error}</p>}

            {isSubmitted && (
                <div className="options-section">
                    <h2>Select the options to display:</h2>
                    <label>
                        <input
                            type="checkbox"
                            value="Alphabets"
                            onChange={handleOptionChange}
                        />
                        Alphabets
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Numbers"
                            onChange={handleOptionChange}
                        />
                        Numbers
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Highest Lowercase Alphabet"
                            onChange={handleOptionChange}
                        />
                        Highest Lowercase Alphabet
                    </label>
                </div>
            )}

            {renderResponse()}
        </div>
    );
}

export default App;
