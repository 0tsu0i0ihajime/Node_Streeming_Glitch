const express = require('express');
const qrcode = require('qrcode');
const ytdl = require('ytdl-core');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/download', async(req, res) => {
  const link = req.query.link;
  const qr = req.query.qr;
  
  if(qr) {
    const decoded = await qrcode.toString(qr, { type: 'terminal' });
    
    if (decoded === link) {
      res.header('Content-Disposition', `attachment; filename="audio.mp3"`);
      ytdl(link, { filter: 'audioonly' }).pipe(res);
    } else {
      res.send('Invalid QR code');
    }
  } else {
    res.send('QR code not found');
  }
});

app.get('/stream', async(req, res) => {
    const videoUrl = req.query.videoUrl;
    const audioStream = ytdl(videoUrl, {filter: 'audioonly'});

    audioStream.pipe(res);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
