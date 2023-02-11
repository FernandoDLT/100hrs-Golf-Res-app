const form = document.querySelector('form');
const submitBtn = document.querySelector('#submit-btn');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/myapp';

MongoClient.connect(url, function(err, client) {
  if (err) throw err;

  const db = client.db('myapp');
  const reservations = db.collection('reservations');

  // Define the reservation schema
const reservationSchema = {
  time: String,
  players: Number,
  snacks: [String],
  drinks: [String]
};

// Insert a new reservation
const newReservation = {
  time: '2023-02-15 10:00',
  players: 4,
  snacks: ['Pretzels', 'Chips'],
  drinks: ['Water', 'Soda']
};

reservations.insertOne(newReservation, function(err, result) {
  if (err) throw err;
  console.log('Reservation added');
});

// Find all reservations
reservations.find().toArray(function(err, results) {
  if (err) throw err;
  console.log(results);
});

// Update a reservation
reservations.updateOne({ time: '2023-02-15 10:00' }, { $set: { players: 3 } }, function(err, result) {
  if (err) throw err;
  console.log('Reservation updated');
});

// Delete a reservation
reservations.deleteOne({ time: '2023-02-15 10:00' }, function(err, result) {
  if (err) throw err;
  console.log('Reservation deleted');
});

  // Perform CRUD operations on the reservations collection here
});

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  
  // Get the selected tee time
  const time = document.querySelector('#time').value;
  
  // Get the number of players
  const players = document.querySelector('#players').value;
  
  // Get the selected snacks
  const snacks = [];
  const snacksSelect = document.querySelector('#snacks');
  for (let i = 0; i < snacksSelect.options.length; i++) {
  const option = snacksSelect.options[i];
  if (option.selected) {
  snacks.push(option.value);
  }
  }
  
  // Get the selected drinks
  const drinks = [];
  const drinksSelect = document.querySelector('#drinks');
  for (let i = 0; i < drinksSelect.options.length; i++) {
  const option = drinksSelect.options[i];
  if (option.selected) {
  drinks.push(option.value);
  }
  }
  
  // Send the reservation data to the server
  const reservationData = {
  time: time,
  players: players,
  snacks: snacks,
  drinks: drinks
  };

  fetch('/reservation', {
    method: 'POST',
    body: JSON.stringify(reservationData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    // Display a confirmation message to the user
    const container = document.querySelector('.container');
    container.innerHTML = `<h1>Reservation Confirmation</h1>
                            <p>Your reservation has been confirmed for ${data.reservationTime} for ${data.numPlayers} players.</p>
                            <p>You have selected the following snacks: ${data.snacks.join(', ')}.</p>
                            <p>You have selected the following drinks: ${data.drinks.join(', ')}.</p>`;
  })
  .catch(error => {
    // Display an error message to the user
    const container = document.querySelector('.container');
    container.innerHTML = "<h1>Error:</h1> <p>Something went wrong with your reservation. Please try again later.</p> <p>Error message: " + error.message + "</p>";
  });