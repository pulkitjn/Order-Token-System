import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  outletEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Invalid email address'],
  },
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: [/^[A-Za-z ]+$/, 'Outlet name can only contain letters and spaces.'],
  },
  priceType: {
    type: String,
    enum: ['₹', '$'],
    required: true,
    message: 'Please select a valid price type (₹ or $).',
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be a positive number.'],
  },
  description: {
    type: String,
    required: false,
    match: [/^[a-zA-Z0-9\s]+$/, 'Description can only contain alphanumeric characters.'],
  },
});

const Product = model('Product', productSchema);

export default Product;
