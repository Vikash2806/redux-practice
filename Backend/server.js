const express = require('express');
const app = express();
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const connectDB = require('./config/db');
const errorMiddleware = require('./middleware/errorMiddleware');

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', productRoutes);
app.use(errorMiddleware);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
