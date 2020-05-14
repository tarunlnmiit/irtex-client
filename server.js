const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist/irtex-client'));

app.listen(process.env.PORT || 4200);

// Path Location Strategy
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/irtex-client/index.html'));
});

console.log('Console listening');
