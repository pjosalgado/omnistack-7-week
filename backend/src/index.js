const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const Sentry = require('@sentry/node');

Sentry.init({
    dsn: 'https://df9135141716455280e53d3dcfcb8c18@sentry.io/1491082', 
    environment: 'dev' 
});

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://semana:semana@cluster0-lhj1x.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

// puts a web socket into the request
app.use((req, res, next) => {
    req.io = io;
    next();
})

app.use(cors());

// enables access to the 'uploads/resized' folder via request on '/files'
app.use('/files', express.static(
    path.resolve(__dirname, '..', 'uploads', 'resized')
));

app.use(require('./routes.js'));

server.listen(process.env.PORT || 3333);
