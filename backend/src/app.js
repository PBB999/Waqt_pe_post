const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const { errorMiddleware } = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the waqt app' });
    }
);

app.use('/api', routes);

app.use(errorMiddleware);

module.exports = app;
