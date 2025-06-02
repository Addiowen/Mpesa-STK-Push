const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { initiateSTKPush } = require('./utils/mpesa');

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('M-Pesa STK Push Service');
});

app.post('/stk-push', async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const response = await initiateSTKPush(phone, amount, 'TestAccount', 'Payment Test');
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Safaricom Callback URL
app.post('/stk-callback', (req, res) => {
  console.log('Callback Received:', JSON.stringify(req.body, null, 2));

  // Optional: Save callback data to DB

  res.status(200).json({ message: 'Callback received successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
