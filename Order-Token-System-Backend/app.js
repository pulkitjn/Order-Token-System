import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
// Import route files
import customerRoutes from './routes/customer.js';
import outletRoutes from './routes/outlet.js';

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Use the route files as middleware
app.use('/customer', customerRoutes);
app.use('/outlet', outletRoutes);

mongoose.connect(process.env.OTS_DB_CONNECT_STR, {
  dbName: 'OTS_db',
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server after successful database connection
    app.listen(process.env.OTS_SERVER_PORT, () => {
      console.log(`Server started on port ${process.env.OTS_SERVER_PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });