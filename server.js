const express = require('express');
const app = express();
app.use(express.static('public'));


const server = app.listen(3000);


//server.close();
