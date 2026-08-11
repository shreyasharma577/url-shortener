const express = require('express');
const mongoose = require('mongoose');
const dns = require('dns');
const shortid = require('shortid'); 
const Url = require('./models/Url'); 
const cors = require('cors'); 
require('dotenv').config();


dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();

app.use(cors());
app.use(express.json());


const mongoURI = process.env.MONGO_URI; 


mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB successfully connected! 🚀'))
  .catch(err => console.error('MongoDB connection error:', err));

app.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'Please provide a valid URL' });
  }

  try {
    const shortCode = shortid.generate(); 
    
    const newUrl = new Url({
      originalUrl: originalUrl,
      shortCode: shortCode
    });

    await newUrl.save(); 
    res.json(newUrl); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while shortening URL' });
  }
});

app.get('/:shortCode', async (req, res) => {
  try {
    const urlRecord = await Url.findOne({ shortCode: req.params.shortCode });

    if (urlRecord) {
      return res.redirect(urlRecord.originalUrl); 
    } else {
      return res.status(404).json({ error: 'URL not found in database' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during redirect' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});