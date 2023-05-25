const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');

const app = express();
const PORT = 3000;
const MONGO_URL = 'mongodb://ip:port/proj';

mongoose.connect('MONGO_URL', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, '[MongoDb]: Connection error.'));
db.once('open', () => {
    console.log('[MongoDb]: Connection successful.');
});

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    console.log(`[Server]: Running on port: ${PORT}.`);
});
