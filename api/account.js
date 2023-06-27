const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    const response = await fetch('https://nepalinfo.itsoch.com/v1/account', {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        // Add any other required headers here
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();

    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://updatebookmark.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Forward the response from the remote server
    res.status(response.status).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
