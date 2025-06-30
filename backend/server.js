const express = require('express');
const cors = require('cors');
require('dotenv').config();

const searchRouter = require('./routes/search');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/search', searchRouter);
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Backend server running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


