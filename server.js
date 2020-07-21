// REQUIRED DEPENDENCIES
const express = require('express');
const path = require('path');

// App + PORT + Database URL
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('client/build'));

app.get('*/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Listen to the server
app.listen(PORT, () => console.log(`Listening...http://localhost:${PORT}`));
