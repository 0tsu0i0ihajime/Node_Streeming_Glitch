const express = require('express');
const ytdl = require('ytdl-core');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/stream', async(req, res) => {
    const videoUrl = req.query.videoUrl;
    const audioStream = ytdl(videoUrl, {filter: 'audioonly'});

    audioStream.pipe(res);
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server listening on port ${process.env.PORT || 8080}`);
})