const mongoose = require('mongoose');

const { Schema } = mongoose;

const gamesSchema = new Schema({
  games: {
    type: String,
    require: true
  },
});

const Games = mongoose.model('Games', gamesSchema);

module.exports = Games;
