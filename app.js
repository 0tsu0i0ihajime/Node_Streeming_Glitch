const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = process.env.PORT || 3000;

let qrCodeRead = false;

app.use(express.static('public'));

app.get('/play', async (req, res) => {
  if (!qrCodeRead) {
    res.redirect('https://www.youtube.com');
    return;
  }

  const url = req.query.url;
  const stream = ytdl(url, { filter: 'audioonly' });

  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Transfer-Encoding', 'chunked');
  stream.pipe(res);
});

app.get('/qr', (req, res) => {
  qrCodeRead = true;
  res.send('QR code read!');
});

// Start a timer to reset the QR code read status after 30 seconds
setInterval(() => {
  qrCodeRead = false;
}, 30000);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
