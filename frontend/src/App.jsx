import { useState } from 'react';
import axios from 'axios';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError('');
    setShortUrl('');

    try {
      // Send the long URL to your backend
      const response = await axios.post('http://localhost:5000/shorten', {
        originalUrl: originalUrl
      });
      
      // Create the clickable short link
      const fullShortLink = `http://localhost:5000/${response.data.shortCode}`;
      setShortUrl(fullShortLink);
      setOriginalUrl(''); 
    } catch (err) {
      console.error(err);
      setError('Failed to shorten the URL. Please try again.');
    }
  };

  return (
    <div style={{ padding: '50px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>URL Shortener</h1>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input 
          type="url" 
          placeholder="Paste your long URL here..." 
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
          style={{ padding: '10px', width: '300px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Shorten
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {shortUrl && (
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#e9ecef', borderRadius: '8px', display: 'inline-block' }}>
          <h3>Success! Here is your short URL:</h3>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#0056b3', fontWeight: 'bold', fontSize: '1.2rem' }}>
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;