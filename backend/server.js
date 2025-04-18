const express = require('express');
const CurrentsAPI = require('currentsapi');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const API_KEY = process.env.CURRENTS_API_KEY || 'YOUR_API_KEY';
const currentsapi = new CurrentsAPI(API_KEY);

app.get('/api/news/latest', async (req, res) => {
  try {
    const response = await currentsapi.search({
      language: 'en',
      country: 'IN',
      category: 'general',
    });
    res.json(response.news);
  } catch (err) {
    console.error('Error from CurrentsAPI:', err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});
