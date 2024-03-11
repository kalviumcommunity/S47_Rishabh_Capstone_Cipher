const mongoose = require("mongoose");

const SongSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
    song: {
      type: String,
      required: true,
    },
    album: {
      type: String,
    },
    artist: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
//   { timestamps: false,versionKey: false }
);

module.exports = mongoose.model("songs", SongSchema);




