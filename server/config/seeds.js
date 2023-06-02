const db = require('./connection');
const { User, Games} = require('../models');

db.once('open', async () => {
  // await Category.deleteMany();

  // const categories = await Category.insertMany([
  //   { name: 'Food' },
  //   { name: 'Household Supplies' },
  //   { name: 'Electronics' },
  //   { name: 'Books' },
  //   { name: 'Toys' }
  // ]);

  console.log('categories seeded');

  await Games.deleteMany();

  const games = await Games.insertMany([
    {
      id: "TAAifFP590",
      name: "The Settlers of Catan",
      year_published: 1995,
      min_players: 3,
      max_players: 4,
      playing_time: 60,
      description: "The Settlers of Catan is a board game for 3 to 4 players. Players take on the role of settlers on the island of Catan, where they must build roads, settlements, and cities in order to score points. The game is won by the player who scores the most points at the end of the game.",
      mechanics: [
        "Set Collection",
        "Trading",
        "Area Control"
      ],
      designers: [
        "Klaus Teuber"
      ],
      publishers: [
        "Mayfair Games"
      ],
      artists: [
        "Michael Menzel"
      ],
      rating: 7.8,
      image_url: "https://boardgamegeek.com/image/1330256/the-settlers-catan",
      thumbnail_url: "https://boardgamegeek.com/image/1330255/the-settlers-catan"
    },
    {
      id: "35396",
      name: "Pandemic",
      year_published: 2008,
      min_players: 2,
      max_players: 4,
      playing_time: 60-120,
      description: "Pandemic is a cooperative board game for 2 to 4 players. Players work together to cure four diseases that are spreading across the world. Players must travel the world, collect resources, and build research stations in order to find a cure. If any of the diseases overwhelm the world, the players lose.",
      mechanics: [
        "Cooperative",
        "Hand Management",
        "Set Collection"
      ],
      designers: [
        "Matt Leacock"
      ],
      publishers: [
        "Z-Man Games"
      ],
      artists: [
        "Vincent Dutrait"
      ],
      rating: 8.1,
      image_url: "https://boardgamegeek.com/image/133218/pandemic",
      thumbnail_url: "https://boardgamegeek.com/image/133217/pandemic"
     }
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    // games: [
    //   {
    //     games: [products[0]._id, products[0]._id, products[1]._id]
    //   }
    // ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
