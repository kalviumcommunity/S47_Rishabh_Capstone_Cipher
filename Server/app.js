const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const SongSchema = require('./SongSchema.js');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://Rishabh:Cipher@cluster0.rjxz1yt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { dbName: "Cipher" })
  .then(() => {
    console.log('Connected to MongoDB');

    app.get('/', (req, res) => {
      SongSchema.find()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    });

    app.post('/add', (req, res) => {
      const {
        name,
        image,
        song,
        album,
        artist,
        language,
        category
      } = req.body;

      const newSong = new SongSchema({
        name,
        image,
        song,
        album,
        artist,
        language,
        category
      });

      newSong.save()
        .then(() => {
          res.status(201).send('Song/Album added Successfully');
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    });




    app.delete('/:id', async (req, res) => {
      const id = req.params.id;
      try {
        const deletedSong = await SongSchema.findByIdAndDelete(id);
        if (!deletedSong) {
          return res.status(404).send('Song not found');
        }
        res.json(deletedSong);
      } catch (err) {
        res.status(500).send(err.message);
      }
    });

    app.put('/:id', async (req, res) => {
      const id = req.params.id;
      const update = req.body;

      try {
        const updatedSong = await SongSchema.findByIdAndUpdate(id, update, { new: true });
        if (!updatedSong) {
          return res.status(404).send('Song not found');
        }
        res.json(updatedSong);
      } catch (err) {
        res.status(500).send(err.message);
      }
    });



  });

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
