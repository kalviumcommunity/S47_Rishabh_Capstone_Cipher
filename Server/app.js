const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const DataModel = require('./Schema.js');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://Rishabh:Cipher@cluster0.rjxz1yt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { dbName: "Cipher" })
  .then(() => {
    console.log('Connected to MongoDB');

    app.get('/', (req, res) => {
      DataModel.find()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    });

    app.post('/addTrack', async (req, res) => {
      try {
       
        const {thumbnail,songName,songDescription,tags,audio,nextTrackList,albumDescription,audioType,} = req.body;
        const newTrack = new DataModel({
          thumbnail,
          songName,
          songDescription,
          tags,
          audio: {
            data: Buffer.from(audio, 'base64'),
            contentType: audioType,
          },
          nextTrackList,
          albumDescription,
        });
        const savedTrack = await newTrack.save();
        res.status(201).json(savedTrack);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
    
  })


  


app.listen(10000, () => {
  console.log('Server is running on port 10000');
});
