const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = '1067684628324-vlv8kqgfsm32fvefln6fsipcrfsemqua.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(bodyParser.json());

app.post('/api/auth/google', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    console.log('Verified Google Token Payload:', payload);

    res.status(200).json({
      id: sub,
      email,
      name,
      picture,
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Invalid Token' });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
