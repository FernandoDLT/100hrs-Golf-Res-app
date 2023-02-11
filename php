const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/reservation', (req, res) => {
  const reservationData = req.body;

  // Do something with the reservation data, like save it to a database

  res.json({
    reservationTime: reservationData.time,
    numPlayers: reservationData.players,
    snacks: reservationData.snacks,
    drinks: reservationData.drinks
  });
});
