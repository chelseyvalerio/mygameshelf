const mongoose = require('mongoose');

const { Schema } = mongoose;

const gamesSchema = new Schema({
  gameId: {
    type: String,
    required: true
  },
  
  gameName: {
    type: String,
    required: true
  },

  gameImg: {
    type: String,
    required: true
  },
});

// const Games = mongoose.model('Games', gamesSchema);

module.exports = gamesSchema;
