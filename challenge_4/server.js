const express = require('express');
const app = express();
const port = 4568;

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));

// No need for body parser
app.use(express.static('client/dist'));
